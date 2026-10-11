export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  collegeId: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  hosteller: boolean;
  profilePhoto?: string;
  idCardUrl?: string;
  verified: boolean;
  role: UserRole;
  createdAt: string;
  collegeName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
