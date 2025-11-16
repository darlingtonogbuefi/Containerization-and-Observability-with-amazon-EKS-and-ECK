# cribr-cicd\codebuild.tf

#############################################
# AWS CodeBuild Project
#############################################

resource "aws_codebuild_project" "cribr_build" {
  name          = "${var.project_name}-build"
  description   = "CodeBuild project for ${var.project_name}"
  service_role  = aws_iam_role.codebuild_role.arn
  build_timeout = 20

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_LARGE"
    image           = "aws/codebuild/standard:7.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true

    #############################################
    # Plaintext environment variables
    #############################################
    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = var.aws_account_id
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "AWS_REGION"
      value = var.aws_region
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "ECR_REPO_URI"
      value = "493834426110.dkr.ecr.us-east-1.amazonaws.com/cribr-app-repo"
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "IMAGE_TAG"
      value = "latest"
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "K8S_NAMESPACE"
      value = "cribr-ns"
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "DEPLOYMENT_YAML"
      value = "cribr-cicd/deployment.yaml"
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "SONAR_PROJECT_KEY"
      value = "darlingtonogbuefi_app-containerization"
      type  = "PLAINTEXT"
    }

    #############################################
    # Secrets from AWS Secrets Manager
    #############################################
    environment_variable {
      name  = "GITHUB_TOKEN"
      value = aws_secretsmanager_secret.github.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "SONAR_TOKEN"
      value = aws_secretsmanager_secret.sonarqube.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "SUPABASE_ANON_KEY"
      value = aws_secretsmanager_secret.supabase_anon_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "SUPABASE_SERVICE_KEY"
      value = aws_secretsmanager_secret.supabase_service_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      value = aws_secretsmanager_secret.next_public_supabase_anon_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "STRIPE_SECRET_KEY"
      value = aws_secretsmanager_secret.stripe_secret_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "STRIPE_WEBHOOK_SECRET"
      value = aws_secretsmanager_secret.stripe_webhook_secret.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "STRIPE_PUBLISHABLE_KEY"
      value = aws_secretsmanager_secret.stripe_publishable_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "ASSEMBLYAI_API_KEY"
      value = aws_secretsmanager_secret.assemblyai_api_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "DUMPLINGAI_API_KEY"
      value = aws_secretsmanager_secret.dumplingai_api_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "GOOGLE_CLIENT_ID"
      value = aws_secretsmanager_secret.google_client_id.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "TRANSCRIPT_IO_API_KEY"
      value = aws_secretsmanager_secret.transcript_io_api_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "YOUTUBE_API_KEY"
      value = aws_secretsmanager_secret.youtube_api_key.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "DOCKERHUB_USERNAME"
      value = aws_secretsmanager_secret.dockerhub_username.arn
      type  = "SECRETS_MANAGER"
    }

    environment_variable {
      name  = "DOCKERHUB_PASSWORD"
      value = aws_secretsmanager_secret.dockerhub_password.arn
      type  = "SECRETS_MANAGER"
    }

      environment_variable {
    name  = "AWS_ACCESS_KEY_ID"
    type  = "SECRETS_MANAGER"
    value = aws_secretsmanager_secret.terraform_user_access_key.arn
   }

  environment_variable {
    name  = "AWS_SECRET_ACCESS_KEY"
    type  = "SECRETS_MANAGER"
    value = aws_secretsmanager_secret.terraform_user_secret_key.arn
   }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "cribr-cicd/buildspec.yml"
  }

  logs_config {
    cloudwatch_logs {
      status      = "ENABLED"
      group_name  = "/aws/codebuild/${var.project_name}"
      stream_name = "build-log"
    }
  }
}
