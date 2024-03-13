<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: "auth",
});

const otpLoading = ref(false);
const oauthLoading = ref(false);

const alertState = reactive({
  show: false,
  message: "",
  success: false,
});

const formState = reactive({
  email: undefined,
});

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.output<typeof schema>;

const signInWithOtp = async (event: FormSubmitEvent<Schema>) => {
  const { signInWithOtp } = useAuth();
  try {
    otpLoading.value = true;
    await signInWithOtp(event);

    alertState.success = true;
    alertState.message = "Magic link was sent to your email";
  } catch (error: any) {
    alertState.success = false;
    alertState.message = error.error_description || error.message;
  } finally {
    alertState.show = true;
    otpLoading.value = false;
  }
};

const signInWithOAuth = async () => {
  const { signInWithOAuth } = useAuth();
  try {
    oauthLoading.value = true;
    await signInWithOAuth();
  } catch (error: any) {
    console.log(error.message || error.error_description);
  } finally {
    oauthLoading.value = false;
  }
};
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

    <UForm
      :schema="schema"
      :state="formState"
      @submit="signInWithOtp"
      class="w-full mb-10"
    >
      <UFormGroup label="Email" name="email" class="mb-8" required>
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          required
        />
      </UFormGroup>

      <UButton
        type="submit"
        :loading="otpLoading"
        :label="otpLoading ? 'Sending link' : 'Send magic link'"
        :disabled="otpLoading"
        block
      >
      </UButton>
    </UForm>

    <UDivider label="OR" />

    <UButton
      class="mt-10"
      :label="oauthLoading ? 'Signing you in' : 'sign in with github'"
      variant="outline"
      icon="i-bi-github"
      :disabled="oauthLoading"
      :loading="oauthLoading"
      block
      @click="signInWithOAuth"
    />
  </div>
</template>
