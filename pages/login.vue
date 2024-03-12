<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: "auth",
});

const supabase = useSupabaseClient();
const loading = ref(false);
const alertState = reactive({
  show: false,
  message: "",
  success: false,
});

const getURL = () => {
  let url =
    process?.env?.NUXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NUXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

const signInWithOtp = async (event: FormSubmitEvent) => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: event.data.email,
      options: {
        emailRedirectTo: getURL(),
      },
    });
    if (error) throw error;
    alertState.success = true;
    alertState.message = "Magic link was sent to your email";
  } catch (error) {
    alertState.success = false;
    alertState.message = error.error_description || error.message;
  } finally {
    alertState.show = true;
    loading.value = false;
  }
};

const state = reactive({
  email: undefined,
});
</script>
<template>
  <div
    class="p-2 h-full flex flex-col items-center justify-center mt-28 w-3/4 md:w-1/2 max-w-md mx-auto relative"
  >
    <div class="absolute w-full -top-20">
      <UAlert
        :close-button="{
          icon: 'i-heroicons-x-mark-20-solid',
          color: 'gray',
          variant: 'link',
          padded: false,
        }"
        :color="alertState.success ? 'emerald' : 'rose'"
        variant="subtle"
        icon="i-heroicons-bell"
        :class="alertState.show ? 'visible' : 'invisible'"
        :title="alertState.message"
        @close="alertState.show = !alertState.show"
      />
    </div>

    <UForm :state="state" @submit="signInWithOtp" class="w-full">
      <UFormGroup label="Email" name="email" class="mb-8" required>
        <UInput
          v-model="state.email"
          type="email"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          required
        />
      </UFormGroup>

      <UButton
        type="submit"
        :loading="loading"
        :label="loading ? 'loading...' : 'Send magic link'"
        block
      >
      </UButton>
    </UForm>
  </div>
</template>
