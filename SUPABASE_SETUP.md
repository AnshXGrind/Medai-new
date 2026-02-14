# 🚨 CRITICAL: Supabase Environment Setup Required

## Issue Found

Your `.env` file has **placeholder credentials** that need to be replaced with real Supabase credentials from your Vercel integration.

## 🔧 Quick Fix (2 minutes)

### Step 1: Get Supabase Credentials from Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your MedAI project
3. Go to **Settings** → **Environment Variables**
4. You should see `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` 
5. Copy these values

### Step 2: Update Local .env File

Replace the placeholder values in `.env`:

```bash
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-starting-with-eyJ...
```

### Step 3: Restart Development Server

```bash
npm run dev
```

---

## 🔍 Alternative: Get from Supabase Dashboard

1. Go to https://app.supabase.com/
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## ✅ What Should Work After Setup

- ✅ User registration (sign up)
- ✅ User login (sign in)
- ✅ Password reset
- ✅ Health ID creation
- ✅ Profile management
- ✅ Dashboard access

---

## 🧪 Test Authentication

After updating credentials, test:

```bash
# Start dev server
npm run dev

# Try to sign up a new account
# Email: test@example.com
# Password: Test@123456
```

---

## ⚠️ Common Errors & Solutions

### Error: "Invalid API key"
**Solution:** Update `VITE_SUPABASE_ANON_KEY` with the correct value

### Error: "Failed to connect to Supabase"
**Solution:** Check `VITE_SUPABASE_URL` format (should start with https://)

### Error: "Email not confirmed"
**Solution:** Check Supabase email settings or use email confirmation

---

## 📋 Full Environment Variables Needed

```bash
# Supabase (REQUIRED)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# Backend API (Optional - for modules)
VITE_API_BASE_URL=http://localhost:5000/api

# Google Maps (Optional - for location features)
VITE_GOOGLE_MAPS_API_KEY=your-key
```

---

Need help? The authentication system is ready - just needs real credentials!
