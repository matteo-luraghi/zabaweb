<template>
  <h1 class="header articoli-title">PREFERITI</h1>
  <h3 class="text-font" style="font-size: 18px">Articoli</h3>

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

  <h3 class="text-font" style="font-size: 18px">Numeri</h3>

  <div class="container numeri-container">
    <router-link
      :to="`/numero?q=${element.id}#${element.name}`"
      class="router-link"
      v-for="element in savedNumbers.numbers"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img class="numero-cover" :src="element.img" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { archive, dataJson } from "@/state";
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

const savedNumbersId = computed(() => {
  const savedNumbersId = localStorage.getItem("SavedNumbers");
  return savedNumbersId ? JSON.parse(savedNumbersId) : [];
});
const savedNumbers = reactive({
  numbers: [] as typeof archive,
});

for (let i in savedNumbersId.value) {
  savedNumbers.numbers.push(archive[archive.length - savedNumbersId.value[i]]);
}
</script>
