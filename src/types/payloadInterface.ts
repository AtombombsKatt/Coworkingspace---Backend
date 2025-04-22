export interface jwtPayload {
  id: string;
  username: string;
  role: 'User' | 'Admin';
  iat?: number;
  exp?: number;
}

