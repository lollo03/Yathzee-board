<script setup>
import { ref } from "vue";
const props = defineProps(["currentValue"]);

const x = ref(5);
if (props.currentValue != -1) {
  x.value = props.currentValue;
}
function reduce() {
  if (x.value == 0) {
    return;
  }
  x.value--;
}
function reduce10() {
  if (x.value <= 10) {
    x.value = 0;
    return;
  }
  x.value -= 10;
}

function increase10() {
  if (x.value + 10 > 30) {
    x.value = 30;
    return;
  }
  x.value += 10;
}
</script>

<template>
  <div class="popup">
    <div class="row">
      <button @click="reduce10()">-10</button>
      <button @click="reduce()">-</button>
      <h1>{{ x }}</h1>
      <button @click="x++">+</button>
      <button @click="increase10()">+10</button>
    </div>
    <div class="row">
      <button @click="$emit('close')">Close</button>
      <button class="red" @click="$emit('confirm', -1)">Delete</button>
      <button style="background-color: #1aa400" @click="$emit('confirm', x)">Confirm</button>
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
