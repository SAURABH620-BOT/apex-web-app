export interface AuthUser {
  userId: string;
  name: string;
  role: 'admin' | 'faculty' | 'student';
  lastLogin: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  expiresAt: number;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}
