<script setup lang="ts">
import LinkWithIcon from "./LinkWithIcon.vue";
</script>

<template>
  <div
    class="sticky top-[100vh] mt-7 h-auto min-h-20 bg-gray-900 dark:bg-slate-400 text-white dark:text-black text-lg"
  >
    <div class="h-full grid grid-cols-2 md:grid-cols-3 mx-4 py-3">
      <div class="col-span-1 flex flex-row items-start justify-start">
        <UIcon name="i-heroicons-face-smile" class="me-2 place-self-center" />
        <p class="place-self-center">RealQuotes</p>
      </div>

      <div class="hidden md:block md:col-span-1">
        <!-- Something here -->
      </div>

      <div
        class="col-span-1 ms-10 md:ms-0 flex flex-col items-start justify-end"
      >
        <h1 class="text-sm">Links</h1>
        <div class="ms-2">
          <LinkWithIcon
            class="me-2"
            to="/admin"
            label="Admin"
            icon-name="i-fluent-person-key-20-regular"
            active-class="text-primary dark:text-blue-700"
            link-class="hover:text-blue-600 hover:underline"
          />
        </div>
      </div>
    </div>
  </div>
</template>
