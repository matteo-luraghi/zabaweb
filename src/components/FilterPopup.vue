<script setup lang="ts">
import { filters, showFilters, dataJson } from "../state";
import { reactive } from "vue";

//reactive variable to display the filters as buttons
const filtersList = reactive({
  data: [""],
});

//updates the filters as they're pressed
filtersList.data = [];
for (let i in dataJson) {
  const filteringData = dataJson[i]["tags"];
  for (let j in filteringData) {
    if (!filtersList.data.includes(filteringData[j])) {
      filtersList.data.push(filteringData[j]);
    }
  }
}

//adds the selected filters to the global variable filters
//in order to display the articles according to the filters
function addFilter(filterData: string) {
  if (!filters["tags"].includes(filterData)) {
    filters["tags"].push(filterData);
  }
}
</script>

<template>
  <div class="filter-popup">
    <button
      id="filter-button-tag"
      class="button filter-button"
      v-for="tag in filtersList.data"
      @click="addFilter(tag)"
    >
      {{ tag }}
    </button>
    <button
      id="filter-button-tag-close"
      class="button filter-button"
      @click="showFilters.showFilters = !showFilters.showFilters"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<style>
.filter-popup {
  display: flex;
  flex-direction: column;
  margin-right: 10%;
}
.filter-button {
  margin-bottom: 10px;
  background-color: transparent;
  border: 2px solid #303030;
  border-radius: 15px;
  color: #303030;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  min-height: 60px;
  min-width: 0;
  padding: 16px 24px;
}
.filter-button:disabled {
  pointer-events: none;
}
</style>
