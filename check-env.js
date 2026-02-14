// Environment Configuration Checker
// Run this to verify your setup: node check-env.js

const checkConfig = () => {
  console.log('\n🔍 Checking MedAI Configuration...\n');

  const requiredVars = {
    'VITE_SUPABASE_URL': process.env.VITE_SUPABASE_URL,
    'VITE_SUPABASE_ANON_KEY': process.env.VITE_SUPABASE_ANON_KEY,
  };

  const optionalVars = {
    'VITE_API_BASE_URL': process.env.VITE_API_BASE_URL,
    'VITE_GOOGLE_MAPS_API_KEY': process.env.VITE_GOOGLE_MAPS_API_KEY,
  };

  let hasErrors = false;

  // Check required variables
  console.log('📋 Required Environment Variables:\n');
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value || value.includes('your-') || value.includes('placeholder')) {
      console.log(`   ❌ ${key}: ⚠️ NOT CONFIGURED`);
      hasErrors = true;
    } else {
      console.log(`   ✅ ${key}: Configured`);
    }
  }

  // Check optional variables
  console.log('\n📋 Optional Environment Variables:\n');
  for (const [key, value] of Object.entries(optionalVars)) {
    if (!value || value.includes('your-')) {
      console.log(`   ⚠️  ${key}: Not configured (optional)`);
    } else {
      console.log(`   ✅ ${key}: Configured`);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  if (hasErrors) {
    console.log('❌ CONFIGURATION INCOMPLETE\n');
    console.log('📝 To fix this:\n');
    console.log('1. Get credentials from Vercel Dashboard:');
    console.log('   https://vercel.com/dashboard → Your Project → Settings → Environment Variables\n');
    console.log('2. Or get from Supabase Dashboard:');
    console.log('   https://app.supabase.com/ → Your Project → Settings → API\n');
    console.log('3. Update your .env file with real values\n');
    console.log('4. Restart your dev server: npm run dev\n');
    process.exit(1);
  } else {
    console.log('✅ ALL REQUIRED VARIABLES CONFIGURED\n');
    console.log('🚀 Your app should work correctly!\n');
    console.log('Run: npm run dev\n');
  }
};

// Check if .env file exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n⚠️  WARNING: .env file not found!\n');
  console.log('Creating .env from .env.example...\n');
  
  const examplePath = path.join(__dirname, '.env.example');
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ .env file created from .env.example\n');
    console.log('📝 Now edit .env and add your Supabase credentials\n');
  }
}

// Load environment variables
require('dotenv').config();

checkConfig();
