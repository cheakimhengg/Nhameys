<template>
  <section v-loading="isLoading">
    <MenuNavbar v-if="!isLoading" />
    <div class="fixed max-w-[85rem] w-full lg:top-[4.568rem] top-[4.5rem] z-40 border-b">
      <Search v-model="searchQuery" />
    </div>
    <div class="fixed max-w-[85rem] w-full lg:top-[7.4063rem] top-[7.4rem] z-40 bg-white">
      <Category :filteredFoodData="filteredFoodData" />
    </div>
    <div class="pt-40">
      <div v-if="!filteredFoodData.length" class="w-full flex justify-center items-center h-[80vh]">
        <el-empty :image-size="200" :description="t('noData')" />
      </div>
      <div v-for="data in filteredFoodData" :key="data.id">
        <Heading :title="data.category" :data-category="data.category" />
        <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 my-2 2xl:mx-0 mx-1">
          <Card v-for="item in data.items" :key="item.name" :name="item.name" :price="item.price" :image="item.image"
            @click="openDialog(item)" />
        </div>
      </div>
      <!-- Dialog for Desktop -->
      <div class="hidden sm:block">
        <el-dialog v-if="selectedItem" v-model="centerDialogVisible" width="500" align-center close-icon="none"
          lock-scroll @close="handleClose">
          <div class="flex flex-col zoom-dialog">
            <ItemDialog :selectedItem="selectedItem" :allItems="allItems" :currentIndex="currentIndex"
              :handleClose="handleClose" @updateSelectedItem="updateSelectedItem"
              @updateCurrentIndex="updateCurrentIndex" />
          </div>
          <template #footer>
            <div class="flex justify-between items-center text-secondary">
              <h2 class="text-xl font-medium">
                $ {{ selectedItem ? selectedItem.price.toFixed(2) : '0.00' }}
              </h2>
              <el-button type="primary" size="large" @click="handleAddToCart(selectedItem)">
                <el-icon size="24" class="mr-1.5">
                  <ShoppingCart />
                </el-icon>
                {{ t('add') }}
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- Dialog for Mobile -->
      <div class="sm:hidden block">
        <el-dialog v-if="selectedItem" v-model="centerDialogVisible" width="500" align-center close-icon="none"
          lock-scroll @close="handleClose" style="margin-left: 10px; margin-right: 10px">
          <div class="flex flex-col zoom-dialog">
            <ItemDialog :selectedItem="selectedItem" :allItems="allItems" :currentIndex="currentIndex"
              :handleClose="handleClose" @updateSelectedItem="updateSelectedItem"
              @updateCurrentIndex="updateCurrentIndex" />
          </div>
          <template #footer>
            <div class="flex justify-between items-center text-secondary">
              <h2 class="text-xl font-medium">
                $ {{ selectedItem ? selectedItem.price.toFixed(2) : '0.00' }}
              </h2>
              <el-button type="primary" size="large" @click="handleAddToCart(selectedItem)">
                <el-icon size="24" class="mr-1.5">
                  <ShoppingCart />
                </el-icon>
                {{ t('add') }}
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    <Footer v-if="!isLoading && filteredFoodData.length" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ShoppingCart } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { useMenu } from '@/composable/useMenu';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Heading from '@/components/Heading.vue';
import Card from '@/components/Card.vue';
import ItemDialog from '@/components/ItemDialog.vue';
import MenuNavbar from '@/components/MenuNavbar.vue';
import Footer from '@/components/Footer.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const {
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
  isLoading,
  getFoodByWebId,
} = useMenu();

const route = useRoute();

onMounted(async () => {
  const username = route.params.restaurant as string;
  await getFoodByWebId(username);
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
