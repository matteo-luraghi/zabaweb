<script setup lang="ts">
  import { onMounted, ref } from 'vue';
import { showPdf } from '../state';
  import pdfjsLib from 'pdfjs-dist';
  onMounted(async () => {
  try {
    const pdfResponse = await fetch(showPdf.url);
    const pdfData = await pdfResponse.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    const canvas = ref<HTMLCanvasElement | null>(null);
    const context = canvas.value?.getContext('2d');

    const firstPage = await pdf.getPage(1);
    const viewport = firstPage.getViewport({ scale: 1 });

    canvas.value!.width = viewport.width;
    canvas.value!.height = viewport.height;

    await firstPage.render({ canvasContext: context!, viewport }).promise;
  } catch (error) {
    console.error('Failed to load the PDF:', error);
  }
})
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>