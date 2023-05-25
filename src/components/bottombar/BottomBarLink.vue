<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{ to: string; icon: string; text: string }>();

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <div class="icon-container" :class="{ active: isActive }">
      <i class="icon" :class="icon" />
      <span class="icon-text">{{ text }}</span>
    </div>
    <transition name="fade">
      <span>
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-text {
  margin-top: 5px; /* Adjust the spacing between icon and text */
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-bottom: 5px; /* Adjust the spacing between icon and text */
}

.icon-container.active {
  background-color: #303030;
  border-radius: 0.25em;
  padding: 3px;
  max-width: 70px;
}
</style>
