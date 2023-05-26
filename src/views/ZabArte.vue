<script setup lang="ts">
import { ref, computed } from "vue";
import {
  updateArtDatabase,
  zabarte,
  artFiltered,
  artFilters,
  showFilters,
} from "@/state";
import SearchBarArt from "@/components/SearchBarArt.vue";

function removeFilter(filterData: string) {
  let index = artFilters.authors.indexOf(filterData);
  if (index > -1) {
    artFilters.authors.splice(index, 1);
  }
}

function checkEmpty() {
  return artFiltered.value.length == 0;
}

const currentIndex = ref(0);
const isSwiped = ref(false);
const touchStartX = ref(0);
const swipeDirection = ref("");

const currentImage = computed(() => zabarte[currentIndex.value]);

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchEnd = (event: TouchEvent) => {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchEndX - touchStartX.value;

  if (deltaX > 50) {
    showPrevImage();
    swipeDirection.value = "right";
  } else if (deltaX < -50) {
    showNextImage();
    swipeDirection.value = "left";
  }
};

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
}

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
  <SearchBarArt class="articoli-searchbar" />
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
  <div class="container" v-if="checkEmpty()">
    <div
      class="image-container"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <img
        :src="currentImage.img"
        alt="Zabarte Image"
        @error="updateAndReload"
        :class="{
          swipe: isSwiped,
          left: swipeDirection === 'left',
          right: swipeDirection === 'right',
        }"
      />
    </div>
    <div class="container space">
      <h3 class="text-font">{{ currentImage.title }}</h3>
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
      <h3 v-for="author in currentImage.authors" class="text-font">
        {{ author }}
      </h3>
    </div>
  </div>
  <div class="container" v-else>
    <router-link
      :to="`/zabarte/view?q=${art.id}#${art.title}`"
      class="router-link"
      v-for="art in artFiltered"
    >
      <h3 class="text-font">{{ art.title }}</h3>
      <img :src="art.img" />
    </router-link>
  </div>
</template>

<style>
.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.swipe.left {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: translateX(-100%);
}

.swipe.right {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: translateX(100%);
}
</style>
