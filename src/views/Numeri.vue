<script setup lang="ts">
import { archive, showPdf } from "../state";
import Numero from "./Numero.vue";
//the variable archive stores all the info, then in the template via the v-for method are displayed all of the Numeri of the database
//each one is clickable and will route the user to the Numero view where it will be displayed as a pdf embedding

interface Numero {
  id: number;
  name: string;
  url: string;
  img: string;
}

//when the cover image of one of the Numeri on this view is pressed this function will update
//the global variable showPdf with the url and name of the one to be displayed
function updateShowPdf(element: Numero) {
  showPdf.url = element.url;
  showPdf.name = element.name;
}
</script>

<template>
  <div class="header">
    <h1 class="numeri-title">ARCHIVIO DEI NUMERI</h1>
  </div>
  <div class="container numeri-container">
    <router-link
      to="/numero"
      class="router-link"
      v-for="element in archive"
      @click="updateShowPdf(element)"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img class="numero-cover" :src="element.img" />
    </router-link>
  </div>
</template>

<style>
.numeri-container {
  margin-top: 20px;
}
.numeri-title {
  font-family: "CodeBold";
}
.numero-cover {
  width: 100%;
}
</style>
