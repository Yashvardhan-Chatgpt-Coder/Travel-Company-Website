# Travel Company Website - Server Startup Script
Write-Host "🚀 Starting Travel Company Website Servers..." -ForegroundColor Green
Write-Host ""

# Kill any existing processes on ports 3000 and 5000
Write-Host "🧹 Cleaning up existing processes..." -ForegroundColor Yellow
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
    Write-Host "⚠️ Could not clean up processes (this is normal if no servers are running)" -ForegroundColor Yellow
}

Write-Host ""

# Start Backend Server
Write-Host "📍 Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Start-Job -ScriptBlock {
    Set-Location "C:\Yashvardhan\Travel Company Website\Travel-Company-Website\backend"
    python server.py
} -Name "BackendServer"

# Wait a moment for backend to start
Start-Sleep -Seconds 5

# Start Frontend Server
Write-Host "🌐 Starting Frontend Server (Port 3000)..." -ForegroundColor Cyan
Start-Job -ScriptBlock {
    Set-Location "C:\Yashvardhan\Travel Company Website\Travel-Company-Website\frontend"
    npm start
} -Name "FrontendServer"

Write-Host ""
Write-Host "✅ Both servers are starting up!" -ForegroundColor Green
Write-Host "📍 Backend: http://localhost:5000" -ForegroundColor White
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "🔧 Admin Panel: http://localhost:3000/admin" -ForegroundColor White
Write-Host ""
Write-Host "📊 Server Status:" -ForegroundColor Yellow
Write-Host "   Backend Job ID: $((Get-Job -Name 'BackendServer').Id)" -ForegroundColor Gray
Write-Host "   Frontend Job ID: $((Get-Job -Name 'FrontendServer').Id)" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 To stop servers, run: Get-Job | Stop-Job" -ForegroundColor Magenta
Write-Host "💡 To view server logs, run: Get-Job | Receive-Job" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 