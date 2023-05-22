<script setup lang="ts">
import { dataJson } from "../state";
import { computed } from "vue";
const props = defineProps<{
  query: string;
}>();
const articleId = parseInt(props.query.split("#")[0]);
//the global variable articleDetails contains all the info to display a single article
//it gets updated by the Cards component
let wideScreen = true;
const windowWidth = window.innerWidth;
if (windowWidth < 1700) {
  wideScreen = false;
} else {
  wideScreen = true;
}
let classname: string;
if (wideScreen === true) {
  classname = "articolo-large";
} else {
  classname = "articolo-small";
}

let articleDetails = {
  title: "",
  subtitle: "",
  text: {},
  plaintext: "",
  date: "",
  tags: {},
  authors: {},
  img: "",
};

articleDetails.title = dataJson[dataJson.length - articleId].title;
articleDetails.text = dataJson[dataJson.length - articleId].text;
articleDetails.plaintext = dataJson[dataJson.length - articleId].plaintext;
articleDetails.subtitle = dataJson[dataJson.length - articleId].subtitle;
articleDetails.img = dataJson[dataJson.length - articleId].img;
articleDetails.authors = dataJson[dataJson.length - articleId].authors;
articleDetails.tags = dataJson[dataJson.length - articleId].tags;
articleDetails.date = dataJson[dataJson.length - articleId].date;

const formattedText = computed(() => {
  let text = "";
  for (const part in articleDetails.text) {
    text += `<span style="${
      articleDetails.text[part as keyof object]
    }">${part}</span>`;
  }
  return text;
});

let slicedText: string;
if (articleDetails.plaintext.length > 300) {
  let last = 0;
  for (let i = 0; i < articleDetails.plaintext.length; i++) {
    if (articleDetails.plaintext[i] === ".") {
      last = i;
    }
    if (last > 300) {
      break;
    }
  }
  slicedText = articleDetails.plaintext.slice(0, last + 1) + " [...]";
} else {
  slicedText = articleDetails.plaintext;
}

function shareViaWebShare() {
  navigator.share({
    title: articleDetails.title,
    text: slicedText,
    url: window.location.pathname + `?q=${articleId}#${articleDetails.title}`,
  });
}
</script>

<template>
  <div
    class="articolo-header"
    :style="{ 'background-image': `url(${articleDetails.img})` }"
  >
    <h1 class="articolo-title text-center title-font">
      {{ articleDetails.title }}
    </h1>
  </div>

  <div :class="`articolo ${classname}`">
    <div class="bar-container">
      <h3 class="articolo-subtitle text-font">{{ articleDetails.subtitle }}</h3>
      <button class="share-button" @click="shareViaWebShare">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    </div>
    <h3 v-for="author in articleDetails.authors" class="articolo-authors">
      {{ author }}
    </h3>
    <p class="articolo-date text-font">{{ articleDetails.date }}</p>
    <p class="text-font articolo-text" v-html="formattedText"></p>
  </div>
</template>

<style>
.articolo-header {
  display: flex;
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  justify-content: center;
  opacity: 0.8;
}

.bar-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.articolo {
  display: flex;
  flex-direction: column;
}

.articolo-large {
  padding: 80px 60px;
}

.articolo-small {
  padding: 40px 30px;
}

.articolo-title {
  font-size: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 20px;
  max-width: 800px;
}

.articolo-subtitle {
  margin-left: 5px; /* Adjust the margin value as needed */
  margin-bottom: 20px; /* Add margin at the bottom */
}

.articolo-text {
  white-space: pre-wrap;
  font-size: 16px;
  letter-spacing: 1px;
  margin-left: 5px; /* Adjust the margin value as needed */
  margin-bottom: 20px; /* Add margin at the bottom */
}

.articolo-authors {
  margin-left: 5px; /* Adjust the margin value as needed */
}

.articolo-date {
  margin-left: 5px; /* Adjust the margin value as needed */
}

.share-button {
  border-radius: 50%;
  height: 35px;
  width: 50px;
  margin-top: 20px; /* Add margin at the top */
  margin-right: 10px; /* Add margin at the right */
  background-color: #f5f5f5; /* Adjust the background color */
  color: #5c5c5c; /* Adjust the text color */
  border: none;
  padding: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
</style>
