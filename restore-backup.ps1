# Restore Backup Script for Travel Company Website
# This script restores your project from a backup

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupDir,  # The backup directory to restore from
    
    [switch]$DryRun      # Show what would be restored without actually doing it
)

# Validate backup directory exists
if (-not (Test-Path $BackupDir)) {
    Write-Host "❌ Error: Backup directory '$BackupDir' does not exist!" -ForegroundColor Red
    Write-Host "💡 Available backups:" -ForegroundColor Yellow
    Get-ChildItem "backups" -Directory | Sort-Object CreationTime -Descending | ForEach-Object {
        Write-Host "   📁 $($_.Name) - Created: $($_.CreationTime)" -ForegroundColor White
    }
    exit 1
}

# Check if backup info exists
$backupInfoPath = Join-Path $BackupDir "backup-info.txt"
if (Test-Path $backupInfoPath) {
    Write-Host "📋 Backup Information:" -ForegroundColor Cyan
    Get-Content $backupInfoPath | ForEach-Object {
        if ($_ -match "^#") {
            Write-Host $_ -ForegroundColor Yellow
        } else {
            Write-Host $_ -ForegroundColor White
        }
    }
    Write-Host ""
}

# Confirm restoration
Write-Host "⚠️  WARNING: This will overwrite your current project files!" -ForegroundColor Red
Write-Host "📁 Restoring from: $BackupDir" -ForegroundColor Cyan
Write-Host "🎯 Target: Current project directory" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No files will be modified" -ForegroundColor Yellow
} else {
    $confirmation = Read-Host "Are you sure you want to continue? (yes/no)"
    if ($confirmation -ne "yes") {
        Write-Host "❌ Restoration cancelled" -ForegroundColor Red
        exit 0
    }
}

# Create restoration plan
$restorePlan = @()

# Check what can be restored
$sections = @("pages", "components", "context", "services", "hooks", "lib")
foreach ($section in $sections) {
    $backupSectionPath = Join-Path $BackupDir $section
    $targetSectionPath = "frontend\src\$section"
    
    if (Test-Path $backupSectionPath) {
        $files = Get-ChildItem $backupSectionPath -File
        foreach ($file in $files) {
            $targetFile = Join-Path $targetSectionPath $file.Name
            $restorePlan += @{
                Source = $file.FullName
                Target = $targetFile
                Section = $section
                Exists = Test-Path $targetFile
            }
        }
    }
}

# Check backend files
$backendFiles = Get-ChildItem $BackupDir -File | Where-Object { $_.Extension -eq ".py" -or $_.Name -eq "requirements.txt" }
foreach ($file in $backendFiles) {
    $targetFile = "backend\$($file.Name)"
    $restorePlan += @{
        Source = $file.FullName
        Target = $targetFile
        Section = "backend"
        Exists = Test-Path $targetFile
    }
}

# Check config files
$configFiles = @("package.json", "tailwind.config.js", "craco.config.js")
foreach ($configFile in $configFiles) {
    $backupConfigPath = Join-Path $BackupDir $configFile
    if (Test-Path $backupConfigPath) {
        $targetFile = "frontend\$configFile"
        $restorePlan += @{
            Source = $backupConfigPath
            Target = $targetFile
            Section = "config"
            Exists = Test-Path $targetFile
        }
    }
}

# Show restoration plan
Write-Host "📋 Restoration Plan:" -ForegroundColor Cyan
Write-Host "Total files to restore: $($restorePlan.Count)" -ForegroundColor White

$restorePlan | Group-Object Section | ForEach-Object {
    Write-Host "   📁 $($_.Name): $($_.Count) files" -ForegroundColor White
}

Write-Host ""

# Execute restoration
if ($DryRun) {
    Write-Host "🔍 DRY RUN - Files that would be restored:" -ForegroundColor Yellow
    $restorePlan | ForEach-Object {
        $status = if ($_.Exists) { "UPDATE" } else { "CREATE" }
        Write-Host "   $status: $($_.Target)" -ForegroundColor Gray
    }
} else {
    Write-Host "🚀 Starting restoration..." -ForegroundColor Green
    
    $successCount = 0
    $errorCount = 0
    
    foreach ($item in $restorePlan) {
        try {
            # Ensure target directory exists
            $targetDir = Split-Path $item.Target -Parent
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            
            # Copy file
            Copy-Item $item.Source $item.Target -Force
            $successCount++
            Write-Host "   ✅ Restored: $($item.Target)" -ForegroundColor Green
            
        } catch {
            $errorCount++
            Write-Host "   ❌ Error restoring: $($item.Target) - $_" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Restoration completed!" -ForegroundColor Green
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    Write-Host "   ✅ Successfully restored: $successCount files" -ForegroundColor Green
    if ($errorCount -gt 0) {
        Write-Host "   ❌ Errors: $errorCount files" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review the restored files" -ForegroundColor White
Write-Host "   2. Test your application" -ForegroundColor White
Write-Host "   3. Run 'npm install' if package.json was restored" -ForegroundColor White
Write-Host "   4. Run 'pip install -r requirements.txt' if backend was restored" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Your project has been restored from backup!" -ForegroundColor Green
