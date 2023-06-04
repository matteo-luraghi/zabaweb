<script setup lang="ts">
import {
  archive,
  dataJson,
  zabarte,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
} from "@/state";
import Home from "./Home.vue";
import Spinner from "./Spinner.vue";
import { computed } from "vue";

console.log(dataJson[0].id);
await updateArticleDatabase();
console.log(dataJson[0].id);
console.log(archive[0].id);
await updateArchiveDatabase();
console.log(archive[0].id);
console.log(zabarte[0].id);
await updateArtDatabase();
console.log(zabarte[0].id);

let notReady = computed(() => {
  if (dataJson[0].id === -1 || archive[0].id === -1 || zabarte[0].id === -1) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <h1 class="header articoli-title">HOME</h1>
  <img
    alt="testata"
    class="testata"
    src="../assets/testata.webp"
    style="max-width: 100%"
  />
  <Spinner v-if="notReady" />
  <Home v-else />
</template>
