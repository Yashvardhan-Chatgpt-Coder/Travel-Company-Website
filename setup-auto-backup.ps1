# Setup Auto-Backup Script
# This script sets up automatic scheduled backups for your project

param(
    [string]$BackupFrequency = "hourly",  # hourly, daily, or custom
    [int]$CustomMinutes = 60              # Custom interval in minutes
)

Write-Host "🚀 Setting up automatic backups for Travel Company Website..." -ForegroundColor Green
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "⚠️  Warning: This script should be run as Administrator for scheduled tasks" -ForegroundColor Yellow
    Write-Host "   You can still use manual backups with: .\auto-backup.ps1" -ForegroundColor White
    Write-Host ""
}

# Get current project path
$projectPath = Get-Location
$scriptPath = Join-Path $projectPath "auto-backup.ps1"

Write-Host "📁 Project Path: $projectPath" -ForegroundColor Cyan
Write-Host "📜 Script Path: $scriptPath" -ForegroundColor Cyan
Write-Host ""

# Create backup directory if it doesn't exist
if (-not (Test-Path "backups")) {
    New-Item -ItemType Directory -Path "backups" -Force | Out-Null
    Write-Host "✅ Created backups directory" -ForegroundColor Green
}

# Test the backup script
Write-Host "🧪 Testing backup script..." -ForegroundColor Yellow
try {
    & $scriptPath -BackupType "test" -MaxBackups 1
    Write-Host "✅ Backup script test successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Backup script test failed: $_" -ForegroundColor Red
    Write-Host "   Please check the script and try again" -ForegroundColor White
    exit 1
}

Write-Host ""

# Setup scheduled task
if ($isAdmin) {
    Write-Host "📅 Setting up scheduled task..." -ForegroundColor Yellow
    
    $taskName = "TravelWebsite_Backup"
    $taskDescription = "Automatic backup for Travel Company Website project"
    
    # Remove existing task if it exists
    try {
        Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
        Write-Host "   🗑️  Removed existing scheduled task" -ForegroundColor Gray
    } catch {
        # Task didn't exist, that's fine
    }
    
    # Create trigger based on frequency
    switch ($BackupFrequency.ToLower()) {
        "hourly" {
            $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 60) -RepetitionDuration (New-TimeSpan -Days 365)
            Write-Host "   ⏰ Set to run every hour" -ForegroundColor White
        }
        "daily" {
            $trigger = New-ScheduledTaskTrigger -Daily -At (Get-Date)
            Write-Host "   ⏰ Set to run daily at $(Get-Date -Format 'HH:mm')" -ForegroundColor White
        }
        "custom" {
            $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes $CustomMinutes) -RepetitionDuration (New-TimeSpan -Days 365)
            Write-Host "   ⏰ Set to run every $CustomMinutes minutes" -ForegroundColor White
        }
        default {
            Write-Host "❌ Invalid backup frequency. Using hourly as default." -ForegroundColor Red
            $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 60) -RepetitionDuration (New-TimeSpan -Days 365)
        }
    }
    
    # Create action
    $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`" -BackupType auto"
    
    # Create settings
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable
    
    # Create principal
    $principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest
    
    # Register the task
    try {
        Register-ScheduledTask -TaskName $taskName -Trigger $trigger -Action $action -Settings $settings -Principal $principal -Description $taskDescription
        Write-Host "   ✅ Scheduled task created successfully" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ Failed to create scheduled task: $_" -ForegroundColor Red
        Write-Host "   💡 You can still use manual backups" -ForegroundColor Yellow
    }
} else {
    Write-Host "💡 To set up automatic backups, run this script as Administrator" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Backup Options:" -ForegroundColor Cyan
Write-Host "   1. Manual backup: .\auto-backup.ps1" -ForegroundColor White
Write-Host "   2. Manual backup (keep 5 backups): .\auto-backup.ps1 -MaxBackups 5" -ForegroundColor White
Write-Host "   3. Restore from backup: .\restore-backup.ps1 -BackupDir 'backups\YYYY-MM-DD_HH-MM-SS'" -ForegroundColor White
Write-Host "   4. Dry run restore: .\restore-backup.ps1 -BackupDir 'backups\YYYY-MM-DD_HH-MM-SS' -DryRun" -ForegroundColor White

Write-Host ""
Write-Host "📊 Current backup status:" -ForegroundColor Cyan
$backupCount = (Get-ChildItem "backups" -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
if ($backupCount -gt 0) {
    $latestBackup = Get-ChildItem "backups" -Directory | Sort-Object CreationTime -Descending | Select-Object -First 1
    Write-Host "   📁 Total backups: $backupCount" -ForegroundColor White
    Write-Host "   🕐 Latest backup: $($latestBackup.Name) - $($latestBackup.CreationTime)" -ForegroundColor White
} else {
    Write-Host "   📁 No backups found yet" -ForegroundColor White
}

Write-Host ""
Write-Host "🔒 Your project is now protected with automatic backups!" -ForegroundColor Green
Write-Host "💡 Tip: Run .\auto-backup.ps1 now to create your first backup" -ForegroundColor Yellow
