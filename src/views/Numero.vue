<script setup lang="ts">
import { showPdf } from "../state";
let showUrl =
  "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
  encodeURIComponent(showPdf.url);
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe
      :src="showUrl"
      frameborder="0"
      width="100%"
      height="1700px"
    ></iframe>
  </div>
</template>
