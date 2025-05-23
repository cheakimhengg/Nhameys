import { computed, ref } from 'vue';
import type { FoodCategory, FoodItem } from '@/models/Menu';
import useCart from './useCart';
import { fetchFoodData, fetchAllUsers } from './apiCalling';

export const useMenu = () => {
  const foodData = ref<FoodCategory[]>([]);
  const searchQuery = ref<string>('');
  const centerDialogVisible = ref(false);
  const selectedItem = ref<FoodItem | null>(null);
  const allItems = ref<FoodItem[]>([]);
  const currentIndex = ref(0);
  const isLoading = ref(false);

  const { addToCart } = useCart();

  const getFoodByWebId = async (username: string) => {
    try {
      isLoading.value = true;
      const response = await fetchAllUsers();
      const user = response.users.find((u) => u.username === username);
      if (user) {
        const response = await fetchFoodData({ webId: user.webID });
        const apiData = response.foodData;
        foodData.value = Array.isArray(apiData) ? apiData : [];
      } else {
        foodData.value = [];
      }
      return foodData.value;
    } catch (error) {
      console.error('Error fetching food data by username:', error);
      foodData.value = [];
      return foodData.value;
    } finally {
      isLoading.value = false;
    }
  };

  const flattenItems = () => {
    return foodData.value.flatMap((category) => category.items);
  };

  const filteredFoodData = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return query
      ? foodData.value
          .map((category) => ({
            ...category,
            items: category.items.filter(
              (item) =>
                item.name.toLowerCase().includes(query) ||
                category.category.toLowerCase().includes(query)
            ),
          }))
          .filter((category) => category.items.length > 0)
      : foodData.value.filter((category) => category.items.length > 0);
  });

  const openDialog = (item: FoodItem) => {
    allItems.value = flattenItems();
    currentIndex.value = allItems.value.findIndex((i) => i.name === item.name);
    selectedItem.value = item;
    centerDialogVisible.value = true;
  };

  const handleClose = () => {
    centerDialogVisible.value = false;
    setTimeout(() => {
      selectedItem.value = null;
    }, 100);
  };

  const handleAddToCart = (item: FoodItem) => {
    addToCart(item);
    centerDialogVisible.value = false;
  };

  const updateSelectedItem = (item: FoodItem) => {
    selectedItem.value = item;
  };

  const updateCurrentIndex = (index: number) => {
    currentIndex.value = index;
  };

  return {
    getFoodByWebId,
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
  };
};
