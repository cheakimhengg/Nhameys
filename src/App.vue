<template>
  <!-- <Navbar v-if="route.path === '/'" /> -->
  <div class="mx-auto max-w-[85rem] sm:min-h-[79vh] min-h-[70vh]">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
// import Navbar from './components/Navbar.vue';

// const route = useRoute();
</script>
