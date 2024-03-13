import type { FormSubmitEvent } from "#ui/types";
import process from "process";

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

  const setUserInfo = () => {
    const user = useSupabaseUser();
    userInfo.value = { id: user.value?.id, email: user.value?.email };
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
    else setUserInfo();
  };

  const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) throw error;
    else setUserInfo();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    else unsetUserInfo();
  };

  return {
    signInWithOAuth,
    signInWithOtp,
    signOut,
  };
};
