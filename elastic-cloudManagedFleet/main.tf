#  elastic-cloudManagedFleet\main.tf

#############################################
# Terraform Configuration
#############################################
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.100.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
  }

  required_version = ">= 1.6.0"
}

#############################################
# Providers
#############################################
provider "aws" {
  region = var.region
}

# Get EKS cluster connection info
data "aws_eks_cluster" "cribr" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "cribr" {
  name = data.aws_eks_cluster.cribr.name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cribr.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cribr.token
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.cribr.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.cribr.token
  }
}

#############################################
# Deploy Fleet-managed Elastic Agent via Helm
#############################################
resource "helm_release" "elastic_agent" {
  name             = "elastic-agent"
  repository       = "https://helm.elastic.co"
  chart            = "elastic-agent"
  version          = "8.18.0"
  namespace        = "elastic-system"
  create_namespace = true

  values = [
    <<EOF
agent:
  fleet:
    enabled: true
    url: "${var.elastic_fleet_url}"
    token: "${var.elastic_enrollment_token}"
    preset: perNode
  fleetServer:
    enabled: false
system:
  enabled: true
kube-state-metrics:
  enabled: true
inputs:
  - type: kubernetes/log
    enabled: true
    namespace: "cribr-ns" 
    streams:
      - paths:
          - /var/log/containers/*.log
        service:
          type: kubernetes

EOF
  ]
}


#############################################
# RBAC for Elastic Agent
#############################################

# ClusterRole: allow Elastic Agent to access pods, nodes, deployments in all namespaces
resource "kubernetes_cluster_role" "elastic_agent" {
  metadata {
    name = "elastic-agent"
  }

  rule {
    api_groups = [""]
    resources  = ["pods", "nodes", "namespaces"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["apps"]
    resources  = ["deployments", "statefulsets", "replicasets"]
    verbs      = ["get", "list", "watch"]
  }
}

# ClusterRoleBinding: bind the ClusterRole to the agent-pernode-elastic-agent ServiceAccount
resource "kubernetes_cluster_role_binding" "elastic_agent" {
  metadata {
    name = "elastic-agent"
  }

  subject {
    kind      = "ServiceAccount"
    name      = "agent-pernode-elastic-agent"
    namespace = "elastic-system"
  }

  role_ref {
    kind     = "ClusterRole"
    name     = kubernetes_cluster_role.elastic_agent.metadata[0].name
    api_group = "rbac.authorization.k8s.io"
  }
}
