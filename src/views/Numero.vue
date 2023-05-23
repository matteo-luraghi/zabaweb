<script setup lang="ts">
import { archive } from "../state";

const props = defineProps<{
  query: string;
}>();

const numberId = parseInt(props.query.split("#")[0]);

let showPdf = {
  url: "",
  name: "",
};

showPdf.url = archive[archive.length - numberId].url;
showPdf.name = archive[archive.length - numberId].name;

function shareViaWebShare() {
  navigator.share({
    title: showPdf.name,
    text: "",
    url: window.location.pathname + `?q=${numberId}#${showPdf.name}`,
  });
}
</script>

<template>
  <div class="bar-container">
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <button class="share-button" @click="shareViaWebShare">
      <i class="fa-solid fa-share-nodes"></i>
    </button>
  </div>
  <iframe
    :src="showPdf.url"
    frameborder="0"
    width="99.5%"
    height="1700px"
  ></iframe>
</template>
