<script setup lang="ts">
import { archive, dataJson, zabarte } from "@/state";
import { computed, reactive } from "vue";
import Card from "@/components/Card.vue";

//logic to retreive the saved articles from storage (based on the ID)
const savedArticlesId = computed(() => {
  const savedArticlesId = localStorage.getItem("SavedArticles");
  return savedArticlesId ? JSON.parse(savedArticlesId) : [];
});
const savedArticles = reactive({
  articles: [] as typeof dataJson,
});

for (let i in savedArticlesId.value) {
  let found = dataJson.find((obj) => {
    return obj.id === parseInt(savedArticlesId.value[i]);
  });
  if (found) {
    savedArticles.articles.push(found);
  }
}

//logic to retreive the saved numeri from storage (based on the ID)
const savedNumbersId = computed(() => {
  const savedNumbersId = localStorage.getItem("SavedNumbers");
  return savedNumbersId ? JSON.parse(savedNumbersId) : [];
});
const savedNumbers = reactive({
  numbers: [] as typeof archive,
});

for (let i in savedNumbersId.value) {
  let found = archive.find((obj) => {
    return obj.id === parseInt(savedNumbersId.value[i]);
  });
  if (found) {
    savedNumbers.numbers.push(found);
  }
}

//logic to retreive the saved art from storage (based on the ID)
const savedZabArteId = computed(() => {
  const savedZabArteId = localStorage.getItem("SavedZabArte");
  return savedZabArteId ? JSON.parse(savedZabArteId) : [];
});
const savedZabArte = reactive({
  art: [] as typeof zabarte,
});

for (let i in savedZabArteId.value) {
  let found = zabarte.find((obj) => {
    return obj.id === parseInt(savedZabArteId.value[i]);
  });
  if (found) {
    savedZabArte.art.push(found);
  }
}

let showSaved = reactive({
  show: "articoli",
  articoli: {
    isActive: true,
  },
  numeri: {
    isActive: false,
  },
  zabarte: {
    isActive: false,
  },
});
</script>

<template>
  <h1 class="header articoli-title">PREFERITI</h1>

  <div class="container" style="flex-wrap: nowrap">
    <button
      class="preferiti-button button text-font"
      :class="{ active: showSaved.articoli.isActive }"
      @click="
        showSaved.show = 'articoli';
        showSaved.articoli.isActive = true;
        showSaved.numeri.isActive = false;
        showSaved.zabarte.isActive = false;
      "
    >
      <i class="fas fa-newspaper" style="width: 25px"></i>
    </button>
    <button
      class="preferiti-button button text-font"
      :class="{ active: showSaved.numeri.isActive }"
      @click="
        showSaved.show = 'numeri';
        showSaved.articoli.isActive = false;
        showSaved.numeri.isActive = true;
        showSaved.zabarte.isActive = false;
      "
    >
      <i class="fas fa-solid fa-box-archive" style="width: 25px"></i>
    </button>
    <button
      class="preferiti-button button text-font"
      :class="{ active: showSaved.zabarte.isActive }"
      @click="
        showSaved.show = 'zabarte';
        showSaved.articoli.isActive = false;
        showSaved.numeri.isActive = false;
        showSaved.zabarte.isActive = true;
      "
    >
      <i class="fas fa-solid fa-paintbrush" style="width: 25px"></i>
    </button>
  </div>

  <div class="container" v-if="showSaved.show === 'articoli'">
    <Card
      v-if="savedArticles.articles.length != 0"
      v-for="page in savedArticles.articles"
      :id="page.id"
      :title="page.title"
      :subtitle="page.subtitle"
      :plaintext="page.plaintext"
      :date="page.date"
      :tags="page.tags"
      :authors="page.authors"
      :img="page.img"
    />
  </div>

  <div class="container numeri-container" v-if="showSaved.show === 'numeri'">
    <router-link
      :to="`/numero?q=${element.id}#${element.name}`"
      class="router-link"
      v-for="element in savedNumbers.numbers"
    >
      <h3 class="text-font">{{ element.name }}</h3>
      <img alt="numero-cover" class="numero-cover" :src="element.img" />
    </router-link>
  </div>

  <div class="container" v-if="showSaved.show === 'zabarte'">
    <router-link
      :to="`/zabarte/view?q=${art.id}#${art.title}`"
      class="router-link"
      v-for="art in savedZabArte.art"
    >
      <h3 class="text-font">{{ art.title }}</h3>
      <div class="container">
        <h3 class="text-font" v-for="author in art.authors">{{ author }}</h3>
        <h3 class="text-font" v-for="tag in art.tags">{{ tag }}</h3>
      </div>

      <img alt="art-img" :src="art.img" class="responsive-image" />
    </router-link>
  </div>
</template>

<style>
.preferiti-button {
  margin-bottom: 20px;
  background-color: transparent;
  border: 2px solid #303030;
  border-radius: 15px;
  color: #303030;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 60px;
  width: 80px;
  padding: 16px 16px;
}

.preferiti-button.active {
  background-color: #303030;
  color: #e0e0e0;
}
</style>
