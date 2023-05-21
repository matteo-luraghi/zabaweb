<script setup lang="ts">
import { showPdf } from "../state";
</script>

<template>
  <div class="container">
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe
      :src="showPdf.url"
      frameborder="0"
      width="99.5%"
      height="1700px"
    ></iframe>
  </div>
</template>
