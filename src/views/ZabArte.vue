<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="image-container">
    <img
      :src="currentImage.img"
      alt="Zabarte Image"
      @click="showNextImage"
      :class="{ swipe: isSwiped }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const zabarte = [
  {
    id: 1,
    title: "Image 1",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  },
  {
    id: 2,
    title: "Image 2",
    img: "https://media.istockphoto.com/id/493223692/photo/milan-cathedral-italy.jpg?s=612x612&w=0&k=20&c=35HLzOeor-vAWdcv5SvpBcnRECAmpzjeqh28uUzk-to=",
  },
  {
    id: 3,
    title: "Image 3",
    img: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
  },
];

const currentIndex = ref(0);
const isSwiped = ref(false);

const currentImage = computed(() => zabarte[currentIndex.value]);

const showNextImage = () => {
  isSwiped.value = true;
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % zabarte.length;
    isSwiped.value = false;
  }, 500);
};
</script>

<style>
.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.swipe {
  transition: transform 0.5s ease-in-out;
  transform: translateX(100%);
}
</style>
