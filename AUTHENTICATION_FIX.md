# 🔧 Quick Fix Guide: Authentication Issues

## Problem Identified

Your signup/signin isn't working because **Supabase environment variables are not configured**.

Current `.env` file has placeholders:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co  ❌
VITE_SUPABASE_ANON_KEY=your-anon-key-here  ❌
```

---

## ✅ Solution (3 Steps - Takes 2 Minutes)

### Step 1: Get Supabase Credentials

**Option A: From Vercel (Recommended)**
1. Go to: https://vercel.com/dashboard
2. Click your MedAI project
3. Go to: **Settings** → **Environment Variables**
4. Copy `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Option B: From Supabase Dashboard**
1. Go to: https://app.supabase.com/
2. Select your project
3. Go to: **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public** key → `VITE_SUPABASE_ANON_KEY`

### Step 2: Update `.env` File

Replace in your `.env` file:
```bash
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Development Server

```bash
npm run dev
```

---

## 🚀 Verify Setup

Run the configuration checker:
```bash
npm run check-env
```

This will tell you if everything is configured correctly!

---

## ✅ Test Authentication

After setup, test with:
1. Go to http://localhost:5173/auth
2. Sign up with:
   - Email: test@example.com
   - Password: Test@123456
   - Full Name: Test User
   - Health ID: 1234-5678-9012-34 (for patients)
3. Check console for any errors

---

## 🐛 Troubleshooting

### Error: "Failed to fetch" or "Cannot connect to Supabase"
**Cause:** Supabase credentials not set
**Fix:** Follow steps above to update `.env`

### Error: "Invalid API key"
**Cause:** Wrong `VITE_SUPABASE_ANON_KEY`
**Fix:** Re-copy from Supabase dashboard (Settings → API → anon/public key)

### Error: "Invalid URL"
**Cause:** Wrong `VITE_SUPABASE_URL` format
**Fix:** Should be: `https://xxxxxxxxxxxxx.supabase.co` (no trailing slash)

### Error: "Email not confirmed"
**Cause:** Supabase email confirmation enabled
**Fix:** 
- Check your email for confirmation link, OR
- Disable in Supabase: Authentication → Providers → Email → Disable "Confirm email"

### Sign up works but immediate login fails
**Cause:** Email confirmation required
**Fix:** Check Supabase email settings

---

## 🔒 What I Fixed in Code

1. ✅ **Enhanced error handling** in `useAuth.tsx`
2. ✅ **Better error messages** for common Supabase issues
3. ✅ **Configuration validation** on app startup
4. ✅ **Detailed logging** for debugging
5. ✅ **Created profiles migration** for user data
6. ✅ **Environment checker script**

---

## 📋 Complete Environment Variables

Required for authentication:
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

Optional (for full features):
```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your-key
```

---

## 🎯 Next Steps After Fix

1. ✅ Users can register (patient or doctor)
2. ✅ Users can login
3. ✅ Users get redirected to their dashboard
4. ✅ Health ID creation works
5. ✅ Password reset works
6. ✅ Profile management works

---

Need more help? Check the browser console (F12) for detailed error messages!
