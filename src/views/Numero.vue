<script setup lang="ts">
  import { showPdf } from '../state';
  import VuePdfEmbed from 'vue-pdf-embed'
  import axios from 'axios';
  //this view simply displays the pdf based on the global variable showPdf
  let b64Pdf:string
  async function convertToBase64(): Promise<void> {
  try {
    const pdfUrl = showPdf.url;

    const response = await axios.get(pdfUrl, {
      responseType: 'blob',
    });

    const file = new File([response.data], 'pdf.pdf');
    const base64Data = await readFileAsBase64(file);
    b64Pdf = base64Data
  } catch (error) {
    console.error('Error:', error);
  }
}
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read file as BASE64.'));
      }
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });}
</script>

<template>
  <div>
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <VuePdfEmbed :source="{cMapUrl: 'https://unpkg.com/pdfjs-dist/cmaps/',url: b64Pdf}"
    image-resources-path="https://unpkg.com/pdfjs-dist/web/images/"/>
    <!--<iframe :src="showPdf.url" style="width:100%; height:1000px; zoom: calc(100vw / 900)" frameborder="0"></iframe>-->
  </div>
</template>