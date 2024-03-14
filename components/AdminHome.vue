<script setup lang="ts">
const user = useSupabaseUser();
const userInfo = useUserInfo();
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div v-if="userInfo?.username" class="flex items-center">
          <UIcon name="i-heroicons-user-circle" class="me-2" />
          <h2>{{ userInfo?.username }}</h2>
        </div>
        <div class="flex items-center">
          <UIcon name="i-heroicons-envelope" class="me-2" />
          <h2>{{ user?.email }}</h2>
        </div>
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
