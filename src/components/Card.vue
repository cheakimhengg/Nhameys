<template>
  <div class="w-fit flex flex-col cursor-pointer">
    <img
      :src="image"
      :alt="name"
      class="border rounded-t-md xl:min-h-[20.5rem] md:min-h-[11.5rem] min-h-[12.8rem] h-full object-scale-down"
    />
    <div class="flex flex-col border border-t-0 rounded-b-md p-1.5 gap-y-5">
      <span class="font-medium">{{ name }}</span>
      <span class="text-end text-[#afafaf]">$ {{ price.toFixed(2) }}</span>
    </div>
  </div>
</template>
a
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
