export interface LoginType {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UpdatePasswordTypeResult {
  success: boolean;
  message: string;
}
