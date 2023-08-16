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

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
