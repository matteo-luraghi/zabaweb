<script setup lang="ts">
import { dataJson } from "../state";
import { computed, ref } from "vue";
const props = defineProps<{
  query: string;
}>();

const articleId = parseInt(props.query.split("#")[0]);

//style based on the device's properties
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

let browserClass: string;
const userAgent = navigator.userAgent;

if (userAgent.indexOf("Chrome") > -1) {
  browserClass = "button-chrome";
} else if (userAgent.indexOf("Safari") > -1) {
  browserClass = "button-safari";
}

//the global variable articleDetails contains all the info to display a single article
let articleDetails: {
  title: string;
  subtitle: string;
  text: { [key: string]: string };
  plaintext: string;
  date: string;
  tags: object;
  authors: object;
  img: string;
} = {
  title: "",
  subtitle: "",
  text: {},
  plaintext: "",
  date: "",
  tags: {},
  authors: {},
  img: "",
};

//looking for the object it in dataJson
let found = dataJson.find((obj) => {
  return obj.id === articleId;
});
if (found) {
  articleDetails.title = found.title;
  articleDetails.text = found.text;
  articleDetails.plaintext = found.plaintext;
  articleDetails.subtitle = found.subtitle;
  articleDetails.img = found.img;
  articleDetails.authors = found.authors;
  articleDetails.tags = found.tags;
  articleDetails.date = found.date;
}

//this shows the text as it is in notion, with images too
const formattedText = computed(() => {
  let text = "";
  for (const part in articleDetails.text) {
    const content = articleDetails.text[part as keyof object];

    // Check if the content is a URL
    const isUrl = part.startsWith("http://") || part.startsWith("https://");
    if (isUrl) {
      // Replace the URL with an image tag
      text += `<div class="container" style:{"width": "100%"}><img src="${part}" class="articolo-image"></div>`;
    } else {
      // Add the part as a regular text
      text += `<span style="${content}">${part}</span>`;
    }
  }
  return text;
});

//variable that reads the localStorage
const savedArticles = ref<string[]>(
  JSON.parse(localStorage.getItem("SavedArticles") || "[]")
);

//functions to manage the localStorage
function addArticle() {
  savedArticles.value.push(`${articleId}`);
  localStorage.setItem("SavedArticles", JSON.stringify(savedArticles.value));
}

function removeArticle() {
  savedArticles.value = savedArticles.value.filter(
    (id) => id !== `${articleId}`
  );
  localStorage.setItem("SavedArticles", JSON.stringify(savedArticles.value));
}

// Check if the articleId is in the list of saved articles
const isArticleSaved = computed(() =>
  savedArticles.value.includes(`${articleId}`)
);

//link article preview
let slicedText: string;
if (articleDetails.plaintext.length > 50) {
  let last = 0;
  for (let i = 0; i < articleDetails.plaintext.length; i++) {
    if (articleDetails.plaintext[i] === ".") {
      last = i;
    }
    if (last > 50) {
      break;
    }
  }
  slicedText = articleDetails.plaintext.slice(0, last + 1) + " [...]";
} else {
  slicedText = articleDetails.plaintext;
}

//fuction to share the article
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
      <div class="buttons">
        <button
          id="saved-button"
          :class="`save-button ${browserClass}`"
          @click="addArticle"
          v-if="!isArticleSaved"
        >
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <button
          id="save-button"
          :class="`save-button ${browserClass}`"
          @click="removeArticle"
          v-else
        >
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button
          id="share-button"
          :class="`share-button ${browserClass}`"
          @click="shareViaWebShare"
        >
          <i class="fa-solid fa-share-nodes"></i>
        </button>
      </div>
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
  margin-left: 5px;
  margin-bottom: 20px;
}

.articolo-text {
  white-space: pre-wrap;
  font-size: 16px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 20px;
}

.articolo-authors {
  margin-left: 5px;
}

.articolo-date {
  margin-left: 5px;
}

.articolo-image {
  align-self: center;
  max-width: 500px;
  max-height: 500px;
}
</style>
