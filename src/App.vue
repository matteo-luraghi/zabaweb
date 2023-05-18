<script setup lang="ts">
  import BottomBar from './components/bottombar/BottomBar.vue'

  //the code below will check the screen size and based on that
  //the app will display an upper navbar (for wide screens) or a bottom navbar (for small screens)
  let wideScreen = true
  const windowWidth = window.innerWidth
  if (windowWidth <900) {
    wideScreen = false
  }
  else {
    wideScreen = true
  }    
  //here is also initialized the router-view element, which manges the routing
  //it is nested inside a Suspense element because at the moment (05/2023) it's a very
  //effective way to load async components (the ones that needs the backend API call for example)
  //on the VueJs website it is specified that Suspense is in beta and will probably change in the future
  //if something doesn't work, it's very likely to be that
</script>

<template>
  <nav class="navbar" v-if="wideScreen">
      <img class="navbar-logo" src="./assets/logo.jpg"/>
      <div class="navbar-buttons">
        <router-link to="/" class="button navbar-button">HOME</router-link >
        <router-link to="/numeri" class="button navbar-button">ARCHIVIO NUMERI</router-link>
        <router-link to="/articoli" class="button navbar-button">ARTICOLI</router-link>   
      </div>
    </nav>

    <BottomBar v-else="wideScreen"/>

    <hr class="separator" v-if="wideScreen">
    
    <Suspense>
      <router-view/>
    </Suspense>
    
    <div class="footer">
      <div class="footer-circle">
        <a href="mailto:parini.zabaione@gmail.com"><i class="footer-icon fas fa-envelope"></i></a>
      </div>
      <div class="footer-circle">
        <a href="https://www.youtube.com/channel/UCh5GWanmOgLQO7up4Tkyk4g"><i class="footer-icon fa-brands fa-youtube"></i></a>  
      </div>
      <div class="footer-circle">
        <a href="https://www.facebook.com/zabaioneliceoparini/"><i class="footer-icon fa-brands fa-facebook-f"></i></a> 
      </div>
      <div class="footer-circle">
        <a href="https://www.instagram.com/zabaione.liceoparini/"><i class="footer-icon fa-brands fa-instagram"></i></a>   
      </div>
      <div class="footer-circle">
        <a href="https://zabaioneparini.online/"><i class="footer-icon fas fa-solid fa-link"></i></a>   
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
  }

  .footer-icon {
    color:#303030;
  }

</style>