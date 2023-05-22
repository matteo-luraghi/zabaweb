<script setup lang="ts">
import { archive } from "@/state";

const props = defineProps<{
  query: string;
}>();

console.log(props.query);
const numberId = parseInt(props.query.split("#")[0]);

let showPdf = {
  url: "",
  name: "",
};

showPdf.url = archive[archive.length - numberId].url;
showPdf.name = archive[archive.length - numberId].name;
</script>

<template>
  <div class="container">
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <iframe
      :src="showPdf.url"
      frameborder="0"
      width="99.5%"
      height="1700px"
    ></iframe>
  </div>
</template>
