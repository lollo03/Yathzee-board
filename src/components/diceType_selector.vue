<script setup>
import { ref } from "vue";
const props = defineProps(["mul"]);
const mulMod = ref(props.mul - 4);
</script>

<template>
  <div class="popup">
    <div class="row">
      <button style="background-color: #ff0000" @click="$emit('confirm', mulMod)">{{ mulMod }}</button>
      <button style="background-color: #d03800" @click="$emit('confirm', mulMod * 2)">{{ mulMod * 2 }}</button>
      <button style="background-color: #ff9c01" @click="$emit('confirm', mulMod * 3)">{{ mulMod * 3 }}</button>
    </div>
    <div class="row">
      <button style="background-color: #ffbf00" @click="$emit('confirm', mulMod * 4)">{{ mulMod * 4 }}</button>
      <button style="background-color: #63b900" @click="$emit('confirm', mulMod * 5)">{{ mulMod * 5 }}</button>
      <button style="background-color: #1aa400" @click="$emit('confirm', mulMod * 6)">{{ mulMod * 6 }}</button>
    </div>
    <div class="row">
      <button style="background-color: #ff0000" @click="$emit('confirm', 0)">{{ 0 }}</button>
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
