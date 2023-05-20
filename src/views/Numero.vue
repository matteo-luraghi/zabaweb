<script setup lang="ts">
  import { showPdf } from '../state';
  import { onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

onMounted(() => {
  // Optional: Adjust the path to the worker file
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js';
});
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <embed :src="showPdf.url" type="application/pdf" style="width:100%; height:1000px; zoom: calc(100vw / 900)"/>
    <iframe :src="showPdf.url" style="width:100%; height:1000px; zoom: calc(100vw / 900)" frameborder="0"></iframe>
  </div>
</template>