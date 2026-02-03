<script setup>
import NavBar from './components/NavBar.vue';

</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
  </main>
  <footer>
    <h2>Контакты</h2>
    <p>Email: <a href="mailto:pavelvini90@gmail.com">pavelvini90@gmail.com</a></p>
  </footer>
</template>

<style lang="css" scoped>
/* 1. Define the active transition state and duration */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

/* 2. Define the starting opacity for entering, and ending opacity for leaving */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
