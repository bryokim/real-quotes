/**
 * Checks that authenticated user is admin.
 */

import { Roles } from "~/composables/useUserInfo";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const userInfo = useUserInfo();

  const client = useSupabaseClient();

  if (!user.value) {
    return navigateTo("/login");
  }

  if (!userInfo.value) {
    const { data: admin } = await useAsyncData("admin", async () => {
      const { data } = await client
        .from("admins")
        .select("username, role")
        .eq("id", user.value?.id || '')
        .single();
      return data;
    });

    userInfo.value = {
      id: user.value.id,
      email: user.value.email,
      username: admin.value?.username,
      role: Roles[admin.value?.role || "read"],
    };
    userInfo.value.isAdmin = admin.value ? true : false;
  }

  if (!userInfo.value?.isAdmin) {
    return navigateTo("/");
  }
});
