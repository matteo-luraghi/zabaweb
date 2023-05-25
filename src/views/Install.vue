<template>
  <h1 class="header">DOWNLOAD</h1>
  <div v-if="browser === 'safari' || select.system === 'IOS'" class="container">
    <img src="../assets/download/safari1.webp" />
    <img src="../assets/download/safari2.webp" />
    <img src="../assets/download/safari3.webp" />
  </div>
  <div v-else class="container">
    <img src="../assets/download/chrome1" />
    <img src="../assets/download/chrome2" />
    <img src="../assets/download/chrome3" />
    <img src="../assets/download/chrome4" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
let browser: string;
const userAgent = navigator.userAgent;
if (userAgent.indexOf("Safari") > -1) {
  browser = "safari";
} else {
  browser = "unknown";
}
let select = reactive({
  system: "",
});
</script>
