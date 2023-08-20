<script setup>
import { ref } from "vue";
import { initGame, saveNames } from "../logic";

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
  var names = [];
  for (var i = 1; i <= players.value; i++) {
    names.push(i);
  }
  saveNames(names);
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
      <div style="margin-top: 2em"><h3>Insert number of player(s):</h3></div>
      <div>
        <button @click="decrease()">-</button>

        <button>{{ players }}</button>

        <button @click="players++">+</button>

        <button @click="setPlayers">Start!</button>
      </div>
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
.newgame {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu {
  width: 100%;
  display: flex;
}
</style>
