locals {
  site_root = "${path.module}/.."

  site_files = concat(
    tolist(fileset(local.site_root, "*.html")),
    tolist(fileset(local.site_root, "css/**")),
    tolist(fileset(local.site_root, "js/**")),
    tolist(fileset(local.site_root, "assets/**")),
  )

  content_types = {
    html = "text/html; charset=utf-8"
    css  = "text/css; charset=utf-8"
    js   = "text/javascript; charset=utf-8"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    png  = "image/png"
    webp = "image/webp"
    svg  = "image/svg+xml"
    ico  = "image/x-icon"
    json = "application/json"
    txt  = "text/plain; charset=utf-8"
  }
}

resource "aws_s3_object" "site" {
  for_each = toset(local.site_files)

  bucket = aws_s3_bucket.site.id
  key    = each.value
  source = "${local.site_root}/${each.value}"
  etag   = filemd5("${local.site_root}/${each.value}")

  # lower(): die Assets enthalten auch ".JPG"-Dateien
  content_type = lookup(
    local.content_types,
    lower(regex("[^.]+$", each.value)),
    "application/octet-stream",
  )

  # HTML kurz cachen, damit Änderungen schnell sichtbar werden; Bilder lange
  cache_control = endswith(each.value, ".html") ? "public, max-age=300" : "public, max-age=86400"
}
