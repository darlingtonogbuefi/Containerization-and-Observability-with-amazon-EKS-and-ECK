#  /cribr-cicd\main.tf

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

  required_version = ">= 1.6.0"
}

#############################################
# Providers
#############################################
provider "aws" {
  region = var.aws_region
}

data "aws_eks_cluster" "cribr" {
  name = "cribr-cluster"
}

data "aws_eks_cluster_auth" "cribr" {
  name = data.aws_eks_cluster.cribr.name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cribr.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cribr.token

}

