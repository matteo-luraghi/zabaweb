<script setup lang="ts">
import { ref, computed } from "vue";
import { useSwipe } from "vue-touch";

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
  // Add more image objects as needed
];

const currentIndex = ref(0);

const currentImage = computed(() => zabarte[currentIndex.value]);

const showNextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % zabarte.length;
};

const showPreviousImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + zabarte.length) % zabarte.length;
};

useSwipe({
  directives: {
    swipeleft: showNextImage,
    swiperight: showPreviousImage,
  },
});
</script>

<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="image-container">
    <img
      :src="currentImage.img"
      alt="Zabarte Image"
      v-touch:swipeleft="showNextImage"
      v-touch:swiperight="showPreviousImage"
    />
  </div>
</template>

<style>
.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
