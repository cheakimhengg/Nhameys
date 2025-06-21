<template>
  <section id="navbar">
    <div
      class="hidden lg:flex justify-between items-center border-b-2 py-0.5 px-1 shadow fixed top-0 left-0 w-full z-50 bg-white">
      <div class="flex flex-row items-center gap-2 ml-4">
        <img :src="logo" alt="Nhamey Logo" class="h-[4.2rem] w-[4.2rem]" />
        <div class="flex flex-col">
          <span class="text-xl font-medium tracking-normal text-secondary">{{ t('menu') }}</span>
          <el-tag v-if="tableNumber" effect="dark" round type="success">
            Table: {{ tableNumber }}
          </el-tag>
          <el-tag v-else effect="dark" round type="info">{{ t('closed') }}</el-tag>
        </div>
      </div>
      <div class="flex items-center gap-x-2 text-[1.05rem] pr-4 select-none">
        <el-dropdown class="pr-2" @command="changeLanguage" trigger="click">
          <img :src="currentFlag" class="w-8 h-6 object-cover  border border-gray-300 cursor-pointer" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">
                <img :src="enFlag" class="w-8 h-6 object-cover  border border-gray-300" />
              </el-dropdown-item>
              <el-dropdown-item command="km">
                <img :src="kmFlag" class="w-8 h-6 object-cover  border border-gray-300" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click">
          <span class="text-[1.05rem] text-black flex items-center gap-1">
            {{ t('general') }}
            <el-icon :size="12">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>{{ t('action1') }}</el-dropdown-item>
              <el-dropdown-item disabled>{{ t('action2') }}</el-dropdown-item>
              <el-dropdown-item divided>{{ t('action5') }}</el-dropdown-item>
              <el-dropdown-item @click="openOrderHistoryDialog">View Orders</el-dropdown-item>
              <el-dropdown-item @click="openCurrentOrderDialog">{{ t('checkCurrentOrder') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          style="border: none; background-color: white"
          @click="openCurrentOrderDialog()"
          :title="t('checkCurrentOrder')"
          class="hover:bg-gray-50 transition-colors duration-200"
        >
          <el-icon color="black" size="24">
            <Document />
          </el-icon>
        </el-button>
        <el-button style="border: none; background-color: white" @click="handleCartOpen()">
          <el-icon color="black" size="30">
            <ShoppingCart />
          </el-icon>
        </el-button>
        <CartDrawer v-model:drawer="drawer" :handleCartClose="handleCartClose" />
        <OrderHistoryDialog
          :visible="orderHistoryDialogVisible"
          :onClose="closeOrderHistoryDialog"
          :tableId="route.params.id as string"
          :username="route.params.restaurant as string"
        />
        <CurrentOrderDialog
          :visible="currentOrderDialogVisible"
          :onClose="closeCurrentOrderDialog"
          :tableId="tableNumber"
          :username="route.params.restaurant as string"
        />
      </div>
    </div>

    <!-- Mobile screen -->
    <div
      class="lg:hidden flex justify-between items-center border-b-2 py-0.5 px-1 shadow fixed top-0 left-0 w-full z-50 bg-white">
      <div class="flex flex-row items-center gap-2">
        <a href="/">
          <img :src="logo" alt="Nhamey Logo" class="h-[4.2rem] w-[4.2rem]" />
        </a>
        <div class="flex flex-col">
          <span class="text-xl tracking-normal">{{ t('menu') }}</span>
          <el-tag v-if="tableNumber" effect="dark" round type="success">
            Table: {{ tableNumber }}
          </el-tag>
          <el-tag v-else effect="dark" round type="info">{{ t('closed') }}</el-tag>
        </div>
      </div>

      <div class="flex items-center text-[1.05rem] pr-4 select-none">
        <el-dropdown @command="changeLanguage" trigger="click">
          <img :src="currentFlag" class="w-8 h-6 object-cover  border border-gray-300 cursor-pointer" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">
                <img :src="enFlag" class="w-8 h-6 object-cover  border border-gray-300" />
              </el-dropdown-item>
              <el-dropdown-item command="km">
                <img :src="kmFlag" class="w-8 h-6 object-cover  border border-gray-300" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button style="border: none; background-color: white" @click="handleCartOpen()">
          <el-icon color="black" size="30">
            <ShoppingCart />
          </el-icon>
        </el-button>
        <el-button
          style="border: none; background-color: white"
          @click="openCurrentOrderDialog()"
          :title="t('checkCurrentOrder')"
          class="hover:bg-gray-50 transition-colors duration-200"
        >
          <el-icon color="black" size="30">
            <Document />
          </el-icon>
        </el-button>
        <CartDrawer v-model:drawer="drawer" :handleCartClose="handleCartClose" />
        <el-dropdown trigger="click">
          <el-icon size="30"> <img class="h-8 invert" :src="menu" /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>{{ t('action1') }}</el-dropdown-item>
              <el-dropdown-item disabled>{{ t('action2') }}</el-dropdown-item>
              <el-dropdown-item @click="openOrderHistoryDialog">View Orders</el-dropdown-item>
              <el-dropdown-item @click="openCurrentOrderDialog">{{ t('checkCurrentOrder') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <OrderHistoryDialog
          :visible="orderHistoryDialogVisible"
          :onClose="closeOrderHistoryDialog"
          :tableId="route.params.id as string"
          :username="route.params.restaurant as string"
        />
        <CurrentOrderDialog
          :visible="currentOrderDialogVisible"
          :onClose="closeCurrentOrderDialog"
          :tableId="tableNumber"
          :username="route.params.restaurant as string"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowDown, ShoppingCart, Document } from '@element-plus/icons-vue';
import { ref, computed, onMounted } from 'vue';
import CartDrawer from '@/components/CartDrawer.vue';
import menu from '@/assets/icons/menu.png';
import logo from '@/assets/images/logo.png';
import { useI18n } from 'vue-i18n';
import enFlag from '@/assets/images/en.png';
import kmFlag from '@/assets/images/km.png';
import OrderHistoryDialog from '@/components/OrderHistoryDialog.vue';
import CurrentOrderDialog from '@/components/CurrentOrderDialog.vue';
import { useRoute } from 'vue-router';
import { getTableStatus } from '@/composable/apiCalling';

const drawer = ref(false);
const orderHistoryDialogVisible = ref(false);
const currentOrderDialogVisible = ref(false);
const tableNumber = ref<string | null>(null);
const { locale, t } = useI18n();
const route = useRoute();

const langMap = {
  en: { name: 'English', flag: enFlag },
  km: { name: 'ខ្មែរ', flag: kmFlag }
};

const currentFlag = computed(() => langMap[locale.value as 'en' | 'km'].flag);

function changeLanguage(lang: string) {
  locale.value = lang;
  localStorage.setItem('lang', lang);
}

const handleCartOpen = () => {
  drawer.value = true;
};

const handleCartClose = () => {
  drawer.value = false;
};

const openOrderHistoryDialog = () => {
  orderHistoryDialogVisible.value = true;
};
const closeOrderHistoryDialog = () => {
  orderHistoryDialogVisible.value = false;
};

const openCurrentOrderDialog = () => {
  currentOrderDialogVisible.value = true;
};

const closeCurrentOrderDialog = () => {
  currentOrderDialogVisible.value = false;
};

onMounted(async () => {
  const tableId = route.params.id;
  if (tableId) {
    try {
      const response = await getTableStatus({ tableId });
      if (response && response.table) {
        tableNumber.value = response.table.tableId;
      }
    } catch (error) {
      console.error('Failed to fetch table status:', error);
    }
  }
});
</script>

<style scoped>
.el-button {
  --el-button-hover-text-color: none;
}
</style>
