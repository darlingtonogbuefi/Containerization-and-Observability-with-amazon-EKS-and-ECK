#  app-stack\variables.tf

#########################################
# Input Variables for App Stack
#########################################

variable "region" {
  description = "AWS region"
}

variable "name_prefix" {
  description = "Name prefix for resources"
  default     = "cribr"
}

variable "cluster_name" {
  description = "EKS cluster name"
}

variable "cluster_endpoint" {
  description = "EKS cluster API endpoint"
}

variable "cluster_ca" {
  description = "Base64 encoded cluster CA data"
}

variable "vpc_id" {
  description = "VPC ID from core stack"
}

variable "oidc_provider_arn" {
  description = "ARN of EKS OIDC provider"
}

variable "oidc_provider_url" {
  description = "URL of EKS OIDC provider (without https://)"
}

variable "cicd_role_arn" {
  description = "ARN of the CI/CD IAM role"
}
