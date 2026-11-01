import type { AuthSession, AuthUser, LoginCredentials } from '../types/auth';

const TOKEN_KEY = 'apex_portal_auth_token_v1';
export const VAULT_KEY = 'apex_encrypted_credentials_vault_v1';
const SESSION_DURATION_HOURS = 12;

interface TokenPayload {
  userId: string;
  role: 'admin' | 'faculty' | 'student';
  timestamp: number;
  exp: number;
  signature: string;
}

export interface EncryptedVaultData {
  uHash: string;
  pHash: string;
  salt: string;
  facultyUHash: string;
  facultyPHash: string;
  initializedAt: number;
}

/**
 * Safe getters for environment variables with fallbacks
 */
function getAuthSecret(): string {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AUTH_SECRET)
      ? import.meta.env.VITE_AUTH_SECRET
      : 'apex_super_secure_sha256_hash_token_2026';
  } catch {
    return 'apex_super_secure_sha256_hash_token_2026';
  }
}

function getConfiguredUser(): string {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PORTAL_USER)
      ? import.meta.env.VITE_PORTAL_USER.toLowerCase()
      : 'apexadmin';
  } catch {
    return 'apexadmin';
  }
}

function getConfiguredPass(): string {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PORTAL_PASS)
      ? import.meta.env.VITE_PORTAL_PASS
      : 'Apex@2026';
  } catch {
    return 'Apex@2026';
  }
}

/**
 * Simple signature helper to verify secret consistency
 */
function createSignature(payloadPart: string, secret: string): string {
  let hash = 0;
  const combined = `${payloadPart}::${secret}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Deterministic salt derived from secret
 */
function getOrGenerateSalt(): string {
  const secret = getAuthSecret();
  return `apex_salt_${createSignature('vault_salt_v1', secret)}`;
}

/**
 * Fallback multi-round hash for environments where crypto.subtle is unavailable
 */
function fallbackHash(input: string): string {
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 5) + hash2) ^ char;
  }
  return (Math.abs(hash1).toString(16) + Math.abs(hash2).toString(16)).padStart(16, '0');
}

/**
 * Hash string with secret and salt using SHA-256 (Web Crypto API) with fallback
 */
export async function hashWithSaltAndSecret(value: string, salt: string, secret: string): Promise<string> {
  const text = `APEX_VAULT::${value}::${secret}::${salt}`;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return fallbackHash(text);
    }
  }
  return fallbackHash(text);
}

/**
 * Initialize and store encrypted credentials in localStorage
 * Plaintext username and password are NEVER stored in localStorage!
 * Only salted, cryptographically hashed representations are stored.
 */
export async function initEncryptedCredentialsVault(): Promise<EncryptedVaultData> {
  const secret = getAuthSecret();
  const configuredUser = getConfiguredUser();
  const configuredPass = getConfiguredPass();
  const salt = getOrGenerateSalt();

  const [uHash, pHash, facultyUHash, facultyPHash] = await Promise.all([
    hashWithSaltAndSecret(configuredUser, salt, secret),
    hashWithSaltAndSecret(configuredPass, salt, secret),
    hashWithSaltAndSecret('durgeshsir', salt, secret),
    hashWithSaltAndSecret('Apex@durgesh', salt, secret)
  ]);

  const vault: EncryptedVaultData = {
    uHash,
    pHash,
    salt,
    facultyUHash,
    facultyPHash,
    initializedAt: Date.now()
  };

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(VAULT_KEY, JSON.stringify(vault));
    }
  } catch (err) {
    console.error('Failed to store encrypted credentials vault in localStorage:', err);
  }

  return vault;
}

/**
 * Authenticate credentials strictly against the encrypted vault in localStorage
 */
export async function authenticateEncryptedCredentials(
  creds: LoginCredentials
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const secret = getAuthSecret();

  let vault: EncryptedVaultData | null = null;
  try {
    if (typeof localStorage !== 'undefined') {
      const rawVault = localStorage.getItem(VAULT_KEY);
      if (rawVault) {
        vault = JSON.parse(rawVault);
      }
    }
  } catch {
    vault = null;
  }

  // If vault is not yet initialized in localStorage, initialize it now
  if (!vault || !vault.uHash || !vault.pHash || !vault.salt) {
    vault = await initEncryptedCredentialsVault();
  }

  const inputUser = creds.userId.trim().toLowerCase();
  const inputPass = creds.password.trim();

  if (!inputUser || !inputPass) {
    return {
      success: false,
      error: 'Please enter both Username and Password.'
    };
  }

  // Encrypt user input with the vault salt & secret
  const [inputUHash, inputPHash] = await Promise.all([
    hashWithSaltAndSecret(inputUser, vault.salt, secret),
    hashWithSaltAndSecret(inputPass, vault.salt, secret)
  ]);

  // Match against encrypted vault in localStorage
  if (inputUHash === vault.uHash && inputPHash === vault.pHash) {
    return {
      success: true,
      user: {
        userId: creds.userId.trim(),
        name: 'Apex Portal Administrator',
        role: 'admin',
        lastLogin: new Date().toISOString()
      }
    };
  }

  // Secondary faculty check
  if (inputUHash === vault.facultyUHash && inputPHash === vault.facultyPHash) {
    return {
      success: true,
      user: {
        userId: 'durgeshsir',
        name: 'Durgesh Sir (Director/Faculty)',
        role: 'faculty',
        lastLogin: new Date().toISOString()
      }
    };
  }

  return {
    success: false,
    error: 'Invalid Username or Password. Please check your credentials.'
  };
}

/**
 * Backwards compatible synchronous helper
 */
export function authenticateCredentials(
  creds: LoginCredentials
): { success: boolean; user?: AuthUser; error?: string } {
  const configuredUser = getConfiguredUser();
  const configuredPass = getConfiguredPass();

  const trimmedUser = creds.userId.trim().toLowerCase();
  const trimmedPass = creds.password.trim();

  if (trimmedUser === configuredUser && trimmedPass === configuredPass) {
    return {
      success: true,
      user: {
        userId: creds.userId,
        name: 'Apex Portal Administrator',
        role: 'admin',
        lastLogin: new Date().toISOString()
      }
    };
  }

  return {
    success: false,
    error: 'Invalid Username or Password.'
  };
}

/**
 * Generate a secure base64 token with timestamp & signature
 */
export function generateAuthToken(user: AuthUser): string {
  const secret = getAuthSecret();
  const now = Date.now();
  const exp = now + SESSION_DURATION_HOURS * 60 * 60 * 1000;

  const rawPayload = JSON.stringify({
    userId: user.userId,
    name: user.name,
    role: user.role,
    timestamp: now,
    exp
  });

  const payloadEncoded = btoa(unescape(encodeURIComponent(rawPayload)));
  const signature = createSignature(payloadEncoded, secret);

  return `${payloadEncoded}.${signature}`;
}

/**
 * Verify and decode the auth token
 */
export function verifyAuthToken(token: string): { valid: boolean; user?: AuthUser; error?: string } {
  try {
    const [payloadEncoded, signature] = token.split('.');
    if (!payloadEncoded || !signature) {
      return { valid: false, error: 'Malformed token structure.' };
    }

    const secret = getAuthSecret();
    const expectedSig = createSignature(payloadEncoded, secret);
    if (signature !== expectedSig) {
      return { valid: false, error: 'Invalid token signature verification.' };
    }

    const jsonStr = decodeURIComponent(escape(atob(payloadEncoded)));
    const data = JSON.parse(jsonStr) as TokenPayload & { name: string };

    if (Date.now() > data.exp) {
      return { valid: false, error: 'Session has expired. Please log in again.' };
    }

    return {
      valid: true,
      user: {
        userId: data.userId,
        name: data.name,
        role: data.role,
        lastLogin: new Date(data.timestamp).toISOString()
      }
    };
  } catch {
    return { valid: false, error: 'Token decryption failed.' };
  }
}

/**
 * Save auth session to localStorage
 */
export function saveAuthSession(token: string, user: AuthUser): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const session: AuthSession = {
      token,
      user,
      expiresAt: Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save auth session', err);
  }
}

/**
 * Retrieve and validate current active session
 */
export function getActiveAuthSession(): AuthSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const item = localStorage.getItem(TOKEN_KEY);
    if (!item) return null;
    const session: AuthSession = JSON.parse(item);

    const verification = verifyAuthToken(session.token);
    if (!verification.valid) {
      clearAuthSession();
      return null;
    }
    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

/**
 * Clear stored auth session
 */
export function clearAuthSession(): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error('Failed to clear session', err);
  }
}
