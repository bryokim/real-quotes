<script setup lang="ts">
defineProps<{
  to: String;
  label: String;
  iconName?: String;
  iconClass?: String;
  linkClass?: String;
  activeClass?: String;
  inactiveClass?: String;
}>();
</script>

<template>
  <div class="flex items-center justify-start">
    <UIcon
      v-if="iconName"
      :name="iconName"
      :class="(iconClass, 'me-2 text-sm')"
    />
    <ULink :to="to" :active-class="activeClass" :class="linkClass">{{
      label
    }}</ULink>
  </div>
</template>
