✅ README.md

# Containerization and Observability with AWS EKS and Elastic Cloud
# Link to article on medium: https://medium.com/@ogbuefidarlington/deploying-an-application-to-aws-eks-and-implementing-end-to-end-observability-with-elasticsearch-4dbb6b81f04d?postPublishedType=repub

This project demonstrates how to containerize an application, deploy it to **Amazon EKS**, and implement **end-to-end observability** using **Elasticsearch, Kibana, and a self-managed Fleet Server**. Infrastructure and deployment workflows are orchestrated using **Terraform, AWS ECR, AWS ALB, AWS Secret Manager, and CI/CD pipelines**.

---

## 📌 Repository
GitHub Repo: https://github.com/darlingtonogbuefi/Containerization-and-Observability-with-AWS-EKS-and-ElasticCloud

---

## 🚀 Project Overview

This project includes:

### **1️⃣ Containerization**
- Application containerized with Docker
- Image optimization (from ~1GB to ~70MB) using multi-stage builds

### **2️⃣ Infrastructure Automation (Terraform)**
- VPC, subnets, route tables  
- EKS cluster  
- IAM roles and OIDC provider  
- AWS Load Balancer Controller  
- ECR repositories  
- Secrets in AWS Secret Manager  
- CI/CD pipeline setup

### **3️⃣ Application Deployment**
- Kubernetes manifests and Helm charts
- ALB ingress routing
- Secure communication using DNS + TLS via ACM and Route 53

### **4️⃣ Observability (Elastic Cloud / Self-Managed Fleet Server)**
- Elasticsearch cluster setup  
- Kibana dashboard provisioning  
- Fleet Server + Elastic Agent integration  
- Logs, metrics, traces ingestion from EKS workloads  

---

## 📘 Related Articles (Documentation Series)

- **Optimizing Docker Images**  
  Step-by-step guide to reducing image size from ~1GB → ~70MB  

- **Setting Up Elastic Cloud**  
  How to create Elasticsearch & Kibana deployments  

- **Setting Up DNS & TLS**  
  Multi-domain configuration using Route 53 + ACM  

---

## 🧰 Prerequisites

Install the following tools:

| Tool | Purpose |
|------|---------|
| **VS Code** | IDE for development |
| **Terraform CLI** | Infrastructure as Code |
| **AWS CLI v2** | Interacting with AWS |
| **kubectl** | Kubernetes cluster management |
| **Helm** | Deploying Helm charts |

---

## ⚠️ Important Security Notes

- **Root access keys MUST NOT be used in production**  
- The included IAM setup is for testing only  
- Delete temporary credentials after use  
- Never commit secrets, ARNs, or keys to GitHub  
- Use least-privilege IAM roles in production environments

---

## 🧩 Deployment Steps (Summary)

### **Step 1: Retrieve AWS root access keys (for testing only)**  
Download credentials and export them in your VS Code terminal:

```powershell
$Env:AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
$Env:AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
$Env:AWS_DEFAULT_REGION="us-east-1"
Remove-Item Env:AWS_SESSION_TOKEN


Verify:

aws sts get-caller-identity

Step 2: Deploy Core Infrastructure (EKS + Networking)
cd core-stack
terraform init
terraform validate
terraform plan -out=tfplan
terraform apply "tfplan"

Step 3: Copy Terraform Outputs

From:

terraform output


and from:

terraform_user_creds.txt

Step 4: Deploy Application Stack (ALB + Secret Manager)
cd alb-stack
terraform init
terraform apply -auto-approve


Update terraform.tfvars with:

EKS cluster details

VPC ID

OIDC provider

CI/CD IAM role ARN

Step 5: CI/CD Stack

Provides automated build + deployment pipelines.

cd cicd-stack
terraform init
terraform apply -auto-approve


Insert Terraform user access keys in terraform.tfvars.

Step 6: Elastic Cloud / Self-Managed Fleet Setup

Choose one:

cd elastic-cloudManagedFleet
# or
cd elastic-selfManagedFleet


Then:

terraform init
terraform apply -auto-approve


Add:

Elasticsearch endpoint

Kibana endpoint

Fleet Server info

Enrollment token

Step 7: Connect to EKS and Verify
aws eks update-kubeconfig --name <cluster> --region <region>
kubectl get nodes
kubectl get all --all-namespaces
kubectl get ingress -n <namespace>
kubectl describe ingress <name>
kubectl get svc -n <namespace>

📊 Observability: What You Get

Once Elastic Agent is deployed:

Application logs from pods

Metrics (CPU, memory, node metrics, pod metrics)

Tracing (if APM is enabled)

ALB logs and VPC flow logs (optional)

View all data in Kibana Dashboards.

📂 Project Structure
/core-stack                -> EKS, VPC, IAM, OIDC
/alb-stack                 -> ALB, ECR, Secrets
/cicd-stack                -> CodePipeline, CodeBuild, deployments
/elastic-cloudManagedFleet -> Cloud-based Elasticsearch + Fleet
/elastic-selfManagedFleet  -> Self-hosted Fleet Server on EKS
/application               -> App source + Dockerfile + Helm chart
