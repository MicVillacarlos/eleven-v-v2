export interface LoginType {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UpdatePasswordType {
  success: boolean;
  message: string;
}
