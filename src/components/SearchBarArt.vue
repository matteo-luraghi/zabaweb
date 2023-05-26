<script setup lang="ts">
import { artFilters } from "@/state";

let search = "";
function searchFilter() {
  if (search != "") {
    artFilters.title = search;
    artFilters.authors.push(search);
  }
}
</script>

<template>
  <div class="searchbar">
    <input
      v-model="search"
      @keyup.enter="searchFilter"
      :ref="search"
      type="text"
      placeholder="Cerca titolo o autore"
      class="searchbar-input"
    />
    <button @click="searchFilter" class="searchbar-button">
      <i class="fas fa-search searchbar-icon"></i>
    </button>
  </div>
</template>
