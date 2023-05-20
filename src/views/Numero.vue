<script setup lang="ts">
import { onMounted } from 'vue';
import { showPdf } from '../state';
import pdfjsLib from 'pdfjs-dist';

onMounted(() => {
  const container = document.getElementById('pdf-viewer');
  const pdfUrl = showPdf.url;

  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      pdf.getPage(pageNum).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Failed to create 2D rendering context.');
        }

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        page.render(renderContext).promise.then(() => {
          container!.appendChild(canvas);
        });
      });
    }
  });
});
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <div id="pdf-viewer"></div>
  </div>
</template>

<style>
#pdf-viewer {
  width: 100%;
  height: 1000px;
  zoom: calc(100vw / 900);
}
</style>
