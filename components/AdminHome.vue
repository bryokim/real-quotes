<script setup lang="ts">
const user = useSupabaseUser();
const userInfo = useUserInfo();

const roleIcons ={
  root: 'i-fluent-crown-24-filled',
  superuser: 'i-fluent-person-star-48-filled',
  admin:'i-fluent-person-passkey-48-filled',
  readWrite:'i-fluent-person-available-24-filled',
  write:'i-fluent-person-edit-48-filled',
  read:'i-fluent-person-note-24-filled'
}

</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div v-if="userInfo?.username" class="flex items-center">
          <UIcon name="i-heroicons-user-circle" class="me-2" />
          <h2>{{ userInfo?.username }}</h2>
        </div>
        <div v-if="userInfo?.role" class="flex items-center">
          <UIcon :name="roleIcons[userInfo?.role]" class="me-2" />
          <h2>{{ userInfo?.role }}</h2>
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
