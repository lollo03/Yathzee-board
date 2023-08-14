<script setup>
import { ref } from "vue";
const props = defineProps(["playerName"]);
const x = ref(props.playerName);
</script>

<template>
  <div class="popup">
    <div class="row">
      <input type="text" v-model="x" />
    </div>
    <div class="row">
      <button @click="$emit('confirm', x)">Confirm</button>
    </div>
  </div>
</template>

<style scoped>
input {
  margin: 5px 10px;
  border-color: #622f8a;
  border-radius: 5px;
  font-size: 25px;
}

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
  background-color: #622f8a; /* Green */
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
  transform: scale(1.2);
}
</style>
