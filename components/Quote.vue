<script setup lang="ts">
const props = defineProps({
  quote: String,
  author: String,
});
</script>

<template>
  <div
    class="group/quote text-lg m-4 max-w-5xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-md hover:shadow-gray-700 rounded-lg"
  >
    <div
      class="ring-1 ring-black dark:ring-slate-500 dark:group-hover/quote:ring-slate-50 rounded-lg p-3 flex flex-col relative"
    >
      <p class="place-self-start quote-text antialiased">
        {{ quote }}
      </p>
      <div
        v-if="author"
        class="place-self-end me-4 italic author flex flex-row items-center antialiased"
      >
        <UIcon name="i-fluent-line-horizontal-1-16-regular" class="p-0" />
        {{ author }}
      </div>

      <div
        class="group/actions invisible group-hover/quote:visible absolute -top-4 right-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg flex flex-row"
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
        <UButton
          class="me-1 hover:text-white hover:bg-gray-900 dark:hover:text-gray-900 dark:hover:bg-white"
          :padded="false"
          icon="i-heroicons-clipboard-document"
          size="md"
          color="primary"
          variant="link"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.quote-text {
  font-family: "Josefin Sans", sans-serif, system-ui;
}

.author {
  font-family: Lato, "Josefin Sans", sans-serif, system-ui;
}
</style>
