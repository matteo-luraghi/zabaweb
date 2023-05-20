<script setup lang="ts">
  import { showPdf } from '../state';
  import { ref, onMounted } from 'vue';
  const pdfSrc = ref('');

onMounted(async () => {
  try {
    const response = await fetch(showPdf.url);
    const pdfData = await response.blob();
    const dataUrl = URL.createObjectURL(pdfData);
    pdfSrc.value = dataUrl;
  } catch (error) {
    console.error('Failed to load the PDF:', error);
  }
});
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe :src="pdfSrc" style="width:100%; height:1000px;"></iframe>
  </div>
</template>