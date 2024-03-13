<script setup lang="ts">
const user = useSupabaseUser();
const signedIn = ref(user.value ? true : false);

const signOut = async () => {
  try {
    const { signOut } = useAuth();

    signOut();
    signedIn.value = false;
    return navigateTo("/");
  } catch (error: any) {
    console.log(error);
  }
};

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div
    class="w-full h-20 mb-3 p-5 text-xl flex items-center justify-between bg-gradient-to-b from-gray-400 to-white dark:from-gray-800 dark:to-gray-900"
  >
    <div class="logo text-3xl antialiased">
      <ULink to="/">RealQuotes</ULink>
    </div>
    <div class="flex justify-end">
      <UButton
        v-if="signedIn"
        class="mx-2 md:mx-3"
        icon="i-heroicons-arrow-right-end-on-rectangle-16-solid"
        size="sm"
        color="red"
        variant="ghost"
        label="sign out"
        :trailing="true"
        @click="signOut"
      >
      </UButton>
      <div>
        <ClientOnly>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style>
.logo {
  font-family: "Crymson Pro", "Josefin Sans", sans-serif;
}
</style>
