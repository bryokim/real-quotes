<script setup lang="ts">
const quotes = [
  {
    text: "The early bird catches the worm",
    author: "",
  },
  { text: "Money is the root of all evil", author: "Unknown" },
];
</script>

<template>
  <div class="p-2 h-full">
    <div class="text-2xl flex flex-col items-center">
      <!-- <div>Welcome to <span class="text-sky-50 font-mono">QuoteSync</span></div> -->

      <Quote
        v-for="quote in quotes"
        :quote="quote.text"
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
