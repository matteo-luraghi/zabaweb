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

const savedArticles = computed(() => {
  let savedArticles = [];
  const savedArticlesStorage = localStorage.getItem("SavedArticles");
  const saveArticlesIdData = savedArticlesStorage
    ? JSON.parse(savedArticlesStorage)
    : [];
  let savedArticlesId: string[] = saveArticlesIdData.value;
  for (let i in savedArticlesId) {
    savedArticles.push(
      dataJson[(dataJson.length - parseInt(savedArticlesId[i])) as keyof object]
    );
  }
  return savedArticles;
});

console.log(savedArticles);
</script>
