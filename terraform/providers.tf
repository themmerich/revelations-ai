terraform {
  required_version = ">= 1.10"

  backend "s3" {
    bucket       = "clive-barker-ai-tfstate-202533533588"
    key          = "clive-barker-ai/terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
  }

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
