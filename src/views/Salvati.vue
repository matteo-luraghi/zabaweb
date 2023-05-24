<template>
  <h1 class="header articoli-title">SALVATI</h1>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { dataJson } from "@/state";

const savedArticlesId = computed(() => {
  const savedArticles = localStorage.getItem("SavedArticles");
  return savedArticles ? JSON.parse(savedArticles) : [];
});

for (let i in savedArticlesId.value) {
  console.log(
    dataJson[
      (dataJson.length - parseInt(savedArticlesId.value[i])) as keyof object
    ]
  );
  console.log(savedArticlesId.value[i]);
}

const savedArticles = computed(() => {
  for (let i in savedArticlesId.value) {
    console.log(dataJson[i as keyof object]);
  }
});
</script>
