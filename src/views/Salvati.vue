<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { dataJson } from "@/state";

const savedArticlesId = computed(() => {
  const savedArticlesId = localStorage.getItem("SavedArticles");
  return savedArticlesId ? JSON.parse(savedArticlesId) : [];
});

const savedArticlesData = computed(() => {
  return savedArticlesId.value.map((articleId: number) => {
    // Specify the type of 'articleId'
    const index = dataJson.length - parseInt(articleId.toString()); // Convert 'articleId' to string before parsing
    return dataJson[index];
  });
});

const savedArticles = reactive({
  articles: savedArticlesData.value,
});

watch(savedArticlesData, (newArticles) => {
  savedArticles.articles = newArticles;
});
</script>

<template>
  <h1 class="header articoli-title">SALVATI</h1>
  <h3 class="title-font">Articoli</h3>
  <div class="container">
    <Card
      v-for="article in savedArticles.articles"
      :key="article.id"
      :id="article.id"
      :title="article.title"
      :subtitle="article.subtitle"
      :plaintext="article.plaintext"
      :date="article.date"
      :tags="article.tags"
      :authors="article.authors"
      :img="article.img"
    />
  </div>
</template>
