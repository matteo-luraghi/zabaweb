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
import { dataJson } from "@/state";
import { computed } from "vue";

const savedArticlesId = computed(() => {
  const savedArticles = localStorage.getItem("SavedArticles");
  return savedArticles ? JSON.parse(savedArticles) : [];
});

let savedArticles: {
  id: number;
  title: string;
  text: {};
  plaintext: string;
  subtitle: string;
  date: string;
  tags: string[];
  authors: string[];
  img: string;
}[] = [];

for (let i in savedArticlesId.value) {
  savedArticles.push(dataJson[dataJson.length - savedArticlesId.value[i]]);
}
</script>
