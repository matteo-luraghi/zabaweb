<script setup lang="ts">
import { articleDetails, dataJson } from "../state";
import { computed } from "vue";
const props = defineProps<{
  query: string;
}>();
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

for (let i in dataJson) {
  if (dataJson[i].id === parseInt(props.query)) {
    articleDetails.title = dataJson[i].title;
    articleDetails.text = dataJson[i].text;
    articleDetails.subtitle = dataJson[i].subtitle;
    articleDetails.img = dataJson[i].img;
    articleDetails.authors = dataJson[i].authors;
    articleDetails.tags = dataJson[i].tags;
    articleDetails.date = dataJson[i].date;
    break;
  }
}

const formattedText = computed(() => {
  let text = "";
  for (const part in articleDetails.text) {
    text += `<span style="${
      articleDetails.text[part as keyof object]
    }">${part}</span>`;
  }
  return text;
});
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
    <h3 class="articolo-subtitle text-font">{{ articleDetails.subtitle }}</h3>
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

.articolo-text {
  white-space: pre-wrap;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>
