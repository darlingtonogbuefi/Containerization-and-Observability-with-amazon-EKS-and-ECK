// cribr-core-infra\cribr-core-stack\iam.tf

#########################################
# IAM + EKS Access Setup for cribr-cluster
#########################################

locals {
  root_arn = "arn:aws:iam::493834426110:root"

  # Full admin principals for AWS and EKS
  full_admins = {
    root           = local.root_arn
    terraform_user = aws_iam_user.terraform_user.arn
    cicd_role      = aws_iam_role.cribr_cicd_role.arn
  }
}

#########################################
# IAM Group: Full Admins
#########################################

resource "aws_iam_group" "cribr_full_admins" {
  name = "cribr-full-admins"
}

#########################################
# IAM User: terraform-user
#########################################

resource "aws_iam_user" "terraform_user" {
  name = "terraform-user"
  tags = {
    Name = "terraform-user"
  }
}

# Add terraform_user to admin group
resource "aws_iam_group_membership" "terraform_user_membership" {
  name  = "terraform-user-membership"
  users = [aws_iam_user.terraform_user.name]
  group = aws_iam_group.cribr_full_admins.name
}

#########################################
# Group Policies: AdministratorAccess + Fine-Grained
#########################################

# Full AWS admin
resource "aws_iam_group_policy_attachment" "admin_access" {
  group      = aws_iam_group.cribr_full_admins.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# Custom fine-grained control for critical AWS services
resource "aws_iam_policy" "cribr_fine_grained_admin" {
  name        = "CribrFineGrainedFullAccess"
  description = "Full access to EKS, EC2, ECR, IAM, and other critical services"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "eks:*",
          "ecr:*",
          "ec2:*",
          "iam:*",
          "kms:*",
          "secretsmanager:*",
          "logs:*",
          "sts:*",
          "cloudformation:*",
          "autoscaling:*",
          "elasticloadbalancing:*",
          "s3:*",
          "lambda:*",
          "cloudwatch:*"
        ],
        Resource = "*"
      }
    ]
  })
}

# Attach fine-grained policy to group (applies to terraform_user)
resource "aws_iam_group_policy_attachment" "fine_grained_admin" {
  group      = aws_iam_group.cribr_full_admins.name
  policy_arn = aws_iam_policy.cribr_fine_grained_admin.arn
}

#########################################
# terraform_user Access Keys
#########################################

resource "aws_iam_access_key" "terraform_user_key" {
  user       = aws_iam_user.terraform_user.name
  depends_on = [aws_iam_group_policy_attachment.fine_grained_admin]
}

resource "local_file" "terraform_user_creds" {
  filename = "${path.module}/terraform_user_creds.txt"
  content  = <<EOF
AWS_ACCESS_KEY_ID=${aws_iam_access_key.terraform_user_key.id}
AWS_SECRET_ACCESS_KEY=${aws_iam_access_key.terraform_user_key.secret}
EOF
}

#########################################
# CI/CD Role: Full ECR, ECS, Secrets Manager Access
#########################################

resource "aws_iam_role" "cribr_cicd_role" {
  name = "cribr-cicd-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = local.root_arn
        },
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "cribr-cicd-role"
  }
}

resource "aws_iam_policy" "cribr_cicd_full_access" {
  name        = "CribrCICDFullAccess"
  description = "Full access for CI/CD role to ECR, ECS, and Secrets Manager"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:*",
          "ecs:*",
          "secretsmanager:*",
          "iam:PassRole"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "cribr_cicd_full_access_attach" {
  role       = aws_iam_role.cribr_cicd_role.name
  policy_arn = aws_iam_policy.cribr_cicd_full_access.arn
}

#########################################
# EKS Nodes: Allow Pull from ECR
#########################################

resource "aws_iam_policy_attachment" "ecr_pull_for_nodes" {
  name       = "ecr-pull-for-eks-nodes"
  roles      = [module.cribr_eks.eks_managed_node_groups["default"].iam_role_name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

#########################################
# EKS Cluster Access (Replaces aws-auth)
#########################################

resource "aws_eks_access_entry" "full_admins" {
  for_each = local.full_admins

  cluster_name  = var.cluster_name
  principal_arn = each.value
  type          = "STANDARD"
  user_name     = each.key
  depends_on    = [module.cribr_eks]
}

resource "aws_eks_access_policy_association" "full_admins_policy" {
  for_each = local.full_admins

  cluster_name  = var.cluster_name
  principal_arn = each.value
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"

  access_scope { type = "cluster" }
  depends_on = [aws_eks_access_entry.full_admins]
}


#########################################
# EKS Nodes: Attach AmazonEBSCSIDriverPolicy
#########################################

resource "aws_iam_policy_attachment" "ebs_csi_for_nodes" {
  name       = "ebs-csi-for-eks-nodes"
  roles      = [module.cribr_eks.eks_managed_node_groups["default"].iam_role_name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}
