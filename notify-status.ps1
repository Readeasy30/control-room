param([string]$Message)
$TargetUri = $env:DISCORD_WEBHOOK_URL
if (-not $TargetUri) { $TargetUri = "https://yourdomain.com/webhook/omniroute-alerts" }
if ($TargetUri) {
    $Body = @{ content = "[OmniRoute::wholelychit] [Readeasy30] $Message" } | ConvertTo-Json -Compress -Encoding utf8
    Invoke-RestMethod -Uri $TargetUri -Method Post -Body $Body -ContentType "application/json" -ErrorAction SilentlyContinue
}
