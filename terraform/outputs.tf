output "website_url" {
  description = "URL der Website"
  value       = "https://${var.domain_name}"
}

output "nameservers" {
  description = "Diese vier Nameserver bei Strato unter 'Eigene Nameserver' eintragen"
  value       = aws_route53_zone.site.name_servers
}

output "cloudfront_url" {
  description = "Direkte CloudFront-URL (funktioniert unabhängig vom DNS)"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "Distribution-ID, z. B. für Cache-Invalidierungen"
  value       = aws_cloudfront_distribution.site.id
}

output "s3_bucket" {
  description = "Name des S3-Buckets mit den Website-Dateien"
  value       = aws_s3_bucket.site.id
}
