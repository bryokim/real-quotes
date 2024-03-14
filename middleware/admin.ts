/**
 * Checks that authenticated user is admin.
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const userInfo = useUserInfo();

  if (!user.value) {
    return navigateTo("/login");
  }

  if (!userInfo.value) {
    const {setUserInfo} = useAuth();
    await setUserInfo();
  }

  if (!userInfo.value?.isAdmin) {
    return navigateTo("/");
  }
});
