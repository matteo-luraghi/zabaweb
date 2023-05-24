<template>
  <h1 class="header articoli-title">SALVATI</h1>
  <h3 class="title-font">Articoli</h3>
  <div class="container">
    <Card
      v-if="savedArticles.length != 0"
      v-for="page in savedArticles"
      :id="page.id"
      :title="page.title"
      :subtitle="page.subtitle"
      :plaintext="page.plaintext"
      :date="page.date"
      :tags="page.tags"
      :authors="page.authors"
      :img="page.img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { dataJson } from "@/state";

const savedArticlesId = computed(() => {
  const savedArticlesId = localStorage.getItem("SavedArticles");
  return savedArticlesId ? JSON.parse(savedArticlesId) : [];
});

let savedArticles = computed(() => {
  let savedArticles = [];
  for (let i in savedArticlesId.value) {
    savedArticles.push(
      dataJson[dataJson.length - parseInt(savedArticlesId.value[i])]
    );
  }
  return savedArticles;
});

console.log(savedArticles);
</script>
