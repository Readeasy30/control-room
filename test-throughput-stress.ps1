$ErrorActionPreference = "SilentlyContinue"
$Targets = @{ "Cloudflare Tunnel" = "https://yourdomain.com"; "Docker Loop" = "http://localhost:20128/v1/chat/completions" }
$Payload = @{ model = "auto"; messages = @(@{ role = "user"; content = "Execute performance routines." }); max_tokens = 10 } | ConvertTo-Json -Compress -Encoding utf8
foreach ($TargetName in $Targets.Keys) {
    $Stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $Task = Invoke-RestMethod -Uri $Targets[$TargetName] -Method Post -Body $Payload -ContentType "application/json" -TimeoutSec 5
        $Stopwatch.Stop()
        Write-Host "[STRESS] $TargetName Passed: $($Stopwatch.ElapsedMilliseconds) ms" -ForegroundColor Green
    } catch {
        Write-Warning "[STRESS] $TargetName Deferred."
    }
}
