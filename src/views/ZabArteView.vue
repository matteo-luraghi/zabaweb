<script setup lang="ts">
import {
  zabarte,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
  notReadyArchive,
  notReadyArt,
  notReadyArticles,
  errorImage,
} from "@/state";
import { ref, computed } from "vue";
const props = defineProps<{
  query: string;
}>();

if (notReadyArticles.value) {
  await updateArticleDatabase();
  notReadyArticles.value = false;
}

if (notReadyArchive.value) {
  await updateArchiveDatabase();
  notReadyArchive.value = false;
}

if (notReadyArt.value) {
  await updateArtDatabase();
  notReadyArt.value = false;
}

let zabart: {
  id: number;
  title: string;
  authors: string[];
  tags: string[];
  img: string;
};
const zabartId = parseInt(props.query.split("#")[0]);
let found = zabarte.find((obj) => {
  return obj.id === zabartId;
});
if (found) {
  zabart = found;
}

//style based on the device's properties
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
  savedZabArte.value.push(`${zabart.id}`);
  localStorage.setItem("SavedZabArte", JSON.stringify(savedZabArte.value));
}

function removeZabArte() {
  savedZabArte.value = savedZabArte.value.filter((id) => id !== `${zabart.id}`);
  localStorage.setItem("SavedZabArte", JSON.stringify(savedZabArte.value));
}

// Check if the ZabArteId is in the list of saved ZabArte
const isZabArteSaved = computed(() =>
  savedZabArte.value.includes(`${zabart.id}`)
);

//fuction to share the article
function shareViaWebShare() {
  navigator.share({
    title: zabart.title,
    text: "",
    url: window.location.pathname + `?q=${zabart.id}#${zabart.title}`,
  });
}
</script>

<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="container image-container">
    <img
      :src="zabart.img"
      alt="Zabarte Image"
      class="responsive-image"
      @error="errorImage('art')"
    />
  </div>
  <div class="container space">
    <h3
      v-if="!zabart.title.includes('Image') && zabart.title != ''"
      class="text-font"
    >
      {{ zabart.title }}
    </h3>
  </div>
  <div class="container">
    <h3 v-for="author in zabart.authors" class="text-font">
      {{ author }}
    </h3>
    <div class="buttons card-buttons">
      <button
        id="save-button"
        :class="`save-button ${classname}`"
        @click="addZabArte"
        v-if="!isZabArteSaved"
      >
        <i class="fa-regular fa-bookmark"></i>
      </button>
      <button
        id="saved-button"
        :class="`save-button ${classname}`"
        @click="removeZabArte"
        v-else
      >
        <i class="fa-solid fa-bookmark"></i>
      </button>
      <button
        id="share-button"
        :class="`share-button ${classname}`"
        @click="shareViaWebShare"
      >
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    </div>
  </div>
  <div class="container">
    <h3 v-for="tag in zabart.tags" class="text-font">{{ tag }}</h3>
  </div>
</template>
