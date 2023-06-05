<script setup lang="ts">
import {
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
  notReadyArchive,
  notReadyArt,
  notReadyArticles,
} from "@/state";
import Home from "../components/Home.vue";

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
</script>

<template>
  <h1 class="header articoli-title">HOME</h1>
  <img
    alt="testata"
    class="testata"
    src="../assets/testata.webp"
    style="max-width: 100%"
  />
  <Home />
</template>
