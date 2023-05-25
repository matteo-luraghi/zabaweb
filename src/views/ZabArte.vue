<script setup lang="ts">
import { ref, computed } from "vue";
import { zabarte } from "@/state";

const currentIndex = ref(0);
const isSwiped = ref(false);
const touchStartX = ref(0);
const swipeDirection = ref("");

const currentImage = computed(() => zabarte[currentIndex.value]);

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchEnd = (event: TouchEvent) => {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchEndX - touchStartX.value;

  if (deltaX > 50) {
    showPrevImage();
    swipeDirection.value = "right";
  } else if (deltaX < -50) {
    showNextImage();
    swipeDirection.value = "left";
  }
};

const showNextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % zabarte.length;
};

const showPrevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + zabarte.length) % zabarte.length;
};
</script>

<template>
  <h1 class="header articoli-title">ZABARTE</h1>
  <div class="container" v-if="zabarte.length != 0">
    <div
      class="image-container"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <img
        :src="currentImage.img"
        alt="Zabarte Image"
        :class="{
          swipe: isSwiped,
          left: swipeDirection === 'left',
          right: swipeDirection === 'right',
        }"
      />
    </div>
    <h3 class="text-font">{{ currentImage.title }}</h3>
  </div>
  <p v-else>Ops! Non ci sono ancora opere d'arte, riprova in futuro!</p>
</template>

<style>
.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.swipe.left {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: translateX(-100%);
}

.swipe.right {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: translateX(100%);
}
</style>
