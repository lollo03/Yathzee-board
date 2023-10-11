<script setup>
const props = defineProps(["name", "value", "loading"]);
</script>

<template>
  <div>
    <h3>{{ name }}</h3>
    <h2 class="animate">{{ value }}</h2>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.animate {
  animation-duration: 0.8s;
  animation-name: animation;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
}

@keyframes animation {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
