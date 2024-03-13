/**
 * Checks that authenticated user is admin.
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  if (!user.value) {
    return navigateTo("/login");
  }

  const { data: admin } = await useAsyncData("admin", async () => {
    const { data } = await client.from("admins").select().single();
    return data;
  });

  if (!admin.value) {
    return navigateTo("/");
  }
});
