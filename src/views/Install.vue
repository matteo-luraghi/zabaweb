<template>
  <div id="app">
    <div v-if="deferredPrompt" class="banner info text-left">
      Get our free app. It won't take up space on your phone and also works
      offline!

      <div class="actions">
        <button @click="dismiss">Dismiss</button>
        <button @click="install">Install</button>
      </div>
    </div>
    <div class="pa-4 text-center">
      <h1>Customize Your Vue.js PWA Installation</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<BeforeInstallPromptEventChoice>;
  prompt(): Promise<void>;
}

interface BeforeInstallPromptEventChoice {
  outcome: "accepted" | "dismissed";
  platform: string;
}

let deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);

window.addEventListener("beforeinstallprompt", (e: Event) => {
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt.value = e as BeforeInstallPromptEvent;
});

window.addEventListener("appinstalled", () => {
  deferredPrompt.value = null;
});

const dismiss = () => {
  deferredPrompt.value = null;
};

const install = () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
  }
};
</script>

<style scoped>
.banner {
  color: white;
  background-color: #2196f3;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.info {
  background-color: #2196f3;
}

.text-left {
  text-align: left;
}

.actions {
  margin-top: 8px;
}

button {
  margin-right: 8px;
}
</style>
