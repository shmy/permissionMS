export interface User {
  id: number;
  name: string;
  login: string;
  phone: string;
}

export interface UserState {
  user: User;
}
