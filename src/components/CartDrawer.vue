<template>
  <el-drawer :model-value="props.drawer" :with-header="false" :size="drawerSize" lock-scroll
    @update:model-value="props.handleCartClose">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="flex-grow text-center -mr-[2.5rem] lg:text-xl font-medium">{{ t('yourOrders') }}</h2>
      <div class="lg:flex hidden">
        <el-button type="info" size="large" @click="props.handleCartClose">
          <el-icon size="16">
            <CloseBold />
          </el-icon>
        </el-button>
      </div>
      <div class="flex lg:hidden">
        <el-button type="info" @click="props.handleCartClose">
          <el-icon size="16">
            <CloseBold />
          </el-icon>
        </el-button>
      </div>
    </div>
    <el-divider />
    <div v-if="cart.length > 0">
      <ul>
        <li v-for="item in cart" :key="item.id">
          <div class="flex justify-between">
            <div class="flex lg:gap-4 gap-2.5 lg:w-[85%] w-[80%]">
              <img :src="item.image" :alt="item.name"
                class="border rounded-md object-contain lg:h-[10.5rem] lg:w-[10.5rem] h-[6rem] w-[6rem]" />
              <div class="flex flex-col justify-between">
                <h2 class="lg:text-lg font-medium">
                  {{ item.name }}
                </h2>
                <div class="lg:flex hidden">
                  <el-button type="info" style="padding: 15px" @click="removeFromCart(item.id)">
                    <span class="font-medium text-2xl pb-1">-</span>
                  </el-button>
                  <span class="flex justify-center items-center px-4 font-medium">{{
                    item.quantity
                    }}</span>
                  <el-button type="info" style="padding: 14px" @click="addToCart(item)">
                    <span class="font-medium text-xl pb-1">+</span>
                  </el-button>
                </div>
                <div class="flex lg:hidden">
                  <el-button type="info" style="padding: 12px" @click="removeFromCart(item.id)">
                    <span class="font-medium text-xl pb-1">-</span>
                  </el-button>
                  <span class="flex justify-center items-center px-3 font-medium">{{
                    item.quantity
                    }}</span>
                  <el-button type="info" style="padding: 10px" @click="addToCart(item)">
                    <span class="font-medium text-xl pb-1">+</span>
                  </el-button>
                </div>
              </div>
            </div>
            <h2 class="lg:text-lg font-medium">$ {{ item.price.toFixed(2) }}</h2>
          </div>
          <el-divider />
        </li>
      </ul>
    </div>
    <div v-else class="w-full flex justify-center items-center h-[60vh]">
      <el-empty :image-size="200" :description="t('cartEmpty')" />
    </div>
    <div v-if="cart.length > 0" class="flex flex-col lg:gap-4 gap-2">
      <div class="flex justify-end lg:gap-32 gap-20 lg:text-xl font-medium">
        <h2>{{ t('grandTotal') }}:</h2>
        <h2>$ {{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}}</h2>
      </div>
      <div class="flex justify-end">
        <div class="lg:flex hidden">
          <el-button type="info" size="large" @click="handleOrder">
            <h2 class="text-lg">{{ t('orderNow') }}</h2>
          </el-button>
        </div>
        <div class="flex lg:hidden">
          <el-button type="info" @click="handleOrder">
            <h2>{{ t('orderNow') }}</h2>
          </el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { CloseBold } from '@element-plus/icons-vue';
import useCart from '@/composable/useCart';
import { defineProps } from 'vue';
import { ElNotification } from 'element-plus';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true,
  },
  handleCartClose: {
    type: Function,
    required: true,
  },
});

const { cart, removeFromCart, addToCart, clearCart } = useCart();

const windowWidth = ref<number | null>(null);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const drawerSize = computed(() => {
  if (windowWidth.value === null) return '40%';
  return windowWidth.value <= 1024 ? '80%' : '40%';
});

const handleOrder = () => {
  props.handleCartClose();
  ElNotification.success({
    title: t('success'),
    message: t('orderSuccess'),
  });
  clearCart();
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<style scoped>
.el-divider--horizontal {
  margin: 12px 0 !important;
}

:deep(.el-empty__description) {
  --el-font-size-base: 20px;
}
</style>
