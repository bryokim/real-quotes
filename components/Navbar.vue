<script setup lang="ts">
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
    class="w-full h-20 mb-3 p-5 text-xl flex items-center justify-between bg-gradient-to-b from-gray-400 to-white dark:from-gray-800 dark:to-gray-900">
    <div class="logo text-3xl antialiased">
      <ULink to="/">RealQuotes</ULink>
    </div>
    <div>
      <ClientOnly>
        <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.logo {
  font-family: "Crymson Pro", "Josefin Sans", sans-serif;
}
</style>
