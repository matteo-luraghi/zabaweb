<script setup lang="ts">
    import BottomBarLink from './BottomBarLink.vue';
</script>

<template>
    <div class="bottombar">
        <BottomBarLink class="bottombar-link" :active-class="'bottombar-link-active'" to="/numeri" icon="fas fa-solid fa-box-archive">ARCHIVIO</BottomBarLink >
        <BottomBarLink class="bottombar-link" :active-class="'bottombar-link-active'" to="/" icon="fas fa-home">HOME</BottomBarLink >
        <BottomBarLink class="bottombar-link" :active-class="'bottombar-link-active'" to="/articoli" icon="fas fa-newspaper">ARTICOLI</BottomBarLink >
    </div>
</template>

<style>
:root {
  --bottombar-bg-color: #f5f5f5;
  --bottombar-item-hover: #303030;
  --bottombar-item-active: #303030;
}
</style>

<style scoped>
.bottombar {
  width: 100%;
  color: black;
  background-color: var(--bottombar-bg-color);
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 50px;
  padding: 0.5em;
  border: none;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottombar h1 {
  height: 2.5em;
}

.bottombar-link {
  font-family: "CodeBold";
  font-size: 16px;
  color: #303030;
}

.bottombar-link-active {
  color: #303030;
}

.bottombar-link-active:hover {
  color: #303030;
}

.bottombar-link:hover {
  background-color: #e0e0e0;
}
</style>
