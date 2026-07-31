data "aws_caller_identity" "current" {}

locals {
  github_repo  = "themmerich/revelations-ai"
  state_bucket = "clive-barker-ai-tfstate-${data.aws_caller_identity.current.account_id}"
}

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
  ]
}

# Nur der main-Branch dieses Repos darf die Rolle übernehmen
data "aws_iam_policy_document" "github_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${local.github_repo}:ref:refs/heads/main"]
    }
  }
}

data "aws_iam_policy_document" "github_deploy" {
  statement {
    sid     = "SiteAndStateBuckets"
    actions = ["s3:*"]
    resources = [
      aws_s3_bucket.site.arn,
      "${aws_s3_bucket.site.arn}/*",
      "arn:aws:s3:::${local.state_bucket}",
      "arn:aws:s3:::${local.state_bucket}/*",
    ]
  }

  statement {
    sid = "CloudFront"
    actions = [
      "cloudfront:Get*",
      "cloudfront:List*",
      "cloudfront:UpdateDistribution",
      "cloudfront:CreateInvalidation",
    ]
    resources = ["*"]
  }

  statement {
    sid = "Route53"
    actions = [
      "route53:Get*",
      "route53:List*",
      "route53:ChangeResourceRecordSets",
    ]
    resources = ["*"]
  }

  statement {
    sid = "AcmRead"
    actions = [
      "acm:DescribeCertificate",
      "acm:GetCertificate",
      "acm:ListCertificates",
      "acm:ListTagsForCertificate",
    ]
    resources = ["*"]
  }

  # Leserechte auf die eigenen IAM-Ressourcen, damit `terraform plan`
  # sie refreshen kann; Änderungen an IAM laufen weiterhin lokal.
  statement {
    sid = "IamReadOwnResources"
    actions = [
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:ListRolePolicies",
      "iam:ListAttachedRolePolicies",
      "iam:GetOpenIDConnectProvider",
    ]
    resources = [
      aws_iam_openid_connect_provider.github.arn,
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-github-deploy",
    ]
  }
}

resource "aws_iam_role" "github_deploy" {
  name               = "${var.project_name}-github-deploy"
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}
