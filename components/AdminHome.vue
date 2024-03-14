<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-end items-center">
        <UIcon name="i-heroicons-envelope" class="me-2" />
        <h2>{{ user?.email }}</h2>
      </div>
    </template>

    <div>
      <p class="mb-3">You are an admin.</p>
      <p>Create, update and delete quotes from here.</p>
    </div>

    <!-- <template #footer>
      <Placeholder class="h-8" />
    </template> -->
  </UCard>
</template>
