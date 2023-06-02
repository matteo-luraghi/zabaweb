<script setup lang="ts">
import { archive, updateArchiveDatabase } from "../state";
import { ref, computed } from "vue";
//the variable archive stores all the info, then in the template via the v-for method are displayed all of the Numeri of the database
//each one is clickable and will route the user to the Numero view where it will be displayed as a pdf embedding

let visibleNumbersCount = ref(10);

const visibleNumbers = computed(() => {
  return archive.slice(0, visibleNumbersCount.value);
});

function loadMoreNumbers() {
  visibleNumbersCount.value += 10;
}

//function to update and reload the archive database if the images can't be displyed due to notion changing the link
async function updateAndReload() {
  await updateArchiveDatabase();
  window.location.reload();
}
</script>

<template>
  <div class="header">
    <h1 class="numeri-title">ARCHIVIO DEI NUMERI</h1>
  </div>
  <div class="container numeri-container">
    <router-link
      :to="`/numero?q=${element.id}#${element.name}`"
      class="router-link"
      v-for="element in archive"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img
        alt="numero-cover"
        class="numero-cover"
        :src="element.img"
        @error="updateAndReload"
      />
    </router-link>
  </div>
  <div class="container">
    <button
      class="button filter-button"
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
  width: 100%;
  max-height: 550px;
}
</style>
