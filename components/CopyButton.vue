<script setup lang="ts">
const props = defineProps<{
  quote: string;
}>();

const toast = useToast();
const copied = ref(false);
const canHover = useHover();

function copySuccess() {
  toast.add({
    id: "copy_quote_success",
    title: "Copied quote",
    icon: "i-heroicons-clipboard-document-check",
  });
  copied.value = true;
  setTimeout(() => (copied.value = false), 5000);
}

function copyFail(error: any) {
  toast.add({
    id: "copy_quote_fail",
    title: "Failed to copy quote",
    description: error.error_description || error.message,
    icon: "i-heroicons-exclamation-circle",
    color: "red",
  });
}

/**
 * Copies quote when copy icon is clicked
 */
async function copyQuote() {
  if (navigator && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(props.quote);
      copied.value = true;
      copySuccess();
    } catch (error: any) {
      copyFail(error);
    }
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    const tempInput = document.createElement("input");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-1000px";
    tempInput.style.top = "-1000px";
    tempInput.value = props.quote;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      copySuccess();
    } catch (error) {
      copyFail(error);
    } finally {
      document.body.removeChild(tempInput);
    }
  } else {
    copyFail({ message: "Cannot copy on your device" });
  }
}
</script>

<template>
  <UPopover
    v-if="canHover"
    mode="hover"
    :popper="{ offsetDistance: 0, placement: 'top' }"
  >
    <UButton
      class="me-1 hover:text-white hover:bg-gray-900 dark:hover:text-gray-900 dark:hover:bg-white"
      :padded="false"
      :icon="
        copied
          ? 'i-heroicons-clipboard-document-check'
          : 'i-heroicons-clipboard-document'
      "
      :disabled="copied"
      size="md"
      color="primary"
      variant="link"
      @click="copyQuote"
    />
    <template #panel>
      <div class="p-0.5 text-xs">
        <span v-if="copied">Copied</span>
        <span v-else>Copy</span>
      </div>
    </template>
  </UPopover>

  <UButton
    v-else
    class="me-1 hover:text-white hover:bg-gray-900 dark:hover:text-gray-900 dark:hover:bg-white"
    :padded="false"
    :icon="
      copied
        ? 'i-heroicons-clipboard-document-check'
        : 'i-heroicons-clipboard-document'
    "
    :disabled="copied"
    size="md"
    color="primary"
    variant="link"
    @click="copyQuote"
  />
</template>
