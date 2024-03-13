<script setup lang="ts">
import CreateQuote from "~/components/CreateQuote.vue";

definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div
    class="p-2 h-full flex flex-col items-center justify-center mt-8 w-10/12 md:w-1/2 max-w-md mx-auto relative"
  >
    <CreateQuote class="w-full flex flex-col items-center justify-center" />
  </div>
</template>
