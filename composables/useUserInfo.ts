
/**
 * Roles assigned to a user/admin
 */
export enum Roles {
  root = "root",
  superuser = "superuser",
  admin = "admin",
  readWrite = "readWrite",
  write = "write",
  read = "read",
}

interface User {
  id?: string;
  email?: string;
  isAdmin?: Boolean;
  username?: string;
  role: Roles;
}

export const useUserInfo = () => {
  return useState<User | null>("user", () => null);
};
