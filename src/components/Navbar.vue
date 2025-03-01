<template>
  <nav class="flex items-center justify-between px-12 py-4 bg-white shadow-md">
    <div class="flex items-center gap-x-3">
      <img :src="logo" alt="Nhamey Logo" class="h-12 w-12" />
      <h1 class="text-primary font-semibold text-xl tracking-wide">Nhamey</h1>
    </div>
    <ul class="flex space-x-10 font-medium text-secondary">
      <li>
        <a
          class="transition-all duration-200 hover:text-primary hover:underline"
          href="#how-it-works"
        >
          How It Works
        </a>
      </li>
      <li>
        <a class="transition-all duration-200 hover:text-primary hover:underline" href="#benefits">
          Benefits
        </a>
      </li>
      <li>
        <a
          class="transition-all duration-200 hover:text-primary hover:underline"
          href="#testimonials"
        >
          Testimonials
        </a>
      </li>
      <li>
        <a class="transition-all duration-200 hover:text-primary hover:underline" href="#faqs">
          FAQs
        </a>
      </li>
      <li>
        <a class="transition-all duration-200 hover:text-primary hover:underline" href="#features">
          Features
        </a>
      </li>
    </ul>
    <div class="flex items-center space-x-4">
      <el-button size="large" text> Contact Us </el-button>
      <el-button size="large" type="primary" class="px-6 py-3"> Get Started </el-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';
</script>
