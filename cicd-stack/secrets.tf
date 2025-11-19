# cicd-stack\secrets.tf

#############################################
# GitHub OAuth Token
#############################################
resource "aws_secretsmanager_secret" "github" {
  name        = "${var.project_name}-github-token"
  description = "GitHub OAuth token for CodePipeline"
}

resource "aws_secretsmanager_secret_version" "github" {
  secret_id     = aws_secretsmanager_secret.github.id
  secret_string = var.github_oauth_token
}

#############################################
# SonarQube Token
#############################################
resource "aws_secretsmanager_secret" "sonarqube" {
  name        = "${var.project_name}-sonarqube-token"
  description = "SonarQube authentication token"
}

resource "aws_secretsmanager_secret_version" "sonarqube" {
  secret_id     = aws_secretsmanager_secret.sonarqube.id
  secret_string = var.sonar_token
}

#############################################
# Supabase Keys
#############################################
resource "aws_secretsmanager_secret" "supabase_service_key" {
  name        = "${var.project_name}-supabase-service-key"
  description = "Supabase service key"
}

resource "aws_secretsmanager_secret_version" "supabase_service_key" {
  secret_id     = aws_secretsmanager_secret.supabase_service_key.id
  secret_string = var.supabase_service_key
}

resource "aws_secretsmanager_secret" "supabase_anon_key" {
  name        = "${var.project_name}-supabase-anon-key"
  description = "Supabase anon key"
}

resource "aws_secretsmanager_secret_version" "supabase_anon_key" {
  secret_id     = aws_secretsmanager_secret.supabase_anon_key.id
  secret_string = var.supabase_anon_key
}

resource "aws_secretsmanager_secret" "next_public_supabase_anon_key" {
  name        = "${var.project_name}-next-public-supabase-anon-key"
  description = "Supabase anon key for frontend"
}

resource "aws_secretsmanager_secret_version" "next_public_supabase_anon_key" {
  secret_id     = aws_secretsmanager_secret.next_public_supabase_anon_key.id
  secret_string = var.next_public_supabase_anon_key
}

#############################################
# Stripe Keys
#############################################
resource "aws_secretsmanager_secret" "stripe_secret_key" {
  name        = "${var.project_name}-stripe-secret-key"
  description = "Stripe secret key"
}

resource "aws_secretsmanager_secret_version" "stripe_secret_key" {
  secret_id     = aws_secretsmanager_secret.stripe_secret_key.id
  secret_string = var.stripe_secret_key
}

resource "aws_secretsmanager_secret" "stripe_webhook_secret" {
  name        = "${var.project_name}-stripe-webhook-secret"
  description = "Stripe webhook secret"
}

resource "aws_secretsmanager_secret_version" "stripe_webhook_secret" {
  secret_id     = aws_secretsmanager_secret.stripe_webhook_secret.id
  secret_string = var.stripe_webhook_secret
}

resource "aws_secretsmanager_secret" "stripe_publishable_key" {
  name        = "${var.project_name}-stripe-publishable-key"
  description = "Stripe publishable key (frontend)"
}

resource "aws_secretsmanager_secret_version" "stripe_publishable_key" {
  secret_id     = aws_secretsmanager_secret.stripe_publishable_key.id
  secret_string = var.next_public_stripe_publishable_key
}

#############################################
# 3rd Party API Keys
#############################################
resource "aws_secretsmanager_secret" "assemblyai_api_key" {
  name        = "${var.project_name}-assemblyai-api-key"
  description = "AssemblyAI API key"
}

resource "aws_secretsmanager_secret_version" "assemblyai_api_key" {
  secret_id     = aws_secretsmanager_secret.assemblyai_api_key.id
  secret_string = var.assemblyai_api_key
}

resource "aws_secretsmanager_secret" "transcript_io_api_key" {
  name        = "${var.project_name}-transcript-io-api-key"
  description = "Transcript.io API key"
}

resource "aws_secretsmanager_secret_version" "transcript_io_api_key" {
  secret_id     = aws_secretsmanager_secret.transcript_io_api_key.id
  secret_string = var.transcript_io_api_key
}

resource "aws_secretsmanager_secret" "dumplingai_api_key" {
  name        = "${var.project_name}-dumplingai-api-key"
  description = "DumplingAI API key"
}

resource "aws_secretsmanager_secret_version" "dumplingai_api_key" {
  secret_id     = aws_secretsmanager_secret.dumplingai_api_key.id
  secret_string = var.dumplingai_api_key
}

#############################################
# YouTube / Google OAuth
#############################################
resource "aws_secretsmanager_secret" "youtube_api_key" {
  name        = "${var.project_name}-youtube-api-key"
  description = "YouTube API key"
}

resource "aws_secretsmanager_secret_version" "youtube_api_key" {
  secret_id     = aws_secretsmanager_secret.youtube_api_key.id
  secret_string = var.youtube_api_key
}

resource "aws_secretsmanager_secret" "google_client_id" {
  name        = "${var.project_name}-google-client-id"
  description = "Google OAuth Client ID"
}

resource "aws_secretsmanager_secret_version" "google_client_id" {
  secret_id     = aws_secretsmanager_secret.google_client_id.id
  secret_string = var.next_public_google_client_id
}

#############################################
# DockerHub Credentials (split secrets)
#############################################

resource "aws_secretsmanager_secret" "dockerhub_username" {
  name        = "${var.project_name}-dockerhub-username"
  description = "DockerHub username for CodeBuild authentication"
}

resource "aws_secretsmanager_secret_version" "dockerhub_username" {
  secret_id     = aws_secretsmanager_secret.dockerhub_username.id
  secret_string = var.dockerhub_username
}

resource "aws_secretsmanager_secret" "dockerhub_password" {
  name        = "${var.project_name}-dockerhub-password"
  description = "DockerHub password for CodeBuild authentication"
}

resource "aws_secretsmanager_secret_version" "dockerhub_password" {
  secret_id     = aws_secretsmanager_secret.dockerhub_password.id
  secret_string = var.dockerhub_password
}


#############################################
# Terraform User Credentials
#############################################

resource "aws_secretsmanager_secret" "terraform_user_access_key" {
  name        = "${var.project_name}-terraform-user-access-key"
  description = "Terraform user AWS access key"
}

resource "aws_secretsmanager_secret_version" "terraform_user_access_key" {
  secret_id     = aws_secretsmanager_secret.terraform_user_access_key.id
  secret_string = var.terraform_user_access_key
}

resource "aws_secretsmanager_secret" "terraform_user_secret_key" {
  name        = "${var.project_name}-terraform-user-secret-key"
  description = "Terraform user AWS secret key"
}

resource "aws_secretsmanager_secret_version" "terraform_user_secret_key" {
  secret_id     = aws_secretsmanager_secret.terraform_user_secret_key.id
  secret_string = var.terraform_user_secret_key
}

resource "aws_secretsmanager_secret" "aws_account_id" {
  name        = "${var.project_name}-aws-account-id"
  description = "AWS account ID for ECR"
}

resource "aws_secretsmanager_secret_version" "aws_account_id" {
  secret_id     = aws_secretsmanager_secret.aws_account_id.id
  secret_string = var.aws_account_id   # e.g., "493834426110"
}
