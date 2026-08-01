$ErrorActionPreference = "SilentlyContinue"
$Containers = @("omniroute_gateway", "n8n_automation", "cloudflare_tunnel")
foreach ($Container in $Containers) {
    $LogPath = docker inspect --format='{{.LogPath}}' $Container 2>$null
    if ($LogPath -and (Test-Path $LogPath)) {
        if ((Get-Item $LogPath).Length -gt 10MB) {
            Clear-Content -Path $LogPath -ErrorAction SilentlyContinue
            .\notify-status.ps1 -Message "SYSTEM: Log buffer for container [$Container] truncated safely."
        }
    }
}
