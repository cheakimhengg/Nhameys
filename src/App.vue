<template>
  <MenuNavbar v-if="route.fullPath.includes('menu')" />
  <Navbar v-else />
  <div class="mx-auto max-w-[85rem] sm:min-h-[79vh] min-h-[70vh]">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import MenuNavbar from './components/MenuNavbar.vue';

const route = useRoute();
</script>
