<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ to: string, icon:string }>()

    const route = useRoute()
    const isActive = computed(() => route.path === props.to)

  
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon" />
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

.link:hover {
  background-color: var(--bottombar-item-hover);
}

.link.active {
  background-color: var(--bottombar-item-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>