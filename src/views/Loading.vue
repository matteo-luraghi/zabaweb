<script setup lang="ts">
import {
  archive,
  dataJson,
  zabarte,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
} from "@/state";
import Home from "../components/Home.vue";
import Spinner from "../components/Spinner.vue";
import { computed } from "vue";

await updateArticleDatabase();
await updateArchiveDatabase();
await updateArtDatabase();

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
  <Spinner v-if="notReady === true" />
  <Home v-else />
</template>
