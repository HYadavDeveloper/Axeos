export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  timestamp: Date;
  token_type: string;
}
