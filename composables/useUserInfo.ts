interface User {
  id?: String;
  email?: String;
  isAdmin?: Boolean;
}

export const useUserInfo = () => {
  return useState<User | null>("user", () => null);
};
