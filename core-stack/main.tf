# core-stack\main.tf


#############################################
# Terraform Configuration
#############################################
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.100.0"
    }
  }
}

#############################################
# AWS Provider
#############################################
provider "aws" {
  region = var.region
}

#############################################
# Availability Zones
#############################################
data "aws_availability_zones" "available" {}

#############################################
# VPC Module
#############################################
module "cribr_vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "${var.name_prefix}-vpc"
  cidr = var.vpc_cidr

  azs             = slice(data.aws_availability_zones.available.names, 0, 2)
  public_subnets  = var.public_subnet_cidrs
  private_subnets = var.private_subnet_cidrs

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    "Name"                                      = "${var.name_prefix}-vpc"
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }
}

#############################################
# Security Group for VPC Endpoints
#############################################
resource "aws_security_group" "vpc_endpoint_sg" {
  name        = "${var.name_prefix}-vpc-endpoint-sg"
  description = "SG for ECR and S3 VPC endpoints"
  vpc_id      = module.cribr_vpc.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]  # Use your VPC CIDR
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.name_prefix}-vpc-endpoint-sg"
  }
}

#############################################
# VPC Endpoints
#############################################
# S3 Gateway Endpoint (updated to include private route tables)
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = module.cribr_vpc.vpc_id
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"

  # Attach to all route tables (public + private)
  route_table_ids = concat(
    module.cribr_vpc.public_route_table_ids,
    module.cribr_vpc.private_route_table_ids
  )

  tags = {
    Name = "${var.name_prefix}-s3-endpoint"
  }
}

# ECR API Endpoint (Interface)
resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id             = module.cribr_vpc.vpc_id
  service_name       = "com.amazonaws.${var.region}.ecr.api"
  vpc_endpoint_type  = "Interface"
  subnet_ids         = module.cribr_vpc.private_subnets
  security_group_ids = [aws_security_group.vpc_endpoint_sg.id]
  private_dns_enabled = true

  tags = {
    Name = "${var.name_prefix}-ecr-api-endpoint"
  }
}

# ECR DKR Endpoint (Interface)
resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id             = module.cribr_vpc.vpc_id
  service_name       = "com.amazonaws.${var.region}.ecr.dkr"
  vpc_endpoint_type  = "Interface"
  subnet_ids         = module.cribr_vpc.private_subnets
  security_group_ids = [aws_security_group.vpc_endpoint_sg.id]
  private_dns_enabled = true

  tags = {
    Name = "${var.name_prefix}-ecr-dkr-endpoint"
  }
}

# ----------------------------------------------------------
# ADDED: Secrets Manager VPC Endpoint (Interface)
# ----------------------------------------------------------
resource "aws_vpc_endpoint" "secretsmanager" {
  vpc_id             = module.cribr_vpc.vpc_id
  service_name       = "com.amazonaws.${var.region}.secretsmanager"
  vpc_endpoint_type  = "Interface"
  subnet_ids         = module.cribr_vpc.private_subnets
  security_group_ids = [aws_security_group.vpc_endpoint_sg.id]
  private_dns_enabled = true

  tags = {
    Name = "${var.name_prefix}-secretsmanager-endpoint"
  }
}

#############################################
# EKS Cluster Module
#############################################
module "cribr_eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.4"

  cluster_name    = var.cluster_name
  cluster_version = "1.34"
  vpc_id          = module.cribr_vpc.vpc_id
  subnet_ids      = module.cribr_vpc.private_subnets

  enable_irsa = true

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  cluster_addons = {
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  eks_managed_node_groups = {
    default = {
      node_group_name = "${var.name_prefix}-node-group"
      desired_size   = 4
      max_size       = 5
      min_size       = 3
      instance_types = ["m7i-flex.large"]
      subnet_ids     = module.cribr_vpc.private_subnets
      ami_type       = "AL2023_x86_64_STANDARD"
      disk_size      = 20

      tags = {
        Name        = "${var.name_prefix}-node-group"
        Environment = "dev"
        Terraform   = "true"
      }
    }
  }

  tags = {
    Name        = "${var.name_prefix}-eks"
    Terraform   = "true"
    Environment = "dev"
  }
}

#############################################
# Data Sources for EKS
#############################################
data "aws_eks_cluster" "cribr" {
  name       = module.cribr_eks.cluster_name
  depends_on = [module.cribr_eks]
}

data "aws_eks_cluster_auth" "cribr" {
  name       = module.cribr_eks.cluster_name
  depends_on = [module.cribr_eks]
}
