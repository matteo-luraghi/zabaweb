<script setup lang="ts">
  import { showPdf } from '../state';
  //this view simply displays the pdf based on the global variable showPdf
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe :src="showPdf.url" type="application/pdf" style="width:100%; height:1000px; zoom: calc(100vw / 900)" frameborder="0"></iframe>
  </div>
</template>