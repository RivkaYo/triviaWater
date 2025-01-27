export interface User {
  id: string;
  username: string;
  password: string;
}

export type NewUser = Omit<User, "id">;
