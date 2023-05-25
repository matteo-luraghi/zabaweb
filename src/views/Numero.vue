<script setup lang="ts">
import { archive } from "../state";
import { ref, computed } from "vue";

const props = defineProps<{
  query: string;
}>();

const numberId = parseInt(props.query.split("#")[0]);

let showPdf = {
  url: "",
  name: "",
};

showPdf.url = archive[archive.length - numberId].url;
showPdf.name = archive[archive.length - numberId].name;

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
        :class="`save-button ${classname}`"
        @click="addNumber"
        v-if="!isNumberSaved"
      >
        <i class="fa-regular fa-bookmark"></i>
      </button>
      <button :class="`save-button ${classname}`" @click="removeNumber" v-else>
        <i class="fa-solid fa-bookmark"></i>
      </button>
      <button :class="`share-button ${classname}`" @click="shareViaWebShare">
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
