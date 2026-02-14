# Security Documentation

## Security Measures

### Authentication
- Supabase Auth with JWT tokens
- Secure session management
- Password hashing with bcrypt

### Authorization
- Row Level Security (RLS) policies
- Role-based access control (RBAC)
- User-specific data isolation

### Data Protection
- Aadhaar numbers hashed (SHA-256)
- Only last 4 digits displayed
- Encrypted data at rest (Supabase)
- HTTPS-only communication

### Privacy
- Consent-driven access
- Minimal data collection
- User-controlled sharing
- Emergency access protocols

### Best Practices
- Regular security audits
- Dependency updates
- Environment variable protection
- Input validation
- XSS prevention
- CSRF protection

## Security Checklist

- [x] JWT authentication
- [x] RLS on all tables
- [x] Hashed sensitive data
- [x] HTTPS enforcement
- [x] Environment variables secured
- [ ] Penetration testing
- [ ] Security audit
- [ ] HIPAA compliance review

## Reporting Security Issues

Please report security vulnerabilities to the maintainers directly. Do not open public issues for security concerns.
