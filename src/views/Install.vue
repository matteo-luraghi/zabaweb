<template>
  <button @click="installApp" v-if="showDownloadButton">Download App</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showDownloadButton = ref(false);
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

onMounted(() => {
  // Check if the Web App Install Prompt API is supported and show the download button
  window.addEventListener("beforeinstallprompt", (event: Event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    showDownloadButton.value = true;
  });
});

const installApp = async () => {
  // Check if the Web App Install Prompt API is available and deferredPrompt is set
  if (deferredPrompt) {
    try {
      // Hide the app-provided install promotion
      hideInstallPromotion();
      // Show the install prompt
      await deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null;
    } catch (error) {
      console.error("Error during app installation:", error);
    }
  }
};

function hideInstallPromotion() {
  // Implement your logic to hide the install promotion UI
  // For example, you can toggle a CSS class or manipulate the DOM
  // based on your specific UI implementation
}
</script>
