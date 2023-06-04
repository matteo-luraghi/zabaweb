<script setup lang="ts">
import BottomBar from "./components/bottombar/BottomBar.vue";

//the code below will check the screen size and based on that
//the app will display an upper navbar (for wide screens) or a bottom navbar (for small screens)
let wideScreen = true;
const windowWidth = window.innerWidth;
if (windowWidth < 1700) {
  wideScreen = false;
} else {
  wideScreen = true;
}

//here is also initialized the router-view element, which manges the routing
//it is nested inside a Suspense element because at the moment (05/2023) it's a very
//effective way to load async components (the ones that needs the backend API call for example)
//on the VueJs website it is specified that Suspense is in beta and will probably change in the future
//if something doesn't work, it's very likely to be that

let classname: string;
if (wideScreen === true) {
  classname = "footer-circle-large";
} else {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1) {
    classname = "footer-circle-small-chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    classname = "footer-circle-small-safari";
  } else classname = "footer-circle-small-chrome";
}

function showBottomBar() {
  if (!wideScreen && window.location.pathname != "/install") {
    return true;
  }
  return false;
}
</script>

<template>
  <nav class="navbar" v-if="wideScreen">
    <img alt="logo" class="navbar-logo" src="./assets/logo.webp" />
    <div class="navbar-buttons">
      <router-link to="/" class="button navbar-button">HOME</router-link>
      <router-link to="/articoli" class="button navbar-button"
        >ARTICOLI</router-link
      >
      <router-link to="/numeri" class="button navbar-button"
        >ARCHIVIO NUMERI</router-link
      >
      <router-link to="/zabarte" class="button navbar-button"
        >ZABARTE</router-link
      >
      <router-link to="/preferiti" class="button navbar-button"
        >PREFERITI</router-link
      >
    </div>
  </nav>

  <BottomBar v-if="showBottomBar()" />

  <hr class="separator" v-if="wideScreen" />
  <Suspense>
    <router-view />
  </Suspense>

  <div class="footer">
    <div :class="`footer-circle ${classname}`">
      <a href="mailto:parini.zabaione@gmail.com"
        ><i class="footer-icon fas fa-envelope"></i
      ></a>
    </div>
    <div :class="`footer-circle ${classname}`">
      <a href="https://www.youtube.com/channel/UCh5GWanmOgLQO7up4Tkyk4g"
        ><i class="footer-icon fa-brands fa-youtube"></i
      ></a>
    </div>
    <div :class="`footer-circle ${classname}`">
      <a href="https://www.facebook.com/zabaioneliceoparini/"
        ><i class="footer-icon fa-brands fa-facebook-f"></i
      ></a>
    </div>
    <div :class="`footer-circle ${classname}`">
      <a href="https://www.instagram.com/zabaione.liceoparini/"
        ><i class="footer-icon fa-brands fa-instagram"></i
      ></a>
    </div>
    <div :class="`footer-circle ${classname}`">
      <a href="https://zabaioneparini.online/"
        ><i class="footer-icon fas fa-solid fa-link"></i
      ></a>
    </div>
  </div>
</template>

<style>
.navbar {
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  width: 100%;
  margin: 30px;
}

.navbar-logo {
  align-self: flex-start;
  max-width: 76px;
}

.navbar-buttons {
  align-self: flex-end;
  display: inline-flex;
  justify-content: space-between;
}

.navbar-button {
  margin-right: 20px;
}

.footer {
  box-sizing: border-box;
  padding: 40px 60px;
  display: flex;
  background-color: #303030;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.footer-circle {
  display: flex;
  border-radius: 50%;
  background-color: #e0e0e0;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.footer-circle-small-chrome {
  width: 50px;
  height: 35px;
  margin-bottom: 35px;
}

.footer-circle-small-safari {
  width: 35px;
  height: 35px;
  margin-bottom: 40px;
}

.footer-circle-large {
  width: 50px;
  height: 50px;
}

.footer-icon {
  color: #303030;
}
</style>
