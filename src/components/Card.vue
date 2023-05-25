<script setup lang="ts">
import { filters, updateDatabase } from "../state";
import { computed, ref } from "vue";

//info of the article object
const props = defineProps<{
  id: number;
  title: string;
  subtitle: string;
  plaintext: string;
  date: string;
  tags: object;
  authors: object;
  img: string;
}>();
const windowWidth = window.innerWidth;
//the max length of the text displayed on the card is 400 for small screens and 600 for large ones
let maxTextLength = windowWidth < 900 ? 400 : 600;

//the following code will search for the '.' nearest to the chars limit and add '[...]'
const slicedText = computed(() => {
  if (props.plaintext.length > maxTextLength) {
    let last = 0;
    for (let i = 0; i < props.plaintext.length; i++) {
      if (props.plaintext[i] === ".") {
        last = i;
      }
      if (last > maxTextLength) {
        break;
      }
    }
    return props.plaintext.slice(0, last + 1) + " [...]";
  } else {
    return props.plaintext;
  }
});

//if the user clicks on an author's name, the date or a tag, the global variable filters will be updated with the right filters
//the router will manage the routing to the /articoli view with the filters on
function addFilters(data: string, button: string) {
  if (button === "authors") {
    filters.authors.push(data);
  } else if (button === "tags") {
    filters.tags.push(data);
  } else if (button === "date") {
    filters.date = data;
  }
}

//variable that reads the localStorage
const savedArticles = ref<string[]>(
  JSON.parse(localStorage.getItem("SavedArticles") || "[]")
);

//functions to manage the localStorage
function addArticle() {
  savedArticles.value.push(`${props.id}`);
  localStorage.setItem("SavedArticles", JSON.stringify(savedArticles.value));
}

function removeArticle() {
  savedArticles.value = savedArticles.value.filter(
    (id) => id !== `${props.id}`
  );
  localStorage.setItem("SavedArticles", JSON.stringify(savedArticles.value));
}

// Check if the articleId is in the list of saved articles
const isArticleSaved = computed(() =>
  savedArticles.value.includes(`${props.id}`)
);

//fuction to share the article
function shareViaWebShare() {
  navigator.share({
    title: props.title,
    text: "",
    url: window.location.pathname + `?q=${props.id}#${props.title}`,
  });
}

async function updateAndReload() {
  await updateDatabase();
  window.location.reload();
}
</script>

<template>
  <div class="article-card">
    <router-link :to="`/articolo?q=${id}#${title}`">
      <img
        class="button article-card-image"
        :src="img"
        @error="updateAndReload"
      />
    </router-link>
    <div class="article-card-title-container">
      <router-link :to="`/articolo?q=${id}#${title}`" class="router-link">
        <p class="button article-card-title title-font">
          {{ title }}
        </p>
      </router-link>
      <div class="buttons card-buttons">
        <button class="save-button" @click="addArticle" v-if="!isArticleSaved">
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <button class="save-button" @click="removeArticle" v-else>
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button class="share-button" @click="shareViaWebShare">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
      </div>
    </div>
    <div class="article-card-info">
      <div class="article-card-tags">
        <router-link to="/articoli" v-for="tag in tags" class="router-link">
          <p
            class="button article-card-tag text-font"
            @click="addFilters(tag, 'tags')"
          >
            {{ tag }}
          </p>
        </router-link>
      </div>
      <router-link to="/articoli" class="router-link">
        <p
          class="button article-card-date text-font"
          @click="addFilters(date, 'date')"
        >
          {{ date }}
        </p>
      </router-link>
    </div>
    <div class="article-card-authors">
      <router-link to="/articoli" v-for="author in authors" class="router-link">
        <p
          class="button article-card-author text-font"
          @click="addFilters(author, 'authors')"
        >
          {{ author }}
        </p>
      </router-link>
    </div>
    <p class="article-card-text text-font">{{ slicedText }}</p>
    <router-link :to="`/articolo?q=${id}#${title}`" class="router-link">
      <p class="button article-card-button text-font">LEGGI</p>
    </router-link>
  </div>
</template>

<style>
.article-card {
  width: 430px;
  max-height: 900px;
  margin-bottom: 20px;
}

.article-card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.article-card-title-container {
  display: flex;
  height: 10%;
  align-items: space-between;
}

.article-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.article-card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.article-card-tags {
  display: flex;
  gap: 5px;
}

.article-card-authors {
  display: flex;
  gap: 5px;
}

.article-card-date {
  margin: 0;
}

.card-buttons {
  margin-right: 3px;
}
</style>
