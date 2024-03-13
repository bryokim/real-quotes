<script setup lang="ts">
const quotes = useQuotes();

const { getQuotes } = useQuotesClient();

onBeforeMount(() => {
  getQuotes();
});
</script>

<template>
  <div class="p-2 h-full">
    <div class="text-2xl flex flex-col items-center">
      <!-- <div>Welcome to <span class="text-sky-50 font-mono">QuoteSync</span></div> -->

      <QuoteSkeleton v-if="!quotes" />

      <Quote
        v-else
        v-for="quote in quotes"
        :quote="quote.quote"
        :author="quote.author"
      />
    </div>
  </div>
</template>

<style>
.font {
  font-family: "Roboto", "Josefin Sans";
}
</style>
