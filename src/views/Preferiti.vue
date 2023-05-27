<script setup lang="ts">
import { archive, dataJson, zabarte } from "@/state";
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
  let found = dataJson.find((obj) => {
    return obj.id === parseInt(savedArticlesId.value[i]);
  });
  if (found) {
    savedArticles.articles.push(found);
  }
}

const savedNumbersId = computed(() => {
  const savedNumbersId = localStorage.getItem("SavedNumbers");
  return savedNumbersId ? JSON.parse(savedNumbersId) : [];
});
const savedNumbers = reactive({
  numbers: [] as typeof archive,
});

for (let i in savedNumbersId.value) {
  let found = archive.find((obj) => {
    return obj.id === parseInt(savedNumbersId.value[i]);
  });
  if (found) {
    savedNumbers.numbers.push(found);
  }
}

const savedZabArteId = computed(() => {
  const savedZabArteId = localStorage.getItem("SavedZabArte");
  return savedZabArteId ? JSON.parse(savedZabArteId) : [];
});
const savedZabArte = reactive({
  art: [] as typeof zabarte,
});

for (let i in savedZabArteId.value) {
  let found = zabarte.find((obj) => {
    return obj.id === parseInt(savedZabArteId.value[i]);
  });
  if (found) {
    savedZabArte.art.push(found);
  }
}
</script>

<template>
  <h1 class="header articoli-title">PREFERITI</h1>
  <h3 class="text-font preferiti-text" style="font-size: 18px">Articoli</h3>

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

  <h3 class="text-font preferiti-text" style="font-size: 18px">Numeri</h3>

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

  <h3 class="text-font preferiti-text" style="font-size: 18px">ZabArte</h3>

  <div class="container">
    <router-link
      :to="`/zabarte/view?q=${art.id}#${art.title}`"
      class="router-link"
      v-for="art in savedZabArte.art"
    >
      <h3 class="text-font">{{ art.title }}</h3>
      <div class="container">
        <h3 class="text-font" v-for="author in art.authors">{{ author }}</h3>
        <h3 class="text-font" v-for="tag in art.tags">{{ tag }}</h3>
      </div>

      <img :src="art.img" class="responsive-image" />
    </router-link>
  </div>
</template>

<style>
.preferiti-text {
  font-size: 22px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
