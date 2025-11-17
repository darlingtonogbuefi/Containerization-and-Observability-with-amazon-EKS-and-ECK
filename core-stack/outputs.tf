# core-stack\outputs.tf

output "vpc_id" {
  description = "The ID of the VPC created by this stack, used by downstream stacks and resources."
  value       = module.cribr_vpc.vpc_id
}

output "private_subnets" {
  description = "List of private subnet IDs in the VPC. These are used for EKS worker nodes and internal resources."
  value       = module.cribr_vpc.private_subnets
}

output "public_subnets" {
  description = "List of public subnet IDs in the VPC. These are used for NAT gateways and public-facing resources."
  value       = module.cribr_vpc.public_subnets
}

output "cluster_name" {
  description = "The name of the EKS cluster created by this stack."
  value       = module.cribr_eks.cluster_name
}

output "cluster_endpoint" {
  description = "The endpoint URL for the EKS cluster API server."
  value       = module.cribr_eks.cluster_endpoint
}

output "cluster_certificate_authority_data" {
  description = "The certificate authority data for the EKS cluster, used for authenticating kubectl and API requests."
  value       = module.cribr_eks.cluster_certificate_authority_data
}

output "oidc_provider_arn" {
  description = "The ARN of the OIDC provider associated with the EKS cluster. Needed for IRSA (IAM Roles for Service Accounts)."
  value       = module.cribr_eks.oidc_provider_arn
}

output "oidc_provider_url" {
  description = "The URL of the OpenID Connect (OIDC) provider for the EKS cluster."
  value = regex("oidc-provider/(.+)$", module.cribr_eks.oidc_provider_arn)[0]
}

# Output the ARN for downstream use
output "cicd_role_arn" {
  description = "The ARN of the CI/CD IAM role."
  value       = aws_iam_role.cribr_cicd_role.arn
}
