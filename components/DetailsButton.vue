<script setup lang="ts">
const canHover = useHover();
</script>

<template>
  <UPopover
    v-if="canHover"
    mode="hover"
    :popper="{ offsetDistance: 0, placement: 'top' }"
  >
    <UButton
      class="me-3 hover:text-white hover:bg-gray-900 dark:hover:text-gray-900 dark:hover:bg-white"
      :padded="false"
      icon="i-heroicons-information-circle"
      size="md"
      color="primary"
      variant="link"
      :ui="{ rounded: 'rounded-full' }"
    />
    <template #panel>
      <div class="p-0.5 text-xs">
        <span>Details</span>
      </div>
    </template>
  </UPopover>

  <UButton
    v-else
    class="me-3 hover:text-white hover:bg-gray-900 dark:hover:text-gray-900 dark:hover:bg-white"
    :padded="false"
    icon="i-heroicons-information-circle"
    size="md"
    color="primary"
    variant="link"
    :ui="{ rounded: 'rounded-full' }"
  />
</template>
