<template>
  <section id="navbar">
    <div
      class="hidden lg:flex justify-between items-center border-b-2 py-0.5 px-1 shadow fixed top-0 left-0 w-full z-50 bg-white"
    >
      <div class="flex flex-row items-center gap-2 ml-4">
        <a href="/">
          <img :src="logo" alt="Nhamey Logo" class="h-[4.2rem] w-[4.2rem]" />
        </a>
        <div class="flex flex-col">
          <span class="text-xl font-semiboldtracking-normal">Nhamey</span>
          <el-tag effect="dark" round type="info">Closed</el-tag>
        </div>
      </div>
      <div class="flex items-center gap-x-2 text-[1.05rem] pr-4 select-none">
        <el-dropdown trigger="click">
          <span class="text-[1.05rem] text-black flex items-center gap-1">
            General
            <el-icon :size="12">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item disabled>Action 2</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button style="border: none; background-color: white" @click="handleCartClick">
          <el-icon color="black" size="30"><ShoppingCart /></el-icon>
        </el-button>
        <CartDrawer v-model:drawer="drawer" :handleCartClose="handleCartClose" />
      </div>
    </div>

    <!-- Mobile screen -->
    <div
      class="lg:hidden flex justify-between items-center border-b-2 py-0.5 px-1 shadow fixed top-0 left-0 w-full z-50 bg-white"
    >
      <div class="flex flex-row items-center gap-2">
        <a href="/">
          <img :src="logo" alt="Nhamey Logo" class="h-[4.2rem] w-[4.2rem]" />
        </a>
        <div class="flex flex-col">
          <span class="text-xl tracking-normal">Nhamey</span>
          <el-tag effect="dark" round type="info">Closed</el-tag>
        </div>
      </div>

      <div class="flex items-center text-[1.05rem] pr-4 select-none">
        <el-button style="border: none; background-color: white" @click="handleCartClick">
          <el-icon color="black" size="30"><ShoppingCart /></el-icon>
        </el-button>
        <CartDrawer v-model:drawer="drawer" :handleCartClose="handleCartClose" />
        <el-dropdown trigger="click">
          <el-icon size="30"> <img class="h-8 invert" :src="menu" /></el-icon>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item disabled>Action 2</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowDown, ShoppingCart } from '@element-plus/icons-vue';
import { ref } from 'vue';
import CartDrawer from '@/components/CartDrawer.vue';
import menu from '@/assets/icons/menu.png';
import logo from '@/assets/images/logo.png';

const drawer = ref(false);

const handleCartClick = () => {
  drawer.value = true;
};

const handleCartClose = () => {
  drawer.value = false;
};
</script>

<style scoped>
.el-button {
  --el-button-hover-text-color: none;
}
</style>
