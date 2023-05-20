<script setup lang="ts">
  import { showPdf } from '../state';
  import VuePdfEmbed from 'vue-pdf-embed'
  import pdf2base64 from 'pdf-to-base64'
  let pdfSourceBase64:string
  pdf2base64(showPdf.url).then(
      (response:string) => {
            pdfSourceBase64 = response
        }
    )
    .catch(
      (error:string) => {
            console.log(error); 
        }
    )
  //this view simply displays the pdf based on the global variable showPdf
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <VuePdfEmbed :source="pdfSourceBase64"
    image-resources-path="https://unpkg.com/pdfjs-dist/web/images/"
    :disable-annotation-layer="true"
    :disable-text-layer="true"/>
    <!--<iframe :src="showPdf.url" style="width:100%; height:1000px; zoom: calc(100vw / 900)" frameborder="0"></iframe>-->
  </div>
</template>