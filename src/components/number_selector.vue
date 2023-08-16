<script setup>
import { ref } from "vue";
const x = ref(5);

function reduce() {
  if (x.value == -1) {
    return;
  }
  x.value--;
}
function reduce10() {
  if (x.value <= 9) {
    return;
  }
  x.value -= 10;
}
</script>

<template>
  <div class="popup">
    <div class="row">
      <button @click="reduce10()">-10</button>
      <button @click="reduce()">-</button>
      <h1>{{ x }}</h1>
      <button @click="x++">+</button>
      <button @click="x += 10">+10</button>
    </div>
    <div class="row">
      <button @click="$emit('close')">Close</button>
      <button class="red" @click="x = -1">Delete</button>
      <button @click="$emit('confirm', x)">Confirm</button>
    </div>
  </div>
</template>

<style scoped>
.red {
  background-color: red;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
