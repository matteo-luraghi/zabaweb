<template>
  <h1 class="header articoli-title">SALVATI</h1>
</template>

<script setup lang="ts">
import { computed } from "vue";

let savedArticles = computed(() => {
  const savedArticles = localStorage.getItem("SavedArticles");
  return savedArticles ? JSON.parse(savedArticles) : [];
});
console.log(savedArticles);
</script>
