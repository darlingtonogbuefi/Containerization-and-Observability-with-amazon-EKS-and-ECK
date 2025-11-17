// app-stack\alb-controller.tf

#########################################
# ALB Controller IAM + Helm
#########################################

data "local_file" "alb_policy" {
  filename = "${path.module}/alb-controller-policy.json"
}

resource "aws_iam_policy" "alb_controller" {
  name        = "${var.name_prefix}-alb-controller-iam-policy"
  description = "IAM policy for AWS Load Balancer Controller"
  policy      = data.local_file.alb_policy.content
}

resource "aws_iam_role" "alb_controller" {
  name = "${var.name_prefix}-alb-controller-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Federated = var.oidc_provider_arn },
      Action    = "sts:AssumeRoleWithWebIdentity",
      Condition = {
        StringEquals = {
          "${var.oidc_provider_url}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
        }
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "alb_controller_attach" {
  role       = aws_iam_role.alb_controller.name
  policy_arn = aws_iam_policy.alb_controller.arn
}

# Wait for IAM propagation
resource "time_sleep" "wait_for_rbac" {
  depends_on      = [aws_iam_role_policy_attachment.alb_controller_attach]
  create_duration = "60s"
}

# Kubernetes Service Account for ALB Controller
resource "kubernetes_service_account" "alb_controller_sa" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.alb_controller.arn
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.alb_controller_attach,
    time_sleep.wait_for_rbac
  ]
}

# Helm release for ALB Controller
resource "helm_release" "alb_controller" {
  provider   = helm.eks
  name       = "aws-load-balancer-controller"
  namespace  = "kube-system"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  version    = "1.8.0"

  values = [
    yamlencode({
      clusterName = var.cluster_name
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.alb_controller_sa.metadata[0].name
      }
      region = var.region
      vpcId  = var.vpc_id
    })
  ]

  depends_on = [kubernetes_service_account.alb_controller_sa]
}
