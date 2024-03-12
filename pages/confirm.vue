<script setup lang="ts">
const user = useSupabaseUser();

const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;

watch(
  user,
  () => {
    if (user.value) {
      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null;
      // Redirect to path
      return navigateTo(redirectPath || "/");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="p-4 h-full text-xl text-center font-medium message">
    Waiting for login...
  </div>
</template>

<style>
.message {
  font-family: "Josefin Sans", sans-serif, system-ui;
}
</style>
