<script setup>
import { ref } from "vue";
const x = ref(-1);
</script>

<template>
  <div class="popup">
    <div class="row">
      <button style="background-color: #1aa400" @click="$emit('confirm', 1)">Yes</button>
      <button style="background-color: #ffbf00" @click="$emit('confirm', -1)">No</button>
    </div>
    <div class="row">
      <button @click="$emit('close')">Close</button>
      <button class="red" @click="$emit('confirm', 0)">0</button>
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
