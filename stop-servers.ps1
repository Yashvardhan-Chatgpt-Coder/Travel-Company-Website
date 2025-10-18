# Travel Company Website - Server Stop Script
Write-Host "🛑 Stopping Travel Company Website Servers..." -ForegroundColor Red
Write-Host ""

# Stop all background jobs
Write-Host "🧹 Stopping background jobs..." -ForegroundColor Yellow
Get-Job | Stop-Job
Get-Job | Remove-Job
Write-Host "✅ All background jobs stopped" -ForegroundColor Green

# Kill processes on ports 3000 and 5000
Write-Host "🔌 Killing processes on ports 3000 and 5000..." -ForegroundColor Yellow
try {
    $process3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    $process5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    
    if ($process3000) {
        Stop-Process -Id $process3000 -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Killed process on port 3000" -ForegroundColor Green
    }
    if ($process5000) {
        Stop-Process -Id $process5000 -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Killed process on port 5000" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Could not kill processes (this is normal if no servers are running)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ All servers stopped successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 