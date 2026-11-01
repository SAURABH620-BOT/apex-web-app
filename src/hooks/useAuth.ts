import { useState, useEffect, useCallback } from 'react';
import type { AuthSession, AuthUser, LoginCredentials } from '../types/auth';
import {
  authenticateEncryptedCredentials,
  clearAuthSession,
  generateAuthToken,
  getActiveAuthSession,
  initEncryptedCredentialsVault,
  saveAuthSession
} from '../helpers/tokenHelper';

export interface UseAuthReturn {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => boolean;
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize encrypted vault in localStorage and verify active session on mount
  useEffect(() => {
    let isMounted = true;

    const setupAuth = async () => {
      try {
        // Initialize encrypted vault in localStorage if not already present
        await initEncryptedCredentialsVault();

        // Check if there is an existing valid session
        const active = getActiveAuthSession();
        if (isMounted) {
          if (active) {
            setSession(active);
          } else {
            setSession(null);
          }
        }
      } catch (err) {
        console.error('Error during auth setup:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const checkAuth = useCallback((): boolean => {
    const active = getActiveAuthSession();
    if (active) {
      setSession(active);
      return true;
    } else {
      setSession(null);
      return false;
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      try {
        // Authenticate against encrypted credentials vault in localStorage
        const authResult = await authenticateEncryptedCredentials(credentials);

        if (!authResult.success || !authResult.user) {
          setIsLoading(false);
          return {
            success: false,
            error: authResult.error || 'Authentication failed. Please verify your credentials.'
          };
        }

        const token = generateAuthToken(authResult.user);
        saveAuthSession(token, authResult.user);

        const activeSession = getActiveAuthSession();
        setSession(activeSession);
        setIsLoading(false);

        return { success: true };
      } catch (err) {
        setIsLoading(false);
        return {
          success: false,
          error: 'An error occurred during authentication. Please try again.'
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    clearAuthSession();
    setSession(null);
  }, []);

  return {
    session,
    user: session ? session.user : null,
    isAuthenticated: !!session,
    isLoading,
    login,
    logout,
    checkAuth
  };
}
