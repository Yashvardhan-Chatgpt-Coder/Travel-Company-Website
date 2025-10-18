# Auto-Backup Script for Travel Company Website
# This script automatically backs up your project files

param(
    [string]$BackupType = "auto",
    [int]$MaxBackups = 10
)

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupDir = "backups\$timestamp"

Write-Host "Starting backup process..." -ForegroundColor Green
Write-Host "Backup directory: $backupDir" -ForegroundColor Cyan

# Create backup directory structure
try {
    # Create main backup directory
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    # Create subdirectories
    $directories = @("pages", "components", "context", "services", "hooks", "lib")
    foreach ($dir in $directories) {
        New-Item -ItemType Directory -Path "$backupDir\$dir" -Force | Out-Null
    }
    
    Write-Host "Backup directories created successfully" -ForegroundColor Green
} catch {
    Write-Host "Error creating backup directories: $_" -ForegroundColor Red
    exit 1
}

# Copy files with progress
try {
    Write-Host "Copying files..." -ForegroundColor Yellow
    
    # Copy pages
    Copy-Item "frontend\src\pages\*.jsx" "$backupDir\pages\" -Force
    Write-Host "   Pages backed up" -ForegroundColor Green
    
    # Copy components
    Copy-Item "frontend\src\components\*.jsx" "$backupDir\components\" -Force
    Copy-Item "frontend\src\components\ui\*.jsx" "$backupDir\components\ui\" -Force -Recurse
    Write-Host "   Components backed up" -ForegroundColor Green
    
    # Copy context
    Copy-Item "frontend\src\context\*.js" "$backupDir\context\" -Force
    Write-Host "   Context backed up" -ForegroundColor Green
    
    # Copy services
    Copy-Item "frontend\src\services\*.js" "$backupDir\services\" -Force
    Write-Host "   Services backed up" -ForegroundColor Green
    
    # Copy hooks
    Copy-Item "frontend\src\hooks\*.js" "$backupDir\hooks\" -Force
    Write-Host "   Hooks backed up" -ForegroundColor Green
    
    # Copy lib
    Copy-Item "frontend\src\lib\*.js" "$backupDir\lib\" -Force
    Write-Host "   Lib backed up" -ForegroundColor Green
    
    # Copy backend files
    Copy-Item "backend\*.py" "$backupDir\" -Force
    Copy-Item "backend\requirements.txt" "$backupDir\" -Force
    Write-Host "   Backend backed up" -ForegroundColor Green
    
    # Copy config files
    Copy-Item "frontend\package.json" "$backupDir\" -Force
    Copy-Item "frontend\tailwind.config.js" "$backupDir\" -Force
    Copy-Item "frontend\craco.config.js" "$backupDir\" -Force
    Write-Host "   Config files backed up" -ForegroundColor Green
    
} catch {
    Write-Host "Error copying files: $_" -ForegroundColor Red
    exit 1
}

# Create backup info file
try {
    $backupInfo = @"
# Backup Information
Backup Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Backup Type: $BackupType
Project: Travel Company Website
Files Backed Up:
- Frontend pages, components, context, services, hooks, lib
- Backend Python files
- Configuration files
- Package dependencies

Total Files: $(Get-ChildItem $backupDir -Recurse -File | Measure-Object | Select-Object -ExpandProperty Count)
Backup Size: $([math]::Round((Get-ChildItem $backupDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB, 2)) MB

This backup was created automatically to protect your work.
"@
    
    $backupInfo | Out-File "$backupDir\backup-info.txt" -Encoding UTF8
    Write-Host "   Backup info created" -ForegroundColor Green
    
} catch {
    Write-Host "Warning: Could not create backup info file" -ForegroundColor Yellow
}

# Clean up old backups (keep only last MaxBackups)
try {
    $oldBackups = Get-ChildItem "backups" -Directory | Sort-Object CreationTime -Descending | Select-Object -Skip $MaxBackups
    
    if ($oldBackups.Count -gt 0) {
        Write-Host "Cleaning up old backups..." -ForegroundColor Yellow
        foreach ($oldBackup in $oldBackups) {
            Remove-Item $oldBackup.FullName -Recurse -Force
            Write-Host "   Removed: $($oldBackup.Name)" -ForegroundColor Gray
        }
        Write-Host "   Cleanup completed" -ForegroundColor Green
    }
} catch {
    Write-Host "Warning: Could not clean up old backups" -ForegroundColor Yellow
}

# Final summary
$backupSize = [math]::Round((Get-ChildItem $backupDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1KB, 2)
Write-Host ""
Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Backup Summary:" -ForegroundColor Cyan
Write-Host "   Location: $backupDir" -ForegroundColor White
Write-Host "   Size: $backupSize KB" -ForegroundColor White
Write-Host "   Time: $(Get-Date -Format "HH:mm:ss")" -ForegroundColor White
Write-Host ""
Write-Host "To restore from this backup:" -ForegroundColor Yellow
Write-Host "   1. Copy files from $backupDir back to their original locations" -ForegroundColor White
Write-Host "   2. Or use the restore script: .\restore-backup.ps1 -BackupDir '$backupDir'" -ForegroundColor White
Write-Host ""
Write-Host "Your work is now safely backed up!" -ForegroundColor Green
