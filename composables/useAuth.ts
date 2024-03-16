import type { FormSubmitEvent } from "#ui/types";
import process from "process";
import type { User } from "@supabase/supabase-js";

interface Schema {
  email: string;
}

/**
 * Authentication methods.
 */
export const useAuth = () => {
  const userInfo = useUserInfo();
  const config = useRuntimeConfig();
  const supabase = useSupabaseClient();

  const setUserInfo = async () => {
    const user = useSupabaseUser();
    const admin = await getAdmin(user);

    userInfo.value = {
      id: user.value?.id,
      email: user.value?.email,
      role: Roles[admin.value?.role || "read"],
      username: admin.value?.username,
      isAdmin: admin.value ? true : false,
    };
  };

  const getAdmin = async (user: Ref<User | null>) => {
    const { data: admin } = await useAsyncData("admin", async () => {
      const { data } = await supabase
        .from("admins")
        .select("username, role")
        .eq("id", user.value?.id || "")
        .single();
      return data;
    });

    return admin;
  };

  const unsetUserInfo = () => {
    userInfo.value = null;
  };

  const getURL = () => {
    let url =
      config.public.siteURL ?? // Set to site URL in production env.
      process.env?.NUXT_ENV_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";

    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;

    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

    return url;
  };

  const signInWithOtp = async (event: FormSubmitEvent<Schema>) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: event.data.email,
      options: {
        emailRedirectTo: getURL(),
      },
    });
    if (error) throw error;
    else await setUserInfo();
  };

  const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) throw error;
    else await setUserInfo();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    else unsetUserInfo();
  };

  return {
    setUserInfo,
    signInWithOAuth,
    signInWithOtp,
    signOut,
    getURL,
  };
};
