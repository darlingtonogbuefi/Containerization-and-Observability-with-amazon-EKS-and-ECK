#  core-stack\variables.tf

#########################################
# Input Variables for Core Infrastructure
#########################################

variable "region" {
  description = "The AWS region where all resources will be created."
  default     = "us-east-1"
}

variable "name_prefix" {
  description = "A prefix used for naming AWS resources (e.g., VPC, EKS, IAM). Helps identify resources that belong to this deployment."
  default     = "cribr"
}

variable "cluster_name" {
  description = "The name of the Amazon EKS cluster to be created."
  default     = "cribr-cluster"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC where the EKS cluster and related resources will be deployed."
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets within the VPC. These subnets will host internet-facing load balancers and NAT gateways."
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "List of CIDR blocks for private subnets within the VPC. These subnets are used by EKS worker nodes and internal services."
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}
