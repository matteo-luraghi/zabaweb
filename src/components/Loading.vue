<script setup lang="ts">
import { archive, dataJson, zabarte } from "@/state";
import Home from "@/views/Home.vue";
import Spinner from "./Spinner.vue";
import { computed } from "vue";

export let notReady = computed(() => {
  if (dataJson[0].id === 0 || archive[0].id === 0 || zabarte[0].id === 0)
    return true;
  else return false;
});
</script>

<template>
  <h1 class="header articoli-title">HOME</h1>
  <img
    alt="testata"
    class="testata"
    src="../assets/testata.webp"
    style="max-width: 100%"
  />
  <Spinner :color="'#303030'" duration="20s" v-if="notReady" />
  <Home v-else />
</template>
