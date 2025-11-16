# cribr-cicd\variables.tf


#############################################
# Input Variables for CI/CD
#############################################

variable "project_name" {
  description = "Name of the project (used in resource naming)"
  type        = string
  default     = "cribr"
}
variable "k8s_namespace" {
  description = "Name of the namespace in the Kubernetes cluster)"
  type    = string
  default = "cribr-ns"
}

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "aws_account_id" {
  description = "AWS Account ID"
  type        = string
}

# GitHub CodeStar Connection for CodePipeline
variable "github_codestar_connection_arn" {
  description = "The ARN of the AWS CodeStar connection to GitHub for CodePipeline"
  type        = string
}

# GitHub repository URL and branch
variable "source_repo_url" {
  description = "GitHub repository URL (https://github.com/org/repo)"
  type        = string
}

variable "branch_name" {
  description = "Branch to build from"
  type        = string
  default     = "main"
}

variable "docker_image" {
  description = "Docker image used for the CodeBuild environment"
  type        = string
  default     = "aws/codebuild/standard:7.0"
}

variable "compute_type" {
  description = "Compute type for CodeBuild (e.g., BUILD_GENERAL1_SMALL)"
  type        = string
  default     = "BUILD_GENERAL1_SMALL"
}

variable "github_oauth_token" {
  description = "GitHub OAuth (Personal Access) Token for source authentication"
  type        = string
  sensitive   = true
}

variable "sonar_token" {
  description = "SonarQube authentication token used for static code analysis"
  type        = string
  sensitive   = true
  default     = "cribr-sonarqube-token"
}


variable "sonar_project_key" {
  description = "SonarQube project key used in analysis"
  type        = string
  default     = "darlingtonogbuefi_app-containerization"
}

##############################
# Supabase
##############################
variable "supabase_project_id" {
  description = "Supabase project ID"
  type        = string
}

variable "supabase_url" {
  description = "Supabase project URL"
  type        = string
}

variable "supabase_anon_key" {
  description = "Supabase anon key for frontend access"
  type        = string
  sensitive   = true
}

variable "supabase_service_key" {
  description = "Supabase service key for backend operations"
  type        = string
  sensitive   = true
}

variable "next_public_supabase_url" {
  description = "Next.js frontend Supabase URL"
  type        = string
}

variable "next_public_supabase_anon_key" {
  description = "Next.js frontend Supabase anon key"
  type        = string
  sensitive   = true
}

variable "next_public_site_url" {
  description = "Public site URL"
  type        = string
}

##############################
# Stripe
##############################
variable "stripe_secret_key" {
  description = "Stripe secret key"
  type        = string
  sensitive   = true
}

variable "stripe_webhook_secret" {
  description = "Stripe webhook secret"
  type        = string
  sensitive   = true
}

variable "next_public_stripe_publishable_key" {
  description = "Stripe publishable key for frontend"
  type        = string
}

##############################
# 3rd Party APIs
##############################
variable "assemblyai_api_key" {
  description = "AssemblyAI API key"
  type        = string
  sensitive   = true
}

variable "transcript_io_api_key" {
  description = "Transcript.io API key"
  type        = string
  sensitive   = true
}

variable "dumplingai_api_key" {
  description = "DumplingAI API key"
  type        = string
  sensitive   = true
}

##############################
# Auth URLs
##############################
variable "next_public_auth_redirect_url" {
  description = "Auth redirect URL for Next.js"
  type        = string
}

variable "next_public_auth_sign_in_url" {
  description = "Sign-in URL for Next.js"
  type        = string
}

variable "next_public_auth_sign_up_url" {
  description = "Sign-up URL for Next.js"
  type        = string
}

##############################
# OAuth / Google / YouTube
##############################
variable "youtube_api_key" {
  description = "YouTube API key"
  type        = string
  sensitive   = true
}

variable "next_public_google_client_id" {
  description = "Google OAuth Client ID for frontend"
  type        = string
}

##############################
# DockerHub Credentials
##############################
variable "dockerhub_username" {
  description = "DockerHub username for authentication"
  type        = string
  sensitive   = true
}

variable "dockerhub_password" {
  description = "DockerHub password for authentication"
  type        = string
  sensitive   = true
}


 variable "terraform_user_access_key" {
  description = "AWS Access Key ID for the terraform user"
  type        = string
  sensitive   = true
}

variable "terraform_user_secret_key" {
  description = "AWS Secret Access Key for the terraform user"
  type        = string
  sensitive   = true
}

variable "artifacts_bucket" {
  description = "S3 bucket used by CodePipeline to store build artifacts"
  type        = string
  default     = "cribr-codepipeline-artifacts"
}
