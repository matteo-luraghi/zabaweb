<script setup lang="ts">
  import { showPdf } from '../state';
  import VuePdfEmbed from 'vue-pdf-embed'
  //this view simply displays the pdf based on the global variable showPdf
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <VuePdfEmbed :source="{cMapUrl: 'https://unpkg.com/pdfjs-dist/cmaps/',url: showPdf.url}"
    image-resources-path="https://unpkg.com/pdfjs-dist/web/images/"/>
    <!--<iframe :src="showPdf.url" style="width:100%; height:1000px; zoom: calc(100vw / 900)" frameborder="0"></iframe>-->
  </div>
</template>