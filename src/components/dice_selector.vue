<script setup>
import { ref } from "vue";
const props = defineProps(["mul"]);

const x = ref(5);
</script>

<template>
  <div class="popup">
    <div class="row">
      <button style="background-color: #ff0000" @click="$emit('confirm', 0)">0</button>
      <button style="background-color: #d03800" @click="$emit('confirm', mul)">{{ mul }}</button>
      <button style="background-color: #ff9c01" @click="$emit('confirm', mul * 2)">{{ mul * 2 }}</button>
    </div>
    <div class="row">
      <button style="background-color: #ffbf00" @click="$emit('confirm', mul * 3)">{{ mul * 3 }}</button>
      <button style="background-color: #63b900" @click="$emit('confirm', mul * 4)">{{ mul * 4 }}</button>
      <button style="background-color: #1aa400" @click="$emit('confirm', mul * 5)">{{ mul * 5 }}</button>
    </div>
    <div class="row">
      <button @click="$emit('close')">Close</button>
      <button class="red" @click="$emit('confirm', -1)">Delete</button>
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
