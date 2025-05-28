import { ref } from 'vue';
import { postOrder, fetchData } from './apiCalling';

export type OrderHistoryItem = {
  id: string;
  createdAt: string;
  status: string;
  items: { foodId: string; name: string; quantity: number }[];
};

export const getOrdersForTable = async (
  tableId: string,
  username: string
): Promise<OrderHistoryItem[]> => {
  try {
    const response = await fetchData('/order/history', { tableId, username });
    return response.orders || [];
  } catch (error) {
    return [];
  }
};

export default function useOrder() {
  const isOrdering = ref(false);
  const orderError = ref<string | null>(null);
  const orderSuccess = ref(false);

  const placeOrder = async (
    tableId: string,
    items: { foodId: string; quantity: number }[],
    username: string
  ) => {
    isOrdering.value = true;
    orderError.value = null;
    orderSuccess.value = false;
    try {
      const payload = {
        tableId,
        items,
        username,
      };
      const response = await postOrder(payload);
      if (response && response.statusCode === 200) {
        orderSuccess.value = true;
      } else {
        orderError.value = response?.message || 'Order failed';
      }
      return response;
    } catch (error: unknown) {
      let message = 'Order failed';
      if (
        typeof error === 'object' &&
        error &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        message = (error as { message: string }).message;
      }
      orderError.value = message;
      return { statusCode: 500, message };
    } finally {
      isOrdering.value = false;
    }
  };

  return {
    isOrdering,
    orderError,
    orderSuccess,
    placeOrder,
  };
}
