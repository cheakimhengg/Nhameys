<template>
  <div class="bg-[#f6f6f6] text-2xl font-semibold px-3">
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
