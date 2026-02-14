/**
 * Universal Health ID Utilities
 * Generates and validates 14-digit Health IDs in format: XX-XXXX-XXXX-XXXX
 */

import { supabase } from '@/integrations/supabase/client';

const DEFAULT_ATTEMPTS = 12;
const DEFAULT_TIMEOUT_MS = 1200;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function randomDigits(length: number): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((num) => (num % 10).toString())
      .join('');
  }
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

async function checkHealthIdExists(healthId: string, timeoutMs: number) {
  if (!supabase) return 'not_found' as const;

  try {
    const supabasePromise = supabase
      .from('health_ids')
      .select('health_id_number')
      .eq('health_id_number', healthId)
      .maybeSingle();

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve('timeout'), timeoutMs)
    );

    const result = (await Promise.race([supabasePromise, timeoutPromise])) as
      | { data: { health_id_number: string } | null; error: any }
      | 'timeout';

    if (result === 'timeout') return 'timeout' as const;
    if ('error' in result && result.error) return 'error' as const;
    if ('data' in result && result.data) return 'exists' as const;
    return 'not_found' as const;
  } catch (error) {
    console.warn('Health ID existence check failed, continuing with local generation:', error);
    return 'error' as const;
  }
}

/**
 * Generate a unique 14-digit Health ID
 * Format: XX-XXXX-XXXX-XXXX
 * First 2 digits: State code
 * Next 4 digits: District code
 * Next 8 digits: Unique number
 */
export async function generateHealthId(
  stateCode: string = '01',
  options?: { skipRemoteCheck?: boolean; maxAttempts?: number; timeoutMs?: number }
): Promise<string> {
  const attempts = options?.maxAttempts ?? DEFAULT_ATTEMPTS;
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const districtCode = randomDigits(4);
  const localCache = new Set<string>();

  for (let attempt = 0; attempt < attempts; attempt++) {
    const uniqueNumber = randomDigits(8);
    const part1 = uniqueNumber.slice(0, 4);
    const part2 = uniqueNumber.slice(4, 8);
    const healthId = `${stateCode}-${districtCode}-${part1}-${part2}`;

    if (localCache.has(healthId)) continue;
    localCache.add(healthId);

    if (options?.skipRemoteCheck) {
      return healthId;
    }

    const existence = await checkHealthIdExists(healthId, timeoutMs);

    if (existence === 'exists') {
      continue;
    }

    // Accept on not_found, timeout, or error to avoid freezing UX
    return healthId;
  }

  throw new Error('Failed to generate unique Health ID after multiple attempts');
}

export async function generateHealthIdsBatch(
  count: number = 100,
  stateCode: string = '01',
  options?: { skipRemoteCheck?: boolean; timeoutMs?: number }
): Promise<string[]> {
  const ids: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < count; i++) {
    const id = await generateHealthId(stateCode, {
      skipRemoteCheck: options?.skipRemoteCheck ?? true,
      timeoutMs: options?.timeoutMs,
      maxAttempts: DEFAULT_ATTEMPTS,
    });

    if (seen.has(id)) {
      // Very unlikely with 8 random digits; retry once then continue
      const retry = await generateHealthId(stateCode, {
        skipRemoteCheck: true,
        maxAttempts: DEFAULT_ATTEMPTS,
        timeoutMs: options?.timeoutMs,
      });
      ids.push(retry);
      seen.add(retry);
    } else {
      ids.push(id);
      seen.add(id);
    }

    // Small pause to avoid identical timestamps in rare environments
    await sleep(2);
  }

  return ids;
}

/**
 * Validate Health ID format
 */
