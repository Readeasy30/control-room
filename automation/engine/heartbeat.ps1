$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$status = @{
    engine = "control-room"
    status = "running"
    timestamp = $timestamp
} | ConvertTo-Json

$status | Out-File automation\engine\status.json -Encoding utf8

Write-Host "CONTROL ROOM HEARTBEAT"
Write-Host $status
