interface User {
  id?: string;
  email?: string;
  isAdmin?: Boolean;
  username?: string
}

export const useUserInfo = () => {
  return useState<User | null>("user", () => null);
};