export function isValidHealthId(healthId: string): boolean {
  // Pattern: XX-XXXX-XXXX-XXXX (2-4-4-4 digits)
  const pattern = /^[0-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
  return pattern.test(healthId);
}

/**
 * Normalize Health ID (remove dashes)
 */
export function normalizeHealthId(healthId: string): string {
  return healthId.replace(/-/g, '');
}

/**
 * Format Health ID (add dashes)
 */
export function formatHealthId(rawId: string): string {
  const normalized = normalizeHealthId(rawId);
  
  if (normalized.length !== 14) {
    throw new Error('Health ID must be exactly 14 digits');
  }
  
  return `${normalized.slice(0, 2)}-${normalized.slice(2, 6)}-${normalized.slice(6, 10)}-${normalized.slice(10, 14)}`;
}

/**
 * Generate QR code data for Health ID
 */
export function generateHealthIdQRData(healthId: string, fullName: string, dob: string): string {
  const data = {
    healthId,
    name: fullName,
    dob,
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(data);
}

/**
 * Parse QR code data
 */
export function parseHealthIdQRData(qrData: string): {
  healthId: string;
  name: string;
  dob: string;
  timestamp: string;
  version: string;
} | null {
  try {
    const data = JSON.parse(qrData);
    
    if (!data.healthId || !data.name || !data.dob) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to parse QR code data:', error);
    return null;
  }
}

/**
 * Verify Health ID exists and is active
 */
export async function verifyHealthId(healthId: string): Promise<{
  valid: boolean;
  exists: boolean;
  active: boolean;
  data?: Record<string, unknown>;
  error?: string;
}> {
  if (!isValidHealthId(healthId)) {
    return {
      valid: false,
      exists: false,
      active: false,
      error: 'Invalid Health ID format'
    };
  }
  
  const { data, error } = await supabase
    .from('health_ids')
    .select('*')
    .eq('health_id_number', healthId)
    .single();
  
  if (error) {
    return {
      valid: true,
      exists: false,
      active: false,
      error: 'Health ID not found'
    };
  }
  
  return {
    valid: true,
    exists: true,
    active: data.is_active,
    data: data
  };
}

/**
 * State codes mapping
 */
export const STATE_CODES: Record<string, string> = {
  'Andhra Pradesh': '28',
  'Arunachal Pradesh': '12',
  'Assam': '18',
  'Bihar': '10',
  'Chhattisgarh': '22',
  'Goa': '30',
  'Gujarat': '24',
  'Haryana': '06',
  'Himachal Pradesh': '02',
  'Jharkhand': '20',
  'Karnataka': '29',
  'Kerala': '32',
  'Madhya Pradesh': '23',
  'Maharashtra': '27',
  'Manipur': '14',
  'Meghalaya': '17',
  'Mizoram': '15',
  'Nagaland': '13',
  'Odisha': '21',
  'Punjab': '03',
  'Rajasthan': '08',
  'Sikkim': '11',
  'Tamil Nadu': '33',
  'Telangana': '36',
  'Tripura': '16',
  'Uttar Pradesh': '09',
  'Uttarakhand': '05',
  'West Bengal': '19',
  'Andaman and Nicobar Islands': '35',
  'Chandigarh': '04',
  'Dadra and Nagar Haveli and Daman and Diu': '26',
  'Delhi': '07',
  'Jammu and Kashmir': '01',
  'Ladakh': '37',
  'Lakshadweep': '31',
  'Puducherry': '34'
};

/**
 * Get state code by name
 */
export function getStateCode(stateName: string): string {
  return STATE_CODES[stateName] || '01';
}

/**
 * Get state name by code
 */
export function getStateName(stateCode: string): string {
  const entry = Object.entries(STATE_CODES).find(([_, code]) => code === stateCode);
  return entry ? entry[0] : 'Unknown';
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Validate Aadhaar number format (12 digits)
 */
export function isValidAadhaar(aadhaar: string): boolean {
  const normalized = aadhaar.replace(/\s/g, '');
  return /^[0-9]{12}$/.test(normalized);
}

/**
 * Format Aadhaar number with spaces (XXXX XXXX XXXX)
 */
export function formatAadhaar(aadhaar: string): string {
  const normalized = aadhaar.replace(/\s/g, '');
  
  if (normalized.length !== 12) {
    throw new Error('Aadhaar must be exactly 12 digits');
  }
  
  return `${normalized.slice(0, 4)} ${normalized.slice(4, 8)} ${normalized.slice(8, 12)}`;
}

/**
 * Mask Aadhaar number (show only last 4 digits)
 */
export function maskAadhaar(aadhaar: string): string {
  const normalized = aadhaar.replace(/\s/g, '');
  
  if (normalized.length !== 12) {
    return 'XXXX XXXX XXXX';
  }
  
  return `XXXX XXXX ${normalized.slice(8, 12)}`;
}

/**
 * Blood group validation
 */
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function isValidBloodGroup(bloodGroup: string): boolean {
  return BLOOD_GROUPS.includes(bloodGroup);
}

/**
 * Relationship types for family linking
 */
export const RELATIONSHIP_TYPES = [
  'spouse',
  'child',
  'parent',
  'sibling',
  'grandparent',
  'grandchild',
  'guardian',
  'ward'
];

export function isValidRelationship(relationship: string): boolean {
  return RELATIONSHIP_TYPES.includes(relationship.toLowerCase());
}
