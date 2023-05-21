<template>
  <v-banner v-if="deferredPrompt" color="info" dark class="text-left">
    Get our free app. It won't take up space on your phone and also works
    offline!

    <template v-slot:actions>
      <v-btn @click="dismiss">Dismiss</v-btn>
      <v-btn @click="install">Install</v-btn>
    </template>
  </v-banner>
  <div class="pa-4 text-center">
    <h1>Customize Your Vue.js PWA Installation</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let deferredPrompt = ref<Event | null>(null);

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
  });
});

const dismiss = () => {
  deferredPrompt.value = null;
};

const install = () => {
  if (deferredPrompt.value) {
    (deferredPrompt.value as any).prompt();
  }
};
</script>
