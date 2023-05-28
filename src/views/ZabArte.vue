<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { updateArtDatabase, zabarte, artFiltered, artFilters } from "@/state";
import SearchBarArt from "@/components/SearchBarArt.vue";

function removeFilter(filterData: string) {
  let index = artFilters.authors.indexOf(filterData);
  if (index > -1) {
    artFilters.authors.splice(index, 1);
  } else {
    index = artFilters.tags.indexOf(filterData);
    if (index > -1) {
      artFilters.tags.splice(index, 1);
    }
  }
}

const showFilters = reactive({
  showFilters: false,
});

//reactive variable to display the filters as buttons
const filtersList = reactive({
  data: [""],
});

//updates the filters as they're pressed
filtersList.data = [];
for (let i in zabarte) {
  const filteringData = zabarte[i]["tags"];
  for (let j in filteringData) {
    if (!filtersList.data.includes(filteringData[j])) {
      filtersList.data.push(filteringData[j]);
    }
  }
}

//adds the selected filters to the variable artFilters
//in order to display the articles according to the filters
function addFilter(filterData: string) {
  if (!artFilters["tags"].includes(filterData)) {
    artFilters["tags"].push(filterData);
  }
}

function checkFull() {
  return artFiltered.value.length === zabarte.length;
}

const currentIndex = ref(0);

const currentImage = computed(() => zabarte[currentIndex.value]);

const showNextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % zabarte.length;
};

const showPrevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + zabarte.length) % zabarte.length;
};

let classname: string;
const userAgent = navigator.userAgent;
if (userAgent.indexOf("Chrome") > -1) {
  classname = "button-chrome";
} else if (userAgent.indexOf("Safari") > -1) {
  classname = "button-safari";
} else classname = "button-chrome";

//variable that reads the localStorage
const savedZabArte = ref<string[]>(
  JSON.parse(localStorage.getItem("SavedZabArte") || "[]")
);

//functions to manage the localStorage
function addZabArte() {
  savedZabArte.value.push(`${currentImage.value.id}`);
  localStorage.setItem("SavedZabArte", JSON.stringify(savedZabArte.value));
}

function removeZabArte() {
  savedZabArte.value = savedZabArte.value.filter(
    (id) => id !== `${currentImage.value.id}`
  );
  localStorage.setItem("SavedZabArte", JSON.stringify(savedZabArte.value));
}

// Check if the ZabArteId is in the list of saved ZabArte
const isZabArteSaved = computed(() =>
  savedZabArte.value.includes(`${currentImage.value.id}`)
);

//fuction to share the article
function shareViaWebShare() {
  navigator.share({
    title: currentImage.value.title,
    text: "",
    url:
      window.location.pathname +
      `/view?q=${currentImage.value.id}#${currentImage.value.title}`,
  });
}

async function updateAndReload() {
  await updateArtDatabase();
  window.location.reload();
}
</script>

<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="articoli-title-container">
    <div class="articoli-searchbar-button">
      <SearchBarArt :class="`articoli-searchbar`" />
      <button
        v-if="!showFilters.showFilters"
        @click="showFilters.showFilters = !showFilters.showFilters"
        class="articoli-title-filter-button text-font"
      >
        Aggiungi Filtri
      </button>
    </div>
    <div class="filter-popup" v-if="showFilters.showFilters">
      <button
        class="button filter-button"
        v-for="tag in filtersList.data"
        @click="addFilter(tag)"
      >
        {{ tag }}
      </button>
      <button
        class="button filter-button"
        @click="showFilters.showFilters = !showFilters.showFilters"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
  <div class="filters-container" v-if="artFilters.authors.length != 1">
    <button
      class="button filter-button"
      v-for="filter in artFilters.authors.slice(1)"
      @click="removeFilter(filter)"
    >
      {{ filter }}
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="filters-container" v-if="artFilters.tags.length != 1">
    <button
      class="button filter-button"
      v-for="filter in artFilters.tags.slice(1)"
      @click="removeFilter(filter)"
    >
      {{ filter }}
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="container" v-if="checkFull()">
    <div class="image-container">
      <router-link
        :to="`/zabarte/view?q=${currentImage.id}#${currentImage.title}`"
        class="router-link"
      >
        <img
          :src="currentImage.img"
          alt="Zabarte Image"
          @error="updateAndReload"
          class="responsive-image"
        />
      </router-link>
    </div>
    <div class="container space">
      <h3
        v-if="!currentImage.title.includes('Image') && currentImage.title != ''"
        class="text-font"
      >
        {{ currentImage.title }}
      </h3>
    </div>
    <div class="container space">
      <h3 v-for="author in currentImage.authors" class="text-font">
        {{ author }}
      </h3>
      <div class="buttons card-buttons">
        <button
          :class="`save-button ${classname}`"
          @click="addZabArte"
          v-if="!isZabArteSaved"
        >
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <button
          :class="`save-button ${classname}`"
          @click="removeZabArte"
          v-else
        >
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button :class="`share-button ${classname}`" @click="shareViaWebShare">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
      </div>
    </div>
    <div class="container">
      <h3 v-for="tag in currentImage.tags" class="text-font">{{ tag }}</h3>
    </div>
    <div class="container space">
      <button class="button filter-button" @click="showPrevImage">
        <i class="fas fa-solid fa-chevron-left"></i>
      </button>
      <button class="button filter-button" @click="showNextImage">
        <i class="fas fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
  <div v-else class="container" v-for="art in artFiltered">
    <router-link
      :to="`/zabarte/view?q=${art.id}#${art.title}`"
      class="router-link image-container"
    >
      <img :src="art.img" class="responsive-image" />
      <h3
        v-if="!art.title.includes('Image') && art.title != ''"
        class="text-font"
      >
        {{ art.title }}
      </h3>
    </router-link>
    <h3 v-for="author in art.authors" class="text-font">
      {{ author }}
    </h3>
    <h3 v-for="tag in art.tags" class="text-font">{{ tag }}</h3>
  </div>
</template>

<style>
.image-container {
  text-align: center;
  max-width: 100%;
  max-height: 70%;
}

.responsive-image {
  display: block;
  max-width: 100%;
  max-height: 550px;
  object-fit: contain;
}
</style>
