<script setup>
import { ref } from "vue";
import { initGame } from "../logic";

const emit = defineEmits(["setPlayers"]);
const players = ref(2);
const previousGame = ref(0);

if (localStorage.getItem("players")) {
  previousGame.value = 1;
  players.value = localStorage.getItem("players");
}

function decrease() {
  if (players.value == 1) {
    return;
  }
  players.value--;
}
function setPlayers() {
  localStorage.setItem("players", players.value);
  localStorage.setItem("game", null);
  initGame(players.value);
  emit("setPlayers");
}
function reset() {
  previousGame.value = 0;
  localStorage.setItem("game", null);
}

function loadGame() {
  emit("setPlayers");
}
</script>

<template>
  <div class="menu">
    <div class="newgame" v-if="previousGame == 0">
      <button @click="decrease()">-</button>

      <button>{{ players }}</button>

      <button @click="players++">+</button>

      <button @click="setPlayers">Start!</button>
    </div>
    <div class="oldgame" v-else>
      <button @click="loadGame">Resume previous game</button>
      <button @click="reset()">Start new game</button>
    </div>
  </div>
</template>

<style>
table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
}
th,
td {
  background-color: #96d4d4;
}
button {
  background-color: green; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
  transition: 500ms;
}
button:hover {
  filter: hue-rotate(90deg);
  transform: scale(1.2);
}
.menu {
  width: 100%;
  display: flex;
}
</style>
