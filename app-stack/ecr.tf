// app-stack\ecr.tf

#############################################
# ECR Repository and Policy
#############################################
resource "aws_ecr_repository" "cribr_app_repo" {
  name                 = "${var.name_prefix}-app-repo"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration { scan_on_push = true }
  encryption_configuration { encryption_type = "AES256" }

  tags = {
    Name        = "${var.name_prefix}-app-repo"
    Environment = "dev"
    Terraform   = "true"
  }
}

resource "aws_ecr_repository_policy" "cribr_app_repo_policy" {
  repository = aws_ecr_repository.cribr_app_repo.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid      = "AllowPullFromCICDRole",
      Effect   = "Allow",
      Principal = { AWS = var.cicd_role_arn },
      Action = [
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:BatchCheckLayerAvailability"
      ]
    }]
  })
}
