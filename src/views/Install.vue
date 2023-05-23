<template>
  <button @click="installApp" v-if="showDownloadButton">Download App</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

declare global {
  interface Window {
    // Declare the BeforeInstallPromptEvent interface
    BeforeInstallPromptEvent: Event;
  }
}

const showDownloadButton = ref(false);

onMounted(() => {
  // Check if the Web App Install Prompt API is supported and show the download button
  window.addEventListener("beforeinstallprompt", (event: Event) => {
    event.preventDefault();
    showDownloadButton.value = true;
  });
});

const installApp = () => {
  // Check if the Web App Install Prompt API is available
  if ("BeforeInstallPromptEvent" in window) {
    const installPromptEvent = new Event("beforeinstallprompt");
    window.dispatchEvent(installPromptEvent);
  }
};
</script>
