variable "aws_region" {
  description = "AWS-Region für den S3-Bucket"
  type        = string
  default     = "eu-central-1"
}

variable "domain_name" {
  description = "Domain der Website (bei Strato registriert, DNS via Route 53)"
  type        = string
  default     = "clivebarker.eu"
}

variable "project_name" {
  description = "Projektname, dient als Präfix für alle Ressourcen"
  type        = string
  default     = "clive-barker-ai"
}
