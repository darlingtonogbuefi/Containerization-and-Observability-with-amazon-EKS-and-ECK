# cribr-cicd\outputs.tf

#############################################
# Outputs
#############################################

# GitHub Secret ARN (requires secrets.tf)
output "github_secret_arn" {
  description = "ARN of the GitHub OAuth token secret"
  value       = aws_secretsmanager_secret.github.arn
}

# SonarQube Secret ARN (requires secrets.tf)
output "sonarqube_secret_arn" {
  description = "ARN of the SonarQube token secret"
  value       = aws_secretsmanager_secret.sonarqube.arn
}

# CodeBuild Project Name (make sure you have a resource 'aws_codebuild_project.cribr_build')
output "codebuild_project_name" {
  description = "Name of the CodeBuild project used by CodePipeline"
  value       = aws_codebuild_project.cribr_build.name
}

# CodePipeline Name (exists in your codepipeline.tf)
output "codepipeline_name" {
  description = "Name of the created CodePipeline"
  value       = aws_codepipeline.cribr_pipeline.name
}
