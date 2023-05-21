<script setup lang="ts">
import { showPdf } from "../state";
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe
      :src="
        'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
        encodeURIComponent(showPdf.url)
      "
      frameborder="0"
      id="myiframe"
      style="height: 100%; width: 100%"
    ></iframe>
  </div>
</template>
