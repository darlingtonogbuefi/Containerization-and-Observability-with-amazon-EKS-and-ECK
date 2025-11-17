// app-stack\main.tf

#############################################
# Terraform Configuration
#############################################
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.100.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
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
# EKS Data Sources
#############################################
data "aws_eks_cluster" "cribr" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "cribr" {
  name = var.cluster_name
}

#############################################
# Kubernetes Provider (points to EKS)
#############################################
provider "kubernetes" {
  host                   = data.aws_eks_cluster.cribr.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cribr.token
}

#############################################
# Helm Provider (uses the Kubernetes provider)
#############################################
provider "helm" {
  alias = "eks"
  kubernetes {
    host                   = data.aws_eks_cluster.cribr.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.cribr.token
  }
}
