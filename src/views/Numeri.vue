<script setup lang="ts">
import {
  archive,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
  notReadyArchive,
  notReadyArt,
  notReadyArticles,
  errorImage,
} from "../state";
import { ref, computed } from "vue";
//the variable archive stores all the info, then in the template via the v-for method are displayed all of the Numeri of the database
//each one is clickable and will route the user to the Numero view where it will be displayed as a pdf embedding

if (notReadyArticles.value) {
  await updateArticleDatabase();
  notReadyArticles.value = false;
}

if (notReadyArchive.value) {
  await updateArchiveDatabase();
  notReadyArchive.value = false;
}

if (notReadyArt.value) {
  await updateArtDatabase();
  notReadyArt.value = false;
}

let visibleNumbersCount = ref(10);

const visibleNumbers = computed(() => {
  return archive.slice(0, visibleNumbersCount.value);
});

function loadMoreNumbers() {
  visibleNumbersCount.value += 10;
}
</script>

<template>
  <div class="header">
    <h1 class="numeri-title">ARCHIVIO NUMERI</h1>
  </div>
  <div class="container numeri-container">
    <router-link
      :to="`/numero?q=${element.id}#${element.name}`"
      class="router-link"
      v-for="element in visibleNumbers"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img
        alt="numero-cover"
        class="numero-cover"
        :src="element.img"
        @error="errorImage('archive')"
      />
    </router-link>
  </div>
  <div class="container" style="width: 100%">
    <button
      class="button filter-button"
      style="
         {
          max-width: 140px;
          max-height: 60px;
        }
      "
      v-if="visibleNumbersCount < archive.length"
      @click="loadMoreNumbers"
    >
      Carica Altri
    </button>
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
  max-width: 300px;
  max-height: 550px;
}
</style>
