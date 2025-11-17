# elastic-selfManagedFleet\main.tf

#############################################
# Terraform Version and Providers
#############################################

terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "5.100.0" }
    kubernetes = { source = "hashicorp/kubernetes", version = "2.23.0" }
    helm = { source = "hashicorp/helm", version = "2.12.1" }
  }
}

provider "aws" {
  region = var.region
}

data "aws_eks_cluster" "cribr" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "cribr" {
  name = var.cluster_name
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
# Kubernetes Namespace
#############################################

resource "kubernetes_namespace" "elastic_system" {
  metadata {
    name = "elastic-system"
  }
}

#############################################
# Cleanup leftover kube-state-metrics
#############################################

resource "null_resource" "cleanup_kube_state_metrics" {
  triggers = { always_run = timestamp() }

  provisioner "local-exec" {
    command = <<EOT
kubectl delete deployment,service,serviceaccount,clusterrole,clusterrolebinding kube-state-metrics -n elastic-system --ignore-not-found
EOT
    interpreter = ["C:/Program Files/Git/bin/bash.exe", "-c"]
  }
}

#############################################
# Fleet Server Service (NodePort)
#############################################

resource "kubernetes_service" "fleet_server" {
  metadata {
    name      = "fleet-server"
    namespace = kubernetes_namespace.elastic_system.metadata[0].name
  }

  spec {
    selector = {
      name = "agent-pernode-fleet-server"
    }

    port {
      port        = 8220
      target_port = 8220
      node_port   = 32220
    }

    type = "NodePort"
  }
}

#############################################
# Helm Release: Fleet Server (self-managed)
#############################################

resource "helm_release" "fleet_server" {
  name             = "fleet-server"
  repository       = "https://helm.elastic.co"
  chart            = "elastic-agent"
  version          = "8.18.0"
  namespace        = kubernetes_namespace.elastic_system.metadata[0].name
  create_namespace = true
  wait             = true

  values = [
    yamlencode({
      agent = {
        fleet = {
          server = {
            enabled        = true
            replicas       = 1
            host           = "0.0.0.0"
            port           = 8220
            kibanaHost     = var.kibana_endpoint
            kibanaUser     = var.kibana_user
            kibanaPassword = var.kibana_password
            tokenName      = "fleet-server-token"
            policyName     = "fleet-server-policy"
          }
        }
        elasticsearch = {
          hosts   = [var.elasticsearch_endpoint]
          api_key = var.elastic_api_key
        }
        system = { enabled = true }
      }
    })
  ]
}

#############################################
# Prevent stuck ALB ingress deletions
#############################################

resource "null_resource" "cleanup_ingress" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = <<EOT
echo "Checking for existing Fleet Server ingress and deleting if found..."
kubectl delete ingress fleet-server-ingress -n elastic-system --ignore-not-found --wait=false
EOT
    interpreter = ["C:/Program Files/Git/bin/bash.exe", "-c"]
  }
}

#############################################
# ALB Ingress for Fleet Server
#############################################

resource "kubernetes_ingress_v1" "fleet_server_ingress" {
  depends_on = [null_resource.cleanup_ingress]

  timeouts {
    delete = "30m"
  }

  metadata {
    name      = "fleet-server-ingress"
    namespace = kubernetes_namespace.elastic_system.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"                  = "alb"
      "alb.ingress.kubernetes.io/scheme"             = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"        = "ip"
      "alb.ingress.kubernetes.io/listen-ports"       = "[{\"HTTPS\":443}]"
      "alb.ingress.kubernetes.io/certificate-arn"    = var.acm_certificate_arn
      "alb.ingress.kubernetes.io/backend-protocol"   = "HTTPS"
      "alb.ingress.kubernetes.io/healthcheck-path"   = "/"
      "alb.ingress.kubernetes.io/healthcheck-port"   = "8220"
      "alb.ingress.kubernetes.io/healthcheck-protocol" = "HTTPS"
    }
  }

  spec {
    ingress_class_name = "alb"
    rule {
      host = var.fleet_server_hostname
      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.fleet_server.metadata[0].name
              port {
                number = 8220
              }
            }
          }
        }
      }
    }
  }
}

#############################################
# Wait for Ingress to be assigned ALB hostname
#############################################

resource "null_resource" "wait_for_ingress" {
  depends_on = [kubernetes_ingress_v1.fleet_server_ingress]

  provisioner "local-exec" {
    command = <<EOT
echo "Waiting for ingress ALB hostname..."
until kubectl get ingress fleet-server-ingress -n elastic-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' | grep -q .; do
  sleep 5
done
echo "Ingress ALB hostname ready."
EOT
    interpreter = ["C:/Program Files/Git/bin/bash.exe", "-c"]
  }
}

#############################################
# Helm Release: Elastic Agent (managed by Fleet)
#############################################

resource "helm_release" "elastic_agent" {
  depends_on = [
    helm_release.fleet_server,
    null_resource.cleanup_kube_state_metrics,
    null_resource.wait_for_ingress
  ]

  name             = "elastic-agent"
  repository       = "https://helm.elastic.co"
  chart            = "elastic-agent"
  version          = "8.18.0"
  namespace        = kubernetes_namespace.elastic_system.metadata[0].name
  create_namespace = true
  wait             = true

  values = [
    yamlencode({
      agent = {
        fleet = {
          enabled = true
          url     = "https://${var.fleet_server_hostname}"
          token   = var.elastic_enrollment_token
          mode    = "daemonset"
        }
        system             = { enabled = true }
        kube_state_metrics = { enabled = false }
        logging            = { enabled = true }
        ssl                = { enabled = true }
      }
    })
  ]
}

#############################################
# AWS Load Balancer Controller Setup
#############################################

provider "helm" {
  alias = "eks"
  kubernetes {
    host                   = data.aws_eks_cluster.cribr.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cribr.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.cribr.token
  }
}

#############################################
# Optional Kibana Setup
#############################################

resource "null_resource" "kibana_setup" {
  depends_on = [helm_release.elastic_agent]

  provisioner "local-exec" {
    command = <<EOT
set -e
echo "Configuring Kibana index pattern..."
curl -s -X POST "${var.kibana_endpoint}/api/saved_objects/index-pattern" \
  -H "Authorization: ApiKey ${var.elastic_api_key}" \
  -H 'kbn-xsrf: true' \
  -H 'Content-Type: application/json' \
  -d '{"attributes":{"title":"metrics-*","timeFieldName":"@timestamp"}}'

echo "Kibana index patterns configured successfully."
EOT

    interpreter = ["C:/Program Files/Git/bin/bash.exe", "-c"]
  }
}

#############################################
# Outputs
#############################################

output "elastic_system_namespace" {
  description = "The Kubernetes namespace for Elastic system components"
  value       = kubernetes_namespace.elastic_system.metadata[0].name
}

output "fleet_server_release_name" {
  description = "Helm release name for Fleet Server"
  value       = helm_release.fleet_server.name
}

output "elastic_agent_release_name" {
  description = "Helm release name for Elastic Agent"
  value       = helm_release.elastic_agent.name
}

output "fleet_server_url" {
  description = "External HTTPS URL for the Fleet Server"
  value       = "https://${var.fleet_server_hostname}"
}

output "elastic_agent_status" {
  description = "Status of the Elastic Agent Helm release"
  value       = helm_release.elastic_agent.status
}

output "fleet_server_status" {
  description = "Status of the Fleet Server Helm release"
  value       = helm_release.fleet_server.status
}
