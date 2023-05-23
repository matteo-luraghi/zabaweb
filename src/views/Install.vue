<template>
  <button @click="installApp">Download App</button>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let deferredPrompt: BeforeInstallPromptEvent;

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
  try {
    // Show the install prompt
    await deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
  } catch (error) {
    console.error("Error during app installation:", error);
  }
};
</script>
