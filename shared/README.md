# Shared

Shared utilities and configurations used across the application.

## Structure

```
shared/
├── config/       # Shared configuration
├── constants/    # App constants
├── services/     # Shared services
└── examples/     # Example code
```

## Usage

Import shared utilities in your components:

```typescript
import { API_ENDPOINTS } from '@/shared/constants';
import { apiService } from '@/shared/services';
```
