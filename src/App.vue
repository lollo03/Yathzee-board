<script setup>
import top from "./components/top.vue";
import board from "./components/board.vue";
import gamemenu from "./components/menu.vue";
import { ref } from "vue";

const isplayerset = ref(0);

function setPlayers() {
  isplayerset.value = 1;
}
</script>

<template>
  <div class="container">
    <div>
      <top style="text-align: center" />
    </div>
    <br />
    <div>
      <gamemenu v-if="isplayerset == 0" @setPlayers="setPlayers()" />
    </div>
    <br />
    <div>
      <board v-if="isplayerset == 1" />
    </div>
    <div>
      <br />
      <small>Questo sito per funzionare utilizza il <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a> ma nessun cookie!</small>
      <br />
      <hr />
      <small>Creato con &hearts; da Lorenzo Andreasi</small>
      (<a href="https://github.com/lollo03">GitHub</a>, <a href="https://lollo03.github.io">Portfolio</a>). <br />
      <small class="text-muted">Copyleft &#127279; Lorenzo Andreasi, 2023. <i>Some rights reserved.</i></small> <br />
    </div>
  </div>
</template>

<style>
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media (prefers-color-scheme: dark) {
  th,
  td {
    background-color: #38428a !important;
  }
  .container {
    background-color: black;
    color: white;
  }
}
</style>
