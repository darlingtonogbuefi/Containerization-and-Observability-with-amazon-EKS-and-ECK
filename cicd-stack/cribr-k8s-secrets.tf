# cribr-cicd\cribr-k8s-secrets.tf

#############################################
# Kubernetes Secret from Terraform-managed AWS Secrets
#############################################

locals {
  k8s_secrets_map = {
    NEXT_PUBLIC_SUPABASE_ANON_KEY = aws_secretsmanager_secret_version.next_public_supabase_anon_key.secret_string
    SUPABASE_SERVICE_KEY           = aws_secretsmanager_secret_version.supabase_service_key.secret_string
    STRIPE_SECRET_KEY              = aws_secretsmanager_secret_version.stripe_secret_key.secret_string
    STRIPE_WEBHOOK_SECRET          = aws_secretsmanager_secret_version.stripe_webhook_secret.secret_string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = aws_secretsmanager_secret_version.stripe_publishable_key.secret_string
    DUMPLINGAI_API_KEY             = aws_secretsmanager_secret_version.dumplingai_api_key.secret_string
    ASSEMBLYAI_API_KEY             = aws_secretsmanager_secret_version.assemblyai_api_key.secret_string
    TRANSCRIPT_IO_API_KEY          = aws_secretsmanager_secret_version.transcript_io_api_key.secret_string
    YOUTUBE_API_KEY                = aws_secretsmanager_secret_version.youtube_api_key.secret_string
    NEXT_PUBLIC_GOOGLE_CLIENT_ID   = aws_secretsmanager_secret_version.google_client_id.secret_string
  }
}


resource "kubernetes_namespace" "cribr_ns" {
  metadata {
    name = var.k8s_namespace
  }
}

resource "kubernetes_secret" "cribr_secrets_combined" {
  metadata {
    name      = "cribr-secrets"
    namespace = var.k8s_namespace
  }

  data = local.k8s_secrets_map

  type = "Opaque"
}
