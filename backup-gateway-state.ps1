$ErrorActionPreference = "Stop"
$SourceFile = ".\config\models_cache.json"
$TimeStamp  = Get-Date -Format "yyyyMMdd_HHmmss"
$DestFile   = ".\config\snapshots\models_cache_$TimeStamp.bak"
if (Test-Path $SourceFile) {
    Copy-Item -Path $SourceFile -Destination $DestFile -Force
    .\notify-status.ps1 -Message "SYSTEM: Backup snapshot generated successfully on Readeasy30."
}
