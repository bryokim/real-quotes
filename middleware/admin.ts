/**
 * Checks that authenticated user is admin.
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const userInfo = useUserInfo();

  const client = useSupabaseClient();

  if (!user.value) {
    return navigateTo("/login");
  }

  if (!userInfo.value) {
    const { data: admin } = await useAsyncData("admin", async () => {
      const { data } = await client.from("admins").select().single();
      return data;
    });

    userInfo.value = { id: user.value.id, email: user.value.email };
    userInfo.value.isAdmin = admin.value ? true : false;
  }

  if (!userInfo.value.isAdmin) {
    return navigateTo("/");
  }
});
