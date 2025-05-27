<template>
  <div class="custom-style w-full select-none flex flex-row items-center">
    <el-button style="border: none; background-color: white" @click="prevPage" :disabled="currentPage === 1">
      <el-icon size="20">
        <ArrowLeftBold />
      </el-icon>
    </el-button>

    <el-segmented v-model="selectedCategory" @change="navigateToCategory" :options="paginatedCategories" block
      class="flex-grow" />

    <el-button @click="nextPage" style="border: none; background-color: white" :disabled="currentPage === totalPages">
      <el-icon size="20">
        <ArrowRightBold />
      </el-icon>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import type { FoodCategory } from '@/models/Menu';
import { debounce } from '@/composable/commonHelper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  filteredFoodData: {
    type: Array,
    required: true,
  },
});

const selectedCategory = ref('');
const itemsPerPage = ref(0);
const currentPage = ref(1);
const categories = ref<string[]>([]);

watch(
  () => props.filteredFoodData,
  (newData) => {
    categories.value = [
      ...new Set((newData as FoodCategory[]).map((item: FoodCategory) => item.category)),
    ];
    selectedCategory.value = categories.value[0] || '';
  },
  { immediate: true }
);

const totalPages = computed(() => Math.ceil(categories.value.length / itemsPerPage.value));

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return categories.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const navigateToCategory = (value: string) => {
  const categoryElement = document.querySelector(`[data-category="${value}"]`);
  if (categoryElement) {
    const offset = window.innerWidth >= 1024 ? 155 : 140;
    const elementPosition = categoryElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const updateVisibleCategoryOnScroll = debounce(() => {
  const categoryElements = Array.from(document.querySelectorAll('[data-category]'));
  const offset = window.innerWidth >= 1024 ? 155 : 140;

  for (const element of categoryElements) {
    const rect = element.getBoundingClientRect();
    const adjustedTop = rect.top - offset;

    if (adjustedTop >= 0 && adjustedTop <= window.innerHeight / 2) {
      selectedCategory.value = element.getAttribute('data-category') as string;
      break;
    }
  }
}, 50);

const updateItemsPerPage = () => {
  const container = document.querySelector('.custom-style');
  if (!container) return;

  const containerWidth = container.clientWidth;
  const itemWidth = 140;
  itemsPerPage.value = Math.floor(containerWidth / itemWidth);

  const selectedCategoryIndex = categories.value.indexOf(selectedCategory.value);
  const totalVisibleItems = itemsPerPage.value;

  currentPage.value = Math.floor(selectedCategoryIndex / totalVisibleItems) + 1;

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

watch(selectedCategory, () => {
  updateItemsPerPage();
});

onMounted(() => {
  updateItemsPerPage();
  window.addEventListener('resize', updateItemsPerPage);
  window.addEventListener('scroll', updateVisibleCategoryOnScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsPerPage);
  window.removeEventListener('scroll', updateVisibleCategoryOnScroll);
});
</script>

<style scoped>
.custom-style .el-segmented {
  --el-segmented-item-selected-bg-color: white;
  --el-segmented-bg-color: white;
  --el-segmented-item-hover-bg-color: #f6f6f6;
  height: 40px;
  font-size: 15px;
  color: black;
}

:deep(.el-segmented__item.is-selected) {
  color: black;
  background-color: #f6f6f6;
  font-weight: 600;
  border-bottom: 2px solid black;
  position: relative;
}

.el-button {
  --el-button-hover-text-color: none;
}
</style>
