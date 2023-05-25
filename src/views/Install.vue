<template>
  <h1 class="header">DOWNLOAD</h1>
  <div class="container">
    <p>Seleziona il tuo sistema operativo</p>
    <button class="button system-button" @click="select.system = 'ANDROID'">
      ANDROID
    </button>
    <button class="button system-button" @click="select.system = 'IOS'">
      IOS
    </button>
  </div>

  <div v-if="select.system === 'IOS'" class="container">
    <p>
      Apri il link su safari (su altri browser non è possibile installare l'app)
      e clicca sul pulsante "condividi"
    </p>
    <img src="../assets/download/safari1.webp" />
    <p>Clicca "aggiungi alla schermata Home"</p>
    <img src="../assets/download/safari2.webp" />
    <p>Clicca "Aggiungi"</p>
    <img src="../assets/download/safari3.webp" />
    <p>Fatto! Controlla nella schermata home!</p>
  </div>

  <div v-if="select.system === 'ANDROID'" class="container">
    <p>Su Chrome dovrebbe uscire un messaggio per installare l'app, cliccalo</p>
    <img src="../assets/download/chrome1.webp" />
    <p>Ora clicca "Installa"</p>
    <img src="../assets/download/chrome2.webp" />
    <p>In alternativa clicca sui tre puntini</p>
    <img src="../assets/download/chrome3.webp" />
    <p>E ora clicca su "Installa App"</p>
    <p>Questo metodo va bene per la maggior parte dei browser</p>
    <img src="../assets/download/chrome4.webp" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const select = reactive({
  system: "",
});
</script>

<style scoped>
p {
  font-family: "MinionPro";
  font-size: medium;
}
.system-button {
  height: 50px;
  display: flex;
  letter-spacing: 1px;
  margin-right: 10px;
  background-color: #303030;
  align-items: center;
  border: 1px solid #303030;
  border-radius: 15px;
  color: #e0e0e0;
  cursor: pointer;
  font-weight: 600;
  max-width: 60%;
  text-size-adjust: 80%;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;
  box-sizing: border-box;
  width: 90px;
}

.system-button:active {
  background-color: #e0e0e0;
  color: #303030;
}
</style>
