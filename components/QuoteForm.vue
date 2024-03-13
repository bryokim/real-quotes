<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const props = defineProps<{
  title: String;
  quote?: String;
  author?: String;
  description?: String;
  loading?: Boolean;
  action: "Create" | "Update" | "Delete";
}>();

const state = reactive({
  quote: props.quote,
  author: props.author,
  description: props.description,
});

const emits = defineEmits({
  submit: ({ quote, description, author }) => {
    if (quote) {
      return true;
    } else {
      return false;
    }
  },
});

const schema = z.object({
  quote: z.string(),
  author: z.string().optional(),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

function submitForm(event: FormSubmitEvent<Schema>) {
  emits("submit", event.data);
  if (props.action === "Create") {
    state.quote = undefined;
    state.author = undefined;
    state.description = undefined;
  }
}
</script>

<template>
  <div>
    <h1 class="font-bold text-xl mb-5">{{ title }}</h1>
    <UForm :schema="schema" :state="state" @submit="submitForm" class="w-full">
      <UFormGroup label="Quote" name="quote" class="mb-4" required>
        <UTextarea
          autoresize
          :maxrows="4"
          v-model="state.quote"
          type="text"
          required
        />
      </UFormGroup>

      <UFormGroup label="Author" name="author" hint="Optional" class="mb-4">
        <UInput v-model="state.author" type="text" />
      </UFormGroup>
      <UFormGroup
        label="Description"
        name="description"
        hint="Optional"
        class="mb-5"
      >
        <UTextarea
          autoresize
          :maxrows="5"
          v-model="state.description"
          variant="outline"
          placeholder="description"
        />
      </UFormGroup>

      <UButton
        type="submit"
        :label="loading ? 'Loading' : action"
        :loading="loading"
        :disabled="loading"
        :color="loading ? 'teal' : 'primary'"
        :variant="loading ? 'ghost' : 'solid'"
        block
      />
    </UForm>
  </div>
</template>
