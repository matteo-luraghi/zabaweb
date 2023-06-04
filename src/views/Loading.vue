<script setup lang="ts">
import {
  archive,
  dataJson,
  zabarte,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
  notReady,
} from "@/state";
import Home from "../components/Home.vue";
import Spinner from "../components/Spinner.vue";

//if the variables are not updated by the api the app will call the api
if (dataJson[0].id === -1) {
  await updateArticleDatabase();
}

if (archive[0].id === -1) {
  await updateArchiveDatabase();
}

if (zabarte[0].id === -1) {
  await updateArtDatabase();
}

if (dataJson[0].id != -1 && archive[0].id != -1 && zabarte[0].id != -1) {
  notReady.value = false;
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
  <div class="container" v-if="notReady.value">
    <Spinner />
  </div>
  <Home v-else />
</template>
