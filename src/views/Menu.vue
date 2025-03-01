<template>
  <section>
    <div class="fixed max-w-[85rem] w-full lg:top-[4.568rem] top-[4.5rem] z-40 border-b">
      <Search v-model="searchQuery" />
    </div>
    <div class="fixed max-w-[85rem] w-full lg:top-[7.4063rem] top-[7.4rem] z-40 bg-white">
      <Category :filteredFoodData="filteredFoodData" />
    </div>
    <div class="pt-36 md:pt-40">
      <div v-if="!filteredFoodData.length" class="w-full flex justify-center items-center h-[60vh]">
        <el-empty :image-size="200" description="No data available" />
      </div>

      <div v-for="data in filteredFoodData" :key="data.id">
        <Heading :title="data.category" :data-category="data.category" />
        <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 my-2 2xl:mx-0 mx-1">
          <Card
            v-for="item in data.items"
            :key="item.name"
            :name="item.name"
            :price="item.price"
            :image="item.image"
            @click="openDialog(item)"
          />
        </div>
      </div>
      <!-- Dialog for Desktop -->
      <div class="hidden sm:block">
        <el-dialog
          v-model="centerDialogVisible"
          width="500"
          align-center
          close-icon="none"
          lock-scroll
          @close="handleClose"
        >
          <div v-if="selectedItem" class="flex flex-col zoom-dialog">
            <ItemDialog
              :selectedItem="selectedItem"
              :allItems="allItems"
              :currentIndex="currentIndex"
              :handleClose="handleClose"
              @updateSelectedItem="updateSelectedItem"
              @updateCurrentIndex="updateCurrentIndex"
            />
          </div>
          <template #footer>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">
                $ {{ selectedItem ? selectedItem.price.toFixed(2) : '0.00' }}
              </h2>
              <el-button type="primary" size="large" @click="handleAddToCart(selectedItem)">
                <el-icon size="24" class="mr-1.5">
                  <ShoppingCart />
                </el-icon>
                Add
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- Dialog for Mobile -->
      <div class="sm:hidden block">
        <el-dialog
          v-model="centerDialogVisible"
          width="500"
          align-center
          close-icon="none"
          lock-scroll
          @close="handleClose"
          style="margin-left: 10px; margin-right: 10px"
        >
          <div v-if="selectedItem" class="flex flex-col zoom-dialog">
            <ItemDialog
              :selectedItem="selectedItem"
              :allItems="allItems"
              :currentIndex="currentIndex"
              :handleClose="handleClose"
              @updateSelectedItem="updateSelectedItem"
              @updateCurrentIndex="updateCurrentIndex"
            />
          </div>
          <template #footer>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">
                $ {{ selectedItem ? selectedItem.price.toFixed(2) : '0.00' }}
              </h2>
              <el-button type="primary" size="large" @click="handleAddToCart(selectedItem)">
                <el-icon size="24" class="mr-1.5">
                  <ShoppingCart />
                </el-icon>
                Add
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ShoppingCart } from '@element-plus/icons-vue';

import { useMenu } from '@/composable/useMenu';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Heading from '@/components/Heading.vue';
import Card from '@/components/Card.vue';
import ItemDialog from '@/components/ItemDialog.vue';

const {
  getFoodData,
  filteredFoodData,
  searchQuery,
  centerDialogVisible,
  selectedItem,
  allItems,
  currentIndex,
  openDialog,
  handleClose,
  handleAddToCart,
  updateSelectedItem,
  updateCurrentIndex,
} = useMenu();

onMounted(() => {
  getFoodData();
});
</script>

<style scoped>
:deep(.el-dialog__header) {
  --el-dialog-padding-primary: 0 !important;
}

.el-divider--horizontal {
  margin: 12px 0 !important;
}

.el-button {
  font-size: 16px;
  padding-right: 14px;
  padding-left: 14px;
}

.zoom-dialog {
  touch-action: none;
}

:deep(.el-empty__description) {
  --el-font-size-base: 20px;
}
</style>
