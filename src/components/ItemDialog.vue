<template>
  <div class="flex flex-row justify-between w-full items-center">
    <h2 class="flex-grow text-center -mr-[2.5rem] text-xl font-medium">
      {{ selectedItem.name }}
    </h2>
    <el-button type="info" size="large" @click="handleClose">
      <el-icon size="16">
        <CloseBold />
      </el-icon>
    </el-button>
  </div>
  <el-divider />
  <div class="relative flex items-center justify-center w-full">
    <el-button class="absolute sm:-left-[5rem] -left-[1rem]" style="border: none; background-color: #bebebe" round
      size="large" @click="prevItem" :disabled="currentIndex === 0">
      <el-icon color="white">
        <ArrowLeftBold />
      </el-icon>
    </el-button>
    <div class="flex justify-center items-center w-full py-4">
      <img :src="selectedItem.image" :alt="selectedItem.name"
        class="w-full max-w-[500px] max-h-[400px] object-contain mb-2" />
    </div>
    <el-button class="absolute sm:-right-[5rem] -right-[1rem]" style="border: none; background-color: #bebebe" round
      size="large" @click="nextItem" :disabled="currentIndex === allItems.length - 1">
      <el-icon color="white">
        <ArrowRightBold />
      </el-icon>
    </el-button>
  </div>
  <div class="description-text">
    {{ selectedItem.description || t('noDescription') }}
  </div>
  <el-divider />
</template>

<script lang="ts" setup>
import type { FoodItem } from '@/models/Menu';
import { CloseBold, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

.description-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  padding: 1.25rem 1.5rem 1.5rem 1.5rem;
  margin-bottom: 1.25rem;
  max-width: 38rem;
  width: 100%;
  text-align: left;
}

.description-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
}

.description-text {
  font-size: 1.05rem;
  color: #6b7280;
  line-height: 1.6;
}
</style>
