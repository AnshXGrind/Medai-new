# Scripts

Utility scripts for MED-Aid development and deployment.

## Available Scripts

### Database Migrations

- `apply-migration.mjs` - Apply database migrations
- `apply-migration.ps1` - PowerShell migration script
- `apply-migrations-auto.mjs` - Auto-apply pending migrations
- `check-migration.mjs` - Check migration status
- `verify-migration.ps1` - Verify migration completed
- `run-rls-migration.ps1` - Run RLS policy migrations

### Setup Scripts

- `QUICK_SETUP.ps1` - Quick project setup (Windows)
- `setup-universal-health-id.ps1` - Set up health ID system
- `health-id-check.js` - Validate health ID configuration

### Development

- `START_SERVER.bat` - Start development servers (Windows)

## Usage

### Run Migration

```bash
node scripts/apply-migration.mjs
```

### Quick Setup (Windows)

```powershell
.\scripts\QUICK_SETUP.ps1
```

### Check Health ID

```bash
node scripts/health-id-check.js
```

## Notes

- Most scripts require environment variables configured
- PowerShell scripts are for Windows
- Migration scripts connect to Supabase
- Always backup data before running migrations
