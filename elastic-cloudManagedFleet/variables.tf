#  elastic-cloudManagedFleet\variables.tf

#############################################
# Terraform Variables
#############################################

variable "region" {
  description = "AWS region for the EKS cluster"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "cribr-cluster"
}

variable "elasticsearch_endpoint" {
  description = "Elastic Cloud Elasticsearch endpoint"
  type        = string
}

variable "elastic_cloud_id" {
  description = "Elastic Cloud deployment Cloud ID"
  type        = string
}

variable "elastic_fleet_url" {
  description = "Fleet Server URL from Elastic Cloud"
  type        = string
}

variable "elastic_enrollment_token" {
  description = "Fleet enrollment token from Elastic Cloud"
  type        = string
  sensitive   = true
}

variable "elastic_api_key" {
  description = "Elastic Cloud API key"
  type        = string
  sensitive   = true
}
