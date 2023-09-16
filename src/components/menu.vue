<script setup>
import { ref } from "vue";
import { initGame, saveNames } from "../logic";
import axios from "axios";
import crypto from "crypto-js";

const emit = defineEmits(["setPlayers"]);
const players = ref(2);
const previousGame = ref(0);

if (localStorage.getItem("players")) {
  previousGame.value = 1;
  players.value = localStorage.getItem("players");
}

const stats = ref(null);
const loading = ref(1);

async function getStats() {
  stats.value = await axios.get("https://api.lolloandr.com/stats", {}, { timeout: 3000 });
  loading.value = 0;
}
getStats();

async function ping() {
  let uid = "";
  if (!JSON.parse(localStorage.getItem("uid"))) {
    uid = crypto.MD5(new Date().valueOf().toString()).toString();
    localStorage.setItem("uid", JSON.stringify(uid));
  } else {
    uid = JSON.parse(localStorage.getItem("uid"));
  }
  axios.post(
    "https://api.lolloandr.com/ping",
    {
      uid: uid,
    },
    { timeout: 3000 }
  );
}
ping();

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
    <div class="stats" v-if="!loading">
      <h3>Statistics</h3>
      <table>
        <tr>
          <th style="font-weight: bold">Games Played</th>
          <th>{{ stats.data.game_played }}</th>
        </tr>
        <tr>
          <th style="font-weight: bold">Unique players</th>
          <th>{{ stats.data.unique_visitator }}</th>
        </tr>
        <tr>
          <th style="font-weight: bold">Average score</th>
          <th>{{ stats.data.average_score }}</th>
        </tr>
      </table>
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
  flex-direction: column;
}
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
