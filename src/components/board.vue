<script setup>
import { labels, type, rows, loadGame, saveGame, multiplier, loadNames, saveNames } from "../logic";
import { ref, watch } from "vue";
import numberMenu from "./number_selector.vue";
import toggleMenu from "./toggle_selector.vue";
import nameSelector from "./name_selector.vue";
import diceMenu from "./dice_selector.vue";
import axios from "axios";

var players = parseInt(localStorage.getItem("players")) + 1;
const playerNames = ref(loadNames());
const game = ref(loadGame());
const isNumberMenu = ref(0);
const isToggleMenu = ref(0);
const isShadow = ref(0);
const isNameMenu = ref(0);
const isDiceMenu = ref(0);
const currentValue = ref(0);

var yModified, xModified, playerName, playerIndex;

const score = ref([]);
for (var i = 0; i < players - 1; i++) {
  score.value.push(-1);
}

function openNumberMenu(y, x) {
  currentValue.value = game.value[y][x];
  isNumberMenu.value = 1;
  isShadow.value = 1;
  yModified = y;
  xModified = x;
}

function openToggleMenu(y, x) {
  isToggleMenu.value = 1;
  isShadow.value = 1;
  yModified = y;
  xModified = x;
}

function openNameMenu(player) {
  isNameMenu.value = 1;
  isShadow.value = 1;
  playerName = playerNames.value[player];
  playerIndex = player;
}

function openDiceMenu(y, x) {
  isDiceMenu.value = 1;
  isShadow.value = 1;
  yModified = y;
  xModified = x;
}

function confirmToggle(value) {
  game.value[yModified][xModified] = value;
  saveGame(game.value);
  isToggleMenu.value = 0;
  isShadow.value = 0;
}

function confirmNumber(value) {
  game.value[yModified][xModified] = value;
  saveGame(game.value);
  isNumberMenu.value = 0;
  isShadow.value = 0;
}

function confirmName(value) {
  playerNames.value[playerIndex] = value;
  saveNames(playerNames.value);
  isNameMenu.value = 0;
  isShadow.value = 0;
}

function confirmDice(value) {
  game.value[yModified][xModified] = value;
  saveGame(game.value);
  isDiceMenu.value = 0;
  isShadow.value = 0;
}

function computeScore(player) {
  var x = 0;
  for (var i = 1; i < rows - 1; i++) {
    if (type[i] != 3) {
      //solo se è punteggio
      if (game.value[player][i] == -1) {
        score.value[player] = -1;
        return;
      }
      //punteggio va moltiplicato in alcuni casi
      x += parseInt(game.value[player][i - 1]) * multiplier[i];
    }
  }
  score.value[player] = x;
  axios.post("https://api.lolloandr.com/recordscore", { score: x });
}
</script>

<template>
  <div class="board">
    <numberMenu
      @close="
        isNumberMenu = 0;
        isShadow = 0;
      "
      @confirm="confirmNumber"
      :currentValue="currentValue"
      v-if="isNumberMenu"
      class=""
    />
    <toggleMenu
      @close="
        isToggleMenu = 0;
        isShadow = 0;
      "
      @confirm="confirmToggle"
      v-if="isToggleMenu"
      class=""
    />
    <diceMenu
      @close="
        isDiceMenu = 0;
        isShadow = 0;
      "
      @confirm="confirmDice"
      :mul="xModified + 1"
      v-if="isDiceMenu"
      class=""
    />
    <nameSelector v-if="isNameMenu" :playerName="playerName" @confirm="confirmName" />
    <table :class="{ shadow: isShadow }">
      <tr v-for="x in rows">
        <th v-for="y in players">
          <b v-if="y - 1 == 0">{{ labels[x - 1] }}</b>
          <button :class="{ red: game[y - 2][x - 2] == -1 }" v-else-if="type[x - 1] == 1" @click="openToggleMenu(y - 2, x - 2)">
            <span v-if="game[y - 2][x - 2] == 0"> 0 </span>
            <span v-if="game[y - 2][x - 2] == 1"> X </span>
          </button>
          <button :class="{ red: game[y - 2][x - 2] == -1 }" v-else-if="type[x - 1] == 2" @click="openNumberMenu(y - 2, x - 2)">
            <span v-if="game[y - 2][x - 2] != -1">{{ game[y - 2][x - 2] }}</span>
          </button>
          <button :class="{ red: game[y - 2][x - 2] == -1 }" v-else-if="type[x - 1] == 4" @click="openDiceMenu(y - 2, x - 2)">
            <span v-if="game[y - 2][x - 2] != -1">{{ game[y - 2][x - 2] }}</span>
          </button>
          <b class="bigClick" @click="openNameMenu(y - 2)" v-else-if="type[x - 1] == 0"> {{ playerNames[y - 2] }} </b>
          <button @click="computeScore(y - 2)" v-else-if="type[x - 1] == 3">
            <span v-if="score[y - 2] == -1">Grand total</span>
            <span v-else>{{ score[y - 2] }}</span>
          </button>
        </th>
      </tr>
    </table>
  </div>
</template>

<style scoped>
span {
  margin: 0px;
}

.bigClick {
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 1em;
  margin: -1em;
}

b {
  font-weight: bold;
}

.red {
  background-color: #5577fa;
}

.shadow {
  transition: 0.5s;
  filter: brightness(0.5);
  filter: blur(0.5);
}
table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  background-color: #b7c4f7;
}

.menu {
  width: 100%;
  display: flex;
}

.board {
  width: 90vw;
  overflow-y: scroll;
}
@media only screen and (max-width: 600px) {
  .board {
    width: 100vw;
    overflow-y: scroll;
  }
}
</style>
