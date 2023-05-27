<script setup lang="ts">
import { reactive } from "vue";
const select = reactive({
  system: "",
});
</script>

<template>
  <h1 class="header">DOWNLOAD</h1>
  <div class="container" style="flex-wrap: wrap">
    <p>Che telefono hai?</p>
    <div>
      <button
        class="button system-button"
        :active-class="'system-button-active'"
        @click="select.system = 'ANDROID'"
      >
        ANDROID
      </button>
      <button
        class="button system-button"
        :active-class="'system-button-active'"
        @click="select.system = 'IOS'"
      >
        APPLE (IOS)
      </button>
    </div>
  </div>

  <div v-if="select.system === 'IOS'" class="install-container">
    <p>Tieni premuto sul link e clicca "Apri link"</p>
    <img src="../assets/download/safari4.webp" />
    <p>Clicca sul pulsante "condividi"</p>
    <img src="../assets/download/safari1.webp" />
    <p>Clicca "Aggiungi alla schermata Home"</p>
    <img src="../assets/download/safari2.webp" />
    <p>Clicca "Aggiungi"</p>
    <img src="../assets/download/safari3.webp" />
    <p>Fatto! Controlla nella schermata home!</p>
  </div>

  <div v-if="select.system === 'ANDROID'" class="install-container">
    <p>
      Clicca sul messaggio per installare l'app (se non compare prova a
      ricaricare la pagina)
    </p>
    <img src="../assets/download/chrome1.webp" />
    <p>Ora clicca "Installa"</p>
    <img src="../assets/download/chrome2.webp" />
    <p>In alternativa clicca sui tre puntini</p>
    <img src="../assets/download/chrome3.webp" />
    <p>E ora clicca su "Installa App"</p>
    <img src="../assets/download/chrome4.webp" />
    <p>Questo metodo va bene per la maggior parte dei browser</p>
  </div>
</template>

<style scoped>
p {
  font-family: "MinionPro";
  font-size: 24px;
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

.install-container {
  display: block;
  height: auto;
  padding: 0 7%;
}
</style>
