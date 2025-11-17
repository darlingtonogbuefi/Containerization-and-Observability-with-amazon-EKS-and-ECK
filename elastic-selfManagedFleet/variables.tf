# elastic-selfManagedFleet\variables.tf

#############################################
# Terraform Variables
#############################################

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "name_prefix" {
  description = "Name prefix for resources"
  default     = "cribr"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "elastic_enrollment_token" {
  description = "Fleet enrollment token"
  type        = string
  sensitive   = true
}

variable "elastic_api_key" {
  description = "Elastic API key"
  type        = string
  sensitive   = true
}

variable "elasticsearch_endpoint" {
  description = "Elasticsearch endpoint"
  type        = string
}

variable "kibana_endpoint" {
  description = "Kibana endpoint"
  type        = string
}

variable "kibana_user" {
  description = "Kibana username"
  type        = string
}

variable "kibana_password" {
  description = "Kibana password"
  type        = string
  sensitive   = true
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for fleet.cribr.co.uk"
  type        = string
}

variable "fleet_server_hostname" {
  description = "The DNS hostname for the Fleet Server (used in ALB ingress and Elastic Agent)"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the EKS cluster is running"
  type        = string
}

variable "public_subnets" {
  description = "List of public subnets for the ALB"
  type        = list(string)
}

variable "private_subnets" {
  description = "List of private subnets for worker nodes"
  type        = list(string)
}

variable "oidc_provider_arn" {
  description = "OIDC provider ARN for the EKS cluster (used by AWS Load Balancer Controller IAM role)"
  type        = string
}

variable "oidc_provider_url" {
  description = "OIDC provider URL for the EKS cluster (used by AWS Load Balancer Controller IAM role)"
  type        = string
}