<template>
  <div class="flex flex-row justify-between w-full items-center">
    <h2 class="flex-grow text-center -mr-[2.5rem] text-xl font-medium">
      {{ selectedItem.name }}
    </h2>
    <el-button type="info" size="large" @click="handleClose">
      <el-icon size="16"><CloseBold /></el-icon>
    </el-button>
  </div>
  <el-divider />
  <div class="relative flex items-center justify-center w-full">
    <el-button
      class="absolute sm:-left-[5rem] -left-[1rem]"
      style="border: none; background-color: #bebebe"
      round
      size="large"
      @click="prevItem"
      :disabled="currentIndex === 0"
    >
      <el-icon color="white"> <ArrowLeftBold /> </el-icon>
    </el-button>
    <img
      :src="selectedItem.image"
      :alt="selectedItem.name"
      class="sm:min-h-[29rem] min-h-[23rem] w-[99%] object-scale-down rounded-md select-none"
    />
    <el-button
      class="absolute sm:-right-[5rem] -right-[1rem]"
      style="border: none; background-color: #bebebe"
      round
      size="large"
      @click="nextItem"
      :disabled="currentIndex === allItems.length - 1"
    >
      <el-icon color="white">
        <ArrowRightBold />
      </el-icon>
    </el-button>
  </div>
  <el-divider />
</template>

<script lang="ts" setup>
import type { FoodItem } from '@/models/Menu';
import { CloseBold, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';

const props = defineProps({
  selectedItem: {
    type: Object as () => FoodItem,
    required: true,
  },
  allItems: {
    type: Array as () => FoodItem[],
    required: true,
  },
  currentIndex: {
    type: Number,
    required: true,
  },
  handleClose: {
    type: Function,
    required: true,
  },
});

const currentIndex = ref(props.currentIndex);
const allItems = ref(props.allItems);
const selectedItem = ref(props.selectedItem);

const emit = defineEmits(['updateSelectedItem', 'updateCurrentIndex']);

watch(
  [() => props.selectedItem, () => props.currentIndex],
  ([newSelectedItem, newCurrentIndex]) => {
    selectedItem.value = newSelectedItem;
    currentIndex.value = newCurrentIndex;
  },
  { immediate: true }
);

const nextItem = () => {
  if (currentIndex.value < allItems.value.length - 1) {
    currentIndex.value++;
    emit('updateCurrentIndex', currentIndex.value);
    emit('updateSelectedItem', allItems.value[currentIndex.value]);
    selectedItem.value = allItems.value[currentIndex.value];
  }
};

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    emit('updateCurrentIndex', currentIndex.value);
    emit('updateSelectedItem', allItems.value[currentIndex.value]);
    selectedItem.value = allItems.value[currentIndex.value];
  }
};
</script>

<style scoped>
.el-divider--horizontal {
  margin: 12px 0 !important;
}

.el-button {
  font-size: 16px;
  padding-right: 14px;
  padding-left: 14px;
}
</style>
