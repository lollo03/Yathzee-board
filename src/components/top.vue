<template>
  <div>
    <div class="center">
      <h1 class="title">Yahtzee!</h1>
    </div>
    <p>A simple interactive Yahtzee sheet.</p>
  </div>
</template>

<style scoped>
.title {
  transition: 1s;
}

.title:hover {
  color: orange;
  filter: hue-rotate(360deg);
  transform: scale(1.2);
}

.center {
  text-align: center;
}
</style>
