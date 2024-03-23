import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const siteURL = "test-site.com";

const mockAdmin = {
  username: "testAdmin",
  role: Roles.admin,
};

const expectedUserInfoForAdmin = {
  id: "123",
  email: "test@mail.com",
  role: mockAdmin.role,
  username: mockAdmin.username,
  isAdmin: true,
};

const expectedUserInfoNormalUser = {
  id: "123",
  email: "test@mail.com",
  role: Roles.read,
  isAdmin: false,
};

const signInFormMock = {
  data: {
    email: "test@mail.com",
  },
};

const { useSupabaseUserMock, useRuntimeConfigMock } = vi.hoisted(() => {
  return {
    useSupabaseUserMock: vi.fn().mockImplementation(() => {
      return {
        value: {
          id: "123",
          email: "test@mail.com",
        },
      };
    }),
    useRuntimeConfigMock: vi.fn().mockImplementation(() => {
      return {
        public: {
          siteURL,
        },
      };
    }),
  };
});

mockNuxtImport("useRuntimeConfig", () => {
  return useRuntimeConfigMock;
});

mockNuxtImport("useSupabaseUser", () => {
  return useSupabaseUserMock;
});

describe("useAuth Tests", () => {
  afterAll(() => {
    useRuntimeConfigMock.mockRestore();
    useSupabaseUserMock.mockRestore();
    vi.restoreAllMocks();
  });

  test("setUserInfo if user is admin", async () => {
    const userInfo = useUserInfo();
    const { setUserInfo } = useAuth();

    // Used in getAdmin. Returns an admin.
    const fromSpy = vi
      .spyOn(useSupabaseClient(), "from")
      // @ts-expect-error
      .mockImplementation(() => {
        return {
          select: (columns: string) => {
            return {
              eq: (column: string, value: string) => {
                return {
                  single: () => {
                    return {
                      data: mockAdmin,
                    };
                  },
                };
              },
            };
          },
        };
      });

    await setUserInfo();

    expect(fromSpy).toHaveBeenCalledOnce();
    expect(userInfo.value).toBeDefined();
    expect(userInfo.value).toEqual(expectedUserInfoForAdmin);

    fromSpy.mockRestore();
  });

  test("setUserInfo if user not admin", async () => {
    const userInfo = useUserInfo();
    const { setUserInfo } = useAuth();

    // Used in getAdmin. Returns null.
    const fromSpy = vi
      .spyOn(useSupabaseClient(), "from")
      // @ts-expect-error
      .mockImplementation(() => {
        return {
          select: (columns: string) => {
            return {
              eq: (column: string, value: string) => {
                return {
                  single: () => {
                    return {
                      data: null,
                    };
                  },
                };
              },
            };
          },
        };
      });

    await setUserInfo();

    expect(fromSpy).toHaveBeenCalledOnce();
    expect(userInfo.value).toBeDefined();
    expect(userInfo.value).toEqual(expectedUserInfoNormalUser);

    fromSpy.mockRestore();
  });

  test("sigInWithOAuth with no error", async () => {
    const { signInWithOAuth } = useAuth();
    const userInfo = useUserInfo();

    userInfo.value = null; // Reset userInfo.

    const signInWithOAuthSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOAuth")
      // @ts-expect-error
      .mockImplementation(({ provider, options }) => {
        return Promise.resolve("successful sign in");
      });

    await signInWithOAuth();

    expect(userInfo.value).toBeDefined();
    expect(signInWithOAuthSpy).toHaveBeenCalledOnce();
    expect(signInWithOAuthSpy).toHaveBeenCalledWith({
      provider: "github",
      options: {
        redirectTo: `https://${siteURL}/`,
      },
    });

    signInWithOAuthSpy.mockRestore();
  });

  test("sigInWithOAuth with error", async () => {
    const { signInWithOAuth } = useAuth();
    const userInfo = useUserInfo();

    userInfo.value = null; // Reset userInfo.

    const signInWithOAuthSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOAuth")
      // @ts-expect-error
      .mockImplementation(({ provider, options }) => {
        return Promise.resolve({ error: "unsuccessful sign in" });
      });

    expect(async () => await signInWithOAuth()).rejects.toThrowError(
      "unsuccessful sign in"
    );

    expect(userInfo.value).toBeNull();
    expect(signInWithOAuthSpy).toHaveBeenCalledOnce();
    expect(signInWithOAuthSpy).toHaveBeenCalledWith({
      provider: "github",
      options: {
        redirectTo: `https://${siteURL}/`,
      },
    });

    signInWithOAuthSpy.mockRestore();
  });

  test("sigInWithOtp with no error", async () => {
    const { signInWithOtp } = useAuth();
    const userInfo = useUserInfo();

    userInfo.value = null; // Reset userInfo.

    const signInWithOtpSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOtp")
      // @ts-expect-error
      .mockImplementation(({ email, options }) => {
        return Promise.resolve("successful sign in");
      });

    // @ts-expect-error
    await signInWithOtp(signInFormMock);

    expect(userInfo.value).toBeDefined();
    expect(signInWithOtpSpy).toHaveBeenCalledOnce();
    expect(signInWithOtpSpy).toHaveBeenCalledWith({
      email: signInFormMock.data.email,
      options: {
        emailRedirectTo: `https://${siteURL}/`,
      },
    });

    signInWithOtpSpy.mockRestore();
  });

  test("sigInWithOtp with error", async () => {
    const { signInWithOtp } = useAuth();
    const userInfo = useUserInfo();

    userInfo.value = null; // Reset userInfo.

    const signInWithOtpSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOtp")
      // @ts-expect-error
      .mockImplementation(({ email, options }) => {
        return Promise.resolve({ error: "unsuccessful sign in" });
      });

    expect(
      // @ts-expect-error
      async () => await signInWithOtp(signInFormMock)
    ).rejects.toThrowError("unsuccessful sign in");

    expect(userInfo.value).toBeNull();
    expect(signInWithOtpSpy).toHaveBeenCalledOnce();
    expect(signInWithOtpSpy).toHaveBeenCalledWith({
      email: signInFormMock.data.email,
      options: {
        emailRedirectTo: `https://${siteURL}/`,
      },
    });

    signInWithOtpSpy.mockRestore();
  });
  test("sigOut with no error", async () => {
    const { signOut, signInWithOAuth } = useAuth();
    const userInfo = useUserInfo();

    const signOutSpy = vi
      .spyOn(useSupabaseClient().auth, "signOut")
      // @ts-expect-error
      .mockImplementation(() => {
        return Promise.resolve("");
      });

    const signInWithOAuthSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOAuth")
      // @ts-expect-error
      .mockImplementation(({ provider, options }) => {
        userInfo.value = expectedUserInfoNormalUser;
        return Promise.resolve("successful sign in");
      });

    await signInWithOAuth();
    expect(signInWithOAuthSpy).toHaveBeenCalledOnce();
    expect(userInfo.value).toEqual(expectedUserInfoNormalUser);

    await signOut();

    expect(userInfo.value).toBeNull();
    expect(signOutSpy).toHaveBeenCalledOnce();

    signInWithOAuthSpy.mockRestore();
    signOutSpy.mockRestore();
  });

  test("sigOut with error", async () => {
    const { signOut, signInWithOAuth } = useAuth();
    const userInfo = useUserInfo();

    const signOutSpy = vi
      .spyOn(useSupabaseClient().auth, "signOut")
      // @ts-expect-error
      .mockImplementation(() => {
        return Promise.resolve({ error: "unsuccessful sign out" });
      });

    const signInWithOAuthSpy = vi
      .spyOn(useSupabaseClient().auth, "signInWithOAuth")
      // @ts-expect-error
      .mockImplementation(({ provider, options }) => {
        userInfo.value = expectedUserInfoNormalUser;
        return Promise.resolve("successful sign in");
      });

    await signInWithOAuth();
    expect(signInWithOAuthSpy).toHaveBeenCalledOnce();
    expect(userInfo.value).toEqual(expectedUserInfoNormalUser);

    expect(async () => await signOut()).rejects.toThrow(
      "unsuccessful sign out"
    );

    expect(userInfo.value).toEqual(expectedUserInfoNormalUser);
    expect(signOutSpy).toHaveBeenCalledOnce();

    signInWithOAuthSpy.mockRestore();
    signOutSpy.mockRestore();
  });

  test("getURL prefers siteURL if set and adds https:// and / at end", () => {
    const { getURL } = useAuth();
    const config = useRuntimeConfig();

    expect(config.public.siteURL).toEqual(siteURL);

    const url = getURL();

    expect(url).toEqual(`https://${siteURL}/`);
  });

  test("getURL uses NUXT_ENV_VERCEL_URL if siteURL is not set and adds https:// and / at end", () => {
    useRuntimeConfigMock.mockImplementation(() => {
      return {
        public: {
          siteURL: undefined,
        },
      };
    });

    process.env.NUXT_ENV_VERCEL_URL = "nuxt-env-test.com";

    const { getURL } = useAuth();
    const config = useRuntimeConfig();

    expect(config.public.siteURL).toBeUndefined();
    expect(process.env.NUXT_ENV_VERCEL_URL).toBeDefined();

    const url = getURL();

    expect(url).toEqual(`https://nuxt-env-test.com/`);

    process.env.NUXT_ENV_VERCEL_URL = "";
  });

  test("getURL defaults to http://localhost:300/", () => {
    useRuntimeConfigMock.mockImplementation(() => {
      return {
        public: {
          siteURL: undefined,
        },
      };
    });

    const nuxtEnvVercelURL = process.env.NUXT_ENV_VERCEL_URL;
    delete process.env.NUXT_ENV_VERCEL_URL;

    const { getURL } = useAuth();
    const config = useRuntimeConfig();

    expect(config.public.siteURL).toBeUndefined();
    expect(process.env.NUXT_ENV_VERCEL_URL).toBeUndefined();

    const url = getURL();

    expect(url).toEqual(`http://localhost:3000/`);

    process.env.NUXT_ENV_VERCEL_URL = nuxtEnvVercelURL;
  });
});
