<template>
  <h1 class="header articoli-title">SALVATI</h1>
  <h3 class="title-font">Articoli</h3>

  <div class="container">
    <Card
      v-if="savedArticles.articles.length != 0"
      v-for="page in savedArticles.articles"
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
import { computed, reactive } from "vue";
import Card from "@/components/Card.vue";

const savedArticlesId = computed(() => {
  const savedArticlesId = localStorage.getItem("SavedArticles");
  return savedArticlesId ? JSON.parse(savedArticlesId) : [];
});
const savedArticles = reactive({
  articles: [] as typeof dataJson,
});

for (let i in savedArticlesId.value) {
  savedArticles.articles.push(
    dataJson[dataJson.length - savedArticlesId.value[i]]
  );
}
</script>
