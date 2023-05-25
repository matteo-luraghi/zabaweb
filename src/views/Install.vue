<script setup lang="ts">
import { reactive } from "vue";
const select = reactive({
  system: "",
});
</script>

<template>
  <h1 class="header">DOWNLOAD</h1>
  <div class="container">
    <p>Seleziona il tuo sistema operativo</p>
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

  <div v-if="select.system === 'IOS'" class="container">
    <p>
      Apri il link su safari (su altri browser non è possibile installare l'app)
      e clicca sul pulsante "condividi"
    </p>
    <img
      src="https://drive.google.com/file/d/1UUkmgWbcv-L1RK4Xxm0b7KKmaSmzYR9g/preview"
    />
    <p>Clicca "Aggiungi alla schermata Home"</p>
    <img
      src="https://drive.google.com/file/d/1qRl9mIpmPJF4eLVcLMwX1htUxxqoWoaN/preview"
    />
    <p>Clicca "Aggiungi"</p>
    <img
      src="https://drive.google.com/file/d/1HHgJw7alCAfLitQ3cmmXBnzPHE7-rDvf/preview"
    />
    <p>Fatto! Controlla nella schermata home!</p>
  </div>

  <div v-if="select.system === 'ANDROID'" class="container">
    <p>Su Chrome dovrebbe uscire un messaggio per installare l'app, cliccalo</p>
    <img
      src="https://drive.google.com/file/d/18Ks_ES9n5gVQeFF5R6GmjDkkjDK7sY1v/preview"
    />
    <p>Ora clicca "Installa"</p>
    <img
      src="https://drive.google.com/file/d/108KGxq9YAxW64pX57kbqwA6-RL6v7XiI/preview"
    />
    <p>In alternativa clicca sui tre puntini</p>
    <img
      src="https://drive.google.com/file/d/19ZrwVy51wV1N49PGubPH-Nh1Fpho-xPj/preview"
    />
    <p>E ora clicca su "Installa App"</p>
    <img
      src="https://drive.google.com/file/d/1zqzwq9SEmVA0xBLHnP1g8lp4UW7nKP6x/preview"
    />
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
  max-width: 60%;
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
