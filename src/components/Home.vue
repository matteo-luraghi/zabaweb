<script setup lang="ts">
import Card from "./Card.vue";
import { dataJson, archive, zabarte } from "../state";
//the variable dataJson stores all the info, then in the template via the v-for method are displayed the first 9 articles of the database
</script>

<template>
  <h3 class="text-font home-title">Ultimo articolo</h3>
  <div class="container">
    <Card
      :id="dataJson[0].id"
      :title="dataJson[0].title"
      :plaintext="dataJson[0].plaintext"
      :subtitle="dataJson[0].subtitle"
      :date="dataJson[0].date"
      :tags="dataJson[0].tags"
      :authors="dataJson[0].authors"
      :img="dataJson[0].img"
    />
  </div>

  <h3 class="text-font home-title">Ultimo numero</h3>
  <div class="container">
    <router-link
      :to="`/numero?q=${archive[0].id}#${archive[0].name}`"
      class="router-link"
    >
      <h3 class="text-font">{{ archive[0].name }}</h3>
      <img alt="numero-cover" class="numero-cover" :src="archive[0].img" />
    </router-link>
  </div>

  <h3 class="text-font home-title">Ultima uscita di Zabarte</h3>
  <div class="container">
    <router-link
      :to="`/zabarte/view?q=${zabarte[0].id}#${zabarte[0].title}`"
      class="router-link"
    >
      <img :src="zabarte[0].img" alt="Zabarte Image" class="responsive-image" />
    </router-link>
  </div>
</template>

<style>
.testata {
  width: 100%;
  margin-bottom: 10px;
}

.home-title {
  font-size: 22px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
