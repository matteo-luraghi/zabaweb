<script setup lang="ts">
import {
  archive,
  updateArchiveDatabase,
  updateArtDatabase,
  updateArticleDatabase,
  notReadyArchive,
  notReadyArt,
  notReadyArticles,
} from "../state";
import { ref, computed } from "vue";

const props = defineProps<{
  query: string;
}>();

let showPdf = {
  url: "",
  name: "",
};

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

const numberId = parseInt(props.query.split("#")[0]);

//retreive the correct numero from the archive based on the ID
let found = archive.find((obj) => {
  return obj.id === numberId;
});

if (found) {
  showPdf.url = found.url;
  showPdf.name = found.name;
}

//function to share the numero
function shareViaWebShare() {
  navigator.share({
    title: showPdf.name,
    text: "",
    url: window.location.pathname + `?q=${numberId}#${showPdf.name}`,
  });
}

//variable that reads the localStorage
const savedNumbers = ref<string[]>(
  JSON.parse(localStorage.getItem("SavedNumbers") || "[]")
);

//functions to manage the localStorage
function addNumber() {
  savedNumbers.value.push(`${numberId}`);
  localStorage.setItem("SavedNumbers", JSON.stringify(savedNumbers.value));
}

function removeNumber() {
  savedNumbers.value = savedNumbers.value.filter((id) => id !== `${numberId}`);
  localStorage.setItem("SavedNumbers", JSON.stringify(savedNumbers.value));
}

// Check if the numberId is in the list of saved numbers
const isNumberSaved = computed(() =>
  savedNumbers.value.includes(`${numberId}`)
);

let classname: string;
const userAgent = navigator.userAgent;

if (userAgent.indexOf("Chrome") > -1) {
  classname = "button-chrome";
} else if (userAgent.indexOf("Safari") > -1) {
  classname = "button-safari";
}
</script>

<template>
  <div class="bar-container">
    <h2 class="text-font">{{ showPdf.name }}</h2>
    <div class="buttons">
      <button
        id="save-button"
        :class="`save-button ${classname}`"
        @click="addNumber"
        v-if="!isNumberSaved"
      >
        <i class="fa-regular fa-bookmark"></i>
      </button>
      <button
        id="saved-button"
        :class="`save-button ${classname}`"
        @click="removeNumber"
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
  <iframe
    :src="showPdf.url"
    frameborder="0"
    width="97%"
    height="1700px"
  ></iframe>
</template>
