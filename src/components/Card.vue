<template>
  <div class="w-fit flex flex-col cursor-pointer shadow-sm">
    <div class="aspect-[4/4] w-full overflow-hidden rounded-t-md bg-gray-100">
      <img :src="image" :alt="name" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col border border-t-0 rounded-b-md p-2 gap-y-5">
      <span class="font-medium text-secondary">{{ name }}</span>
      <span class="text-end text-secondary">$ {{ price.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
