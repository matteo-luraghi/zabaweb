<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { showPdf } from '../state';

const pdfViewer = ref(null);

onMounted(() => {
  const container = document.getElementById('pdf-viewer');
  const pdfUrl = showPdf.url;

  const viewerUrl = '/path/to/pdf.js/web/viewer.html';
  const viewerIframe = document.createElement('iframe');
  viewerIframe.src = viewerUrl + '?file=' + encodeURIComponent(pdfUrl);
  viewerIframe.width = '100%';
  viewerIframe.height = '1000px';
  viewerIframe.frameBorder = '0';

  container!.appendChild(viewerIframe);
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
