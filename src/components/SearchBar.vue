<script setup lang="ts">
import { filters } from "../state";
function isDateStringValid(dateString: string): boolean {
  const dateFormats = [
    /^\d{4}-\d{2}-\d{2}$/, // Format: YYYY-MM-DD
    /^\d{2}-\d{2}-\d{4}$/, // Format: DD-MM-YYYY
    /^\d{4}\/\d{2}\/\d{2}$/, // Format: YYYY/MM/DD
    /^\d{2}\/\d{2}\/\d{4}$/, // Format: DD/MM/YYYY
  ];

  for (const format of dateFormats) {
    if (format.test(dateString)) {
      return true;
    }
  }
  return false;
}
function convertDateFormat(input: string): string {
  // Replace forward slashes with dashes
  const converted = input.replace(/\//g, "-");

  // Extract year, month, and day from the original string
  const matches = input.match(/\d+/g);
  if (!matches || matches.length < 3) {
    throw new Error("Invalid date format");
  }

  let [year, month, day] = matches;
  if (day.length > year.length) {
    let temp = year;
    year = day;
    day = temp;
  }

  // Create the new date format
  const newFormat = `${year}-${month}-${day}`;

  return newFormat;
}
//when the enter key or the lens icon are pressed the variable search, which contains
//the text written by the user in the searchbar, will be pushed to the authors and title methods of
//the global variable filter, go in the 'state.ts' file to see how the filtering system works
let search = "";
function searchFilter() {
  while (search[search.length - 1] === " ") {
    //if the last char is a space it gets ignored
    search = search.slice(0, search.length - 1);
  }
  if (search != "") {
    if (isDateStringValid(search) === true) {
      filters.date = convertDateFormat(search);
    } else {
      filters.authors.push(search);
      filters.title = search;
    }
    search = "";
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
      placeholder="Cerca titolo, autore o data"
      class="searchbar-input"
    />
    <button @click="searchFilter" class="searchbar-button">
      <i class="fas fa-search searchbar-icon"></i>
    </button>
  </div>
</template>

<style>
.searchbar {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #303030;
  border-radius: 15px;
  color: #3b3b3b;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  max-height: 60px;
  min-width: 0;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;
}

.searchbar-input {
  border: none;
  outline: none;
  height: 100%;
  width: 85%;
  border-radius: 15px;
}

.searchbar-input:focus {
  border: none;
  outline: none;
}

.searchbar-icon {
  cursor: pointer;
  color: #e0e0e0;
}

.searchbar-button {
  background-color: #303030;
  border-radius: 8px;
  border: 1px solid #303030;
}
</style>
