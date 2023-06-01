<script setup lang="ts">
import Card from "../components/Card.vue";
import { dataJson } from "../state";
//the variable dataJson stores all the info, then in the template via the v-for method are displayed the first 9 articles of the database
</script>

<template>
  <h1 class="header articoli-title">HOME</h1>
  <div class="container">
    <img class="testata" src="../assets/testata.webp" style="max-width: 100%" />
    <Card
      v-for="i in 9"
      :id="dataJson[i - 1].id"
      :title="dataJson[i - 1].title"
      :plaintext="dataJson[i - 1].plaintext"
      :subtitle="dataJson[i - 1].subtitle"
      :date="dataJson[i - 1].date"
      :tags="dataJson[i - 1].tags"
      :authors="dataJson[i - 1].authors"
      :img="dataJson[i - 1].img"
    />
  </div>
</template>

<style>
.testata {
  width: 100%;
  margin-bottom: 10px;
}
</style>
