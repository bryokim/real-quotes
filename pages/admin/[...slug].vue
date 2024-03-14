<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  layout: "no-footer",
});

const user = useUserInfo();

const route = useRoute();
const slug = ref(route.params.slug);
</script>

<template>
  <div class="p-2 h-full grid grid-cols-12 sm:gap-10 mt-8 w-full relative">
    <div class="sm:col-span-1"></div>
    <AdminNav class="col-span-12 mb-10 sm:col-span-3" />
    <div class="col-span-12 sm:col-span-6">
      <CreateQuote
        v-if="slug[0] == 'create'"
        class="flex flex-col items-center justify-center"
      />
      <UpdateQuote v-else-if="slug[0] == 'update'" />
      <DeleteQuote v-else-if="slug[0] == 'delete'" />
      <AdminsView
        v-else-if="slug[0] == 'admins' && user?.role == Roles['root']"
      />
      <AdminHome v-else />
    </div>
  </div>
</template>
