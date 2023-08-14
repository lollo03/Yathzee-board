<script setup>
import { ref } from "vue";
const x = ref(-1);
</script>

<template>
  <div class="popup">
    <div class="row">
      <button @click="$emit('confirm', 1)">Yes</button>
      <button @click="$emit('confirm', -1)">No</button>
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

.popup {
  background-color: white;
  width: fit-content;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (prefers-color-scheme: dark) {
  .popup {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
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
</style>
