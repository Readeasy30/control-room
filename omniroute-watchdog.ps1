$ErrorActionPreference = "SilentlyContinue"
.\notify-status.ps1 -Message "Telemetry loop initialized. Monitoring active on Readeasy30."
while ($true) {
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:20128" -Method Head -TimeoutSec 2 -UseBasicParsing
        $ContainerStatus = docker inspect --format='{{.State.Running}}' omniroute_gateway
        if ($ContainerStatus -ne "true") { throw "Container fault." }
    } catch {
        Write-Warning "[WATCHDOG] Port 20128 failure. Restarting container..."
        .\notify-status.ps1 -Message "CRITICAL: Port 20128 drop on Readeasy30. Reloading."
        docker compose restart omniroute
        Start-Sleep -Seconds 8
    }
    Start-Sleep -Seconds 10
}
