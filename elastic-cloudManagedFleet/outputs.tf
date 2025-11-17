#  elastic-cloudManagedFleet\outputs.tf

#############################################
# Outputs
#############################################

output "elastic_agent_namespace" {
  description = "Namespace where Elastic Agents are deployed"
  value       = "elastic-system"
}

output "fleet_server_url" {
  description = "Fleet server URL used for enrollment"
  value       = var.elastic_fleet_url
}

output "elastic_agent_instructions" {
  description = "Next steps for verification"
  value = <<EOT
Elastic Agent Helm chart deployed successfully!

Verify:
  kubectl get pods -n elastic-system
  Kibana → Fleet → Agents → check for enrolled EKS nodes

To destroy the deployment:
  terraform destroy

EOT
}
