<script setup lang="ts">
import { updateArtDatabase, zabarte } from "@/state";
import { ref, computed } from "vue";
const props = defineProps<{
  query: string;
}>();

const zabartId = parseInt(props.query.split("#")[0]);

const zabart = zabarte[zabarte.length - zabartId];

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

async function updateAndReload() {
  await updateArtDatabase();
  window.location.reload();
}
</script>

<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="container image-container">
    <img
      :src="zabart.img"
      alt="Zabarte Image"
      @error="updateAndReload"
      class="responsive-image"
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
        :class="`save-button ${classname}`"
        @click="addZabArte"
        v-if="!isZabArteSaved"
      >
        <i class="fa-regular fa-bookmark"></i>
      </button>
      <button :class="`save-button ${classname}`" @click="removeZabArte" v-else>
        <i class="fa-solid fa-bookmark"></i>
      </button>
      <button :class="`share-button ${classname}`" @click="shareViaWebShare">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    </div>
  </div>
  <div class="container">
    <h3 v-for="tag in zabart.tags" class="text-font">{{ tag }}</h3>
  </div>
</template>
