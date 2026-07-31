terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront akzeptiert ACM-Zertifikate nur aus us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
