<template>
  <button @click="installApp" v-if="deferredPrompt">Download App</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

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
  });
});

const installApp = async () => {
  if (deferredPrompt) {
    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error("Error during app installation:", error);
    } finally {
      // Reset the deferredPrompt
      deferredPrompt = null;
    }
  }
};
</script>
