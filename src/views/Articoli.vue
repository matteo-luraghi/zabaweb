<script setup lang="ts">
import Card from "../components/Card.vue";
import FilterPopup from "../components/FilterPopup.vue";
import SearchBar from "../components/SearchBar.vue";
import { filters, filtered, showFilters } from "../state";

//when a filter is pressed it calls this function
//that removes it from the global variable filters
function removeFilter(filterData: string) {
  let index = filters.authors.indexOf(filterData);
  if (index > -1) {
    filters.authors.splice(index, 1);
  } else {
    index = filters.tags.indexOf(filterData);
    if (index > -1) {
      filters.tags.splice(index, 1);
    } else {
      if (filters.date == filterData) {
        filters.date = "";
      }
    }
  }
}

function checkEmpty() {
  return filtered.value.length != 0;
}
</script>

<template>
  <h1 class="header articoli-title">ARTICOLI</h1>

  <div class="articoli-title-container">
    <p class="articoli-title-text text-font">
      Qui troverete tutti gli articoli pubblicati su Zabaweb!
    </p>
    <div>
      <div class="articoli-searchbar-button">
        <SearchBar class="articoli-searchbar" />
        <button
          v-if="!showFilters.showFilters"
          @click="showFilters.showFilters = !showFilters.showFilters"
          class="articoli-title-filter-button text-font"
        >
          Aggiungi Filtri
        </button>
      </div>
      <FilterPopup v-if="showFilters.showFilters" />
    </div>
  </div>

  <div class="filters-container" v-if="filters.authors.length != 1">
    <button
      class="button filter-button"
      v-for="filter in filters.authors.slice(1)"
      @click="removeFilter(filter)"
    >
      {{ filter }}
      <i class="fas fa-times"></i>
    </button>
  </div>

  <div class="filters-container" v-if="filters.tags.length != 1">
    <button
      class="button filter-button"
      v-for="filter in filters.tags.slice(1)"
      @click="removeFilter(filter)"
    >
      {{ filter }}
      <i class="fas fa-times"></i>
    </button>
  </div>

  <div class="filters-container" v-if="filters.date != ''">
    <button class="button filter-button" @click="removeFilter(filters.date)">
      {{ filters.date }}
      <i class="fas fa-times"></i>
    </button>
  </div>

  <div class="container">
    <Card
      v-if="checkEmpty()"
      v-for="page in filtered"
      :id="page.id"
      :title="page.title"
      :subtitle="page.subtitle"
      :plaintext="page.plaintext"
      :date="page.date"
      :tags="page.tags"
      :authors="page.authors"
      :img="page.img"
    />
    <h3 v-else>Nessun risultato, prova a modificare i filtri!</h3>
  </div>
</template>

<style>
.articoli-title {
  font-family: "CodeBold";
}

.articoli-title-container {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 20px;
}

.articoli-title-text {
  white-space: pre-wrap;
  margin-left: 10px;
  font-size: large;
}

.articoli-searchbar {
  margin-right: 10px;
  min-height: 50px;
  margin-bottom: 10px;
}

.articoli-searchbar-button {
  display: flex;
  align-items: space-between;
}

.articoli-title-filter-button {
  height: 50px;
  display: flex;
  letter-spacing: 1px;
  margin-right: 10px;
  background-color: #303030;
  align-items: center;
  border: 1px solid #303030;
  border-radius: 15px;
  color: #e0e0e0;
  cursor: pointer;
  font-weight: 600;
  max-width: 60%;
  text-size-adjust: 80%;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;
  box-sizing: border-box;
  font-size: 14px;
}

.articoli-title-filter-button:disabled {
  pointer-events: none;
}

.articoli-title-filter-button:hover {
  color: #303030;
  background-color: #e0e0e0;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.articoli-title-filter-button:active {
  box-shadow: none;
  transform: translateY(0);
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: auto;
  padding-right: 80%;
}
</style>
