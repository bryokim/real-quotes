<script setup lang="ts">
import QuoteForm from "./QuoteForm.vue";

const supabase = useSupabaseClient();
const loading = ref(false);
const toast = useToast();

interface FormData {
  quote: String;
  author?: String;
  description?: String;
}

/**
 * Creates a new quote in the supabase quotes table.
 * User has to be admin.
 */
const createQuote = async (data: FormData) => {
  try {
    loading.value = true;
    if (data.quote) {
      const { error } = await supabase.from("quotes").insert({
        quote: data.quote,
        author: data.author || "",
        description: data.description || "",
      });
      if (error) throw error;
    }
    toast.add({
      id: "created_quote_success",
      title: "Created quote",
      icon: "i-bi-check2-circle",
    });
  } catch (error: any) {
    console.log(error.error_description || error.message);
    toast.add({
      id: "created_quote_fail",
      title: "Failed to create quote",
      description: error.error_description || error.message,
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <QuoteForm
    title="Create new quote"
    action="Create"
    :loading="loading"
    @submit="createQuote"
  />
</template>
