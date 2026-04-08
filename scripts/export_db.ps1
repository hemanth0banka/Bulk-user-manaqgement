# Export script for Bulk User Management System

# Variables
$DB_NAME = "bulk_user_db"
$BACKUP_DIR = "db_backup"
$EXPORT_FILE = "users.json"
$COLLECTION = "users"

Write-Host "Starting Database Export..." -ForegroundColor Cyan

# 1. BSON Export (mongodump)
Write-Host "Exporting to BSON (mongodump)..."
if (Test-Path $BACKUP_DIR) {
    Remove-Item -Recurse -Force $BACKUP_DIR
}
mongodump --db $DB_NAME --out $BACKUP_DIR

# 2. JSON Export (mongoexport)
Write-Host "Exporting to JSON (mongoexport)..."
mongoexport --db $DB_NAME --collection $COLLECTION --out $EXPORT_FILE --jsonArray

Write-Host "Export Complete!" -ForegroundColor Green
Write-Host "Backup folder: $BACKUP_DIR"
Write-Host "JSON file: $EXPORT_FILE"
