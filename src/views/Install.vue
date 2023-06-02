<script setup lang="ts">
import { reactive } from "vue";
const select = reactive({
  system: "",
});
</script>

<template>
  <h1 class="header">DOWNLOAD</h1>
  <div class="container" style="flex-wrap: wrap">
    <p>Che dispositivo hai?</p>
    <div class="container">
      <button
        id="system-button-android"
        class="button system-button"
        :active-class="'system-button-active'"
        @click="select.system = 'ANDROID'"
      >
        ANDROID
      </button>
      <button
        id="system-button-ios"
        class="button system-button"
        :active-class="'system-button-active'"
        @click="select.system = 'IOS'"
      >
        APPLE (IOS)
      </button>
    </div>
  </div>

  <div v-if="select.system === 'IOS'" class="container">
    <div class="container">
      <p>Apri il link su Safari e clicca sul pulsante "condividi"</p>
      <img alt="safari1" src="../assets/download/safari1.webp" />
    </div>
    <div class="container">
      <p>Clicca "Aggiungi alla schermata Home"</p>
      <img alt="safari2" src="../assets/download/safari2.webp" />
    </div>
    <div class="container">
      <p>Clicca "Aggiungi"</p>
      <img alt="safari3" src="../assets/download/safari3.webp" />
    </div>
    <p>Fatto! Controlla nella schermata home!</p>
  </div>

  <div v-if="select.system === 'ANDROID'" class="container">
    <div class="container">
      <p>
        Clicca sul messaggio per installare l'app (se non compare prova a
        ricaricare la pagina)
      </p>
      <img alt="chrome1" src="../assets/download/chrome1.webp" />
      <img alt="firefox1" src="../assets/download/firefox1.webp" />
      <img alt="samsung1" src="../assets/download/samsung1.webp" />
    </div>
    <div class="container">
      <p>Ora clicca "Installa"</p>
      <img alt="chrome2" src="../assets/download/chrome2.webp" />
      <img alt="samsung2" src="../assets/download/samsung2.webp" />
    </div>
    <div class="container">
      <p>In alternativa clicca sui tre puntini</p>
      <img alt="chrome3" src="../assets/download/chrome3.webp" />
      <img alt="firefox2" src="../assets/download/firefox2.webp" />
    </div>
    <div class="container">
      <p>E ora clicca su "Installa App"</p>
      <img alt="chrome4" src="../assets/download/chrome4.webp" />
      <img alt="firefox3" src="../assets/download/firefox3.webp" />
      <img alt="opera1" src="../assets/download/opera1.webp" />
    </div>
  </div>
</template>

<style scoped>
p {
  font-family: "MinionPro";
  font-size: 24px;
}
img {
  margin: 10px;
}
.system-button {
  height: 50px;
  display: flex;
  letter-spacing: 1px;
  margin-right: 10px;
  background-color: #303030;
  align-items: center;
  justify-content: center;
  border: 1px solid #303030;
  border-radius: 15px;
  color: #e0e0e0;
  cursor: pointer;
  font-weight: 600;
  text-size-adjust: 80%;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;
  box-sizing: border-box;
  width: 90px;
}

.system-button-active {
  background-color: #e0e0e0;
  color: #303030;
}
</style>
