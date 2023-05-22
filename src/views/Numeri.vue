<script setup lang="ts">
import { archive } from "../state";
//the variable archive stores all the info, then in the template via the v-for method are displayed all of the Numeri of the database
//each one is clickable and will route the user to the Numero view where it will be displayed as a pdf embedding
</script>

<template>
  <div class="header">
    <h1 class="numeri-title">ARCHIVIO DEI NUMERI</h1>
  </div>
  <div class="container numeri-container">
    <router-link
      :to="`/numero?qq=${element.id}#${element.name}`"
      class="router-link"
      v-for="element in archive"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img class="numero-cover" :src="element.img" />
    </router-link>
  </div>
</template>

<style>
.numeri-container {
  margin-top: 20px;
}
.numeri-title {
  font-family: "CodeBold";
}
.numero-cover {
  width: 100%;
}
</style>
