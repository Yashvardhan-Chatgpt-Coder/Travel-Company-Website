# 🔒 Travel Company Website - Backup System

This backup system protects your work by automatically creating copies of your project files at regular intervals.

## 🚀 Quick Start

### 1. Create Your First Backup
```powershell
.\auto-backup.ps1
```

### 2. Set Up Automatic Backups (Recommended)
```powershell
# Run as Administrator for scheduled tasks
.\setup-auto-backup.ps1

# Or customize the frequency
.\setup-auto-backup.ps1 -BackupFrequency "daily"
.\setup-auto-backup.ps1 -BackupFrequency "custom" -CustomMinutes 30
```

## 📁 What Gets Backed Up

- **Frontend**: All React pages, components, context, services, hooks, and lib files
- **Backend**: Python files and requirements.txt
- **Configuration**: package.json, tailwind.config.js, craco.config.js
- **UI Components**: All shadcn/ui components

## ⏰ Backup Frequency Options

| Frequency | Description | Command |
|-----------|-------------|---------|
| **Hourly** | Every hour (default) | `.\setup-auto-backup.ps1` |
| **Daily** | Once per day | `.\setup-auto-backup.ps1 -BackupFrequency "daily"` |
| **Custom** | Custom interval | `.\setup-auto-backup.ps1 -BackupFrequency "custom" -CustomMinutes 30` |

## 🛠️ Manual Operations

### Create Manual Backup
```powershell
# Standard backup
.\auto-backup.ps1

# Keep only last 5 backups
.\auto-backup.ps1 -MaxBackups 5
```

### Restore from Backup
```powershell
# See what would be restored (safe)
.\restore-backup.ps1 -BackupDir "backups\2025-08-25_20-33-48" -DryRun

# Actually restore (overwrites current files)
.\restore-backup.ps1 -BackupDir "backups\2025-08-25_20-33-48"
```

## 📊 Backup Management

### View Available Backups
```powershell
Get-ChildItem "backups" -Directory | Sort-Object CreationTime -Descending
```

### Check Backup Contents
```powershell
# View backup info
Get-Content "backups\2025-08-25_20-33-48\backup-info.txt"

# List files in backup
Get-ChildItem "backups\2025-08-25_20-33-48" -Recurse
```

### Clean Up Old Backups
The system automatically keeps only the last 10 backups by default. You can change this:
```powershell
.\auto-backup.ps1 -MaxBackups 5
```

## 🔧 Troubleshooting

### Backup Script Won't Run
```powershell
# Check execution policy
Get-ExecutionPolicy

# If restricted, run with bypass
PowerShell -ExecutionPolicy Bypass -File .\auto-backup.ps1
```

### Scheduled Task Issues
```powershell
# Check if task exists
Get-ScheduledTask -TaskName "TravelWebsite_Backup"

# Remove and recreate
Unregister-ScheduledTask -TaskName "TravelWebsite_Backup" -Confirm:$false
.\setup-auto-backup.ps1
```

### Restore Issues
```powershell
# Always test with dry run first
.\restore-backup.ps1 -BackupDir "backups\YYYY-MM-DD_HH-MM-SS" -DryRun

# Check file permissions
Get-Acl "backups"
```

## 📋 Backup File Structure

```
backups/
├── 2025-08-25_20-33-48/
│   ├── pages/           # React page components
│   ├── components/      # UI components
│   ├── context/         # React context files
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── backend/         # Python backend files
│   ├── package.json     # Frontend dependencies
│   ├── tailwind.config.js
│   ├── craco.config.js
│   └── backup-info.txt  # Backup metadata
└── 2025-08-25_19-45-12/
    └── ...
```

## 🚨 Important Notes

1. **Always test restores** with `-DryRun` first
2. **Keep multiple backups** - don't rely on just one
3. **Check backup contents** before deleting old ones
4. **Run as Administrator** for scheduled tasks
5. **Backups are incremental** - each backup is complete

## 💡 Best Practices

- **Daily backups** for active development
- **Before major changes** - create manual backup
- **Test restores** monthly to ensure backups work
- **Keep backups** on different drives if possible
- **Document changes** in commit messages

## 🔍 Monitoring

### Check Backup Status
```powershell
# View latest backup
Get-ChildItem "backups" -Directory | Sort-Object CreationTime -Descending | Select-Object -First 1

# Check backup sizes
Get-ChildItem "backups" -Directory | ForEach-Object {
    $size = (Get-ChildItem $_.FullName -Recurse | Measure-Object -Property Length -Sum).Sum / 1KB
    [PSCustomObject]@{
        Name = $_.Name
        Size = "$([math]::Round($size, 2)) KB"
        Created = $_.CreationTime
    }
}
```

### Verify Backup Integrity
```powershell
# Test backup script
.\auto-backup.ps1 -BackupType "test" -MaxBackups 1

# Check file counts
$backupDir = "backups\2025-08-25_20-33-48"
Get-ChildItem $backupDir -Recurse -File | Measure-Object | Select-Object Count
```

## 🆘 Emergency Recovery

If something goes wrong:

1. **Stop making changes** to prevent further damage
2. **Identify the problem** - what files are affected?
3. **Choose the right backup** - closest to when things worked
4. **Test restore** with dry run first
5. **Restore carefully** - one section at a time if needed

## 📞 Support

If you encounter issues:

1. Check the backup logs in the backup directories
2. Verify file permissions and execution policies
3. Test with a simple manual backup first
4. Check PowerShell version compatibility

---

**🔒 Your work is now protected!** 

Run `.\auto-backup.ps1` now to create your first backup and ensure nothing gets lost.
