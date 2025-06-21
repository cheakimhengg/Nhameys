<template>
  <el-dialog
    :model-value="props.visible"
    width="600px"
    :before-close="props.onClose"
    class="current-order-dialog"
    align-center
    :show-close="false"
    top="3vh"
  >
    <template #header>
      <div class="dialog-header">
        <div class="header-content">
          <div class="header-left">
            <div class="header-icon">
              <el-icon size="20">
                <ShoppingCart />
              </el-icon>
            </div>
            <div class="header-text">
              <h2 class="header-title">{{ t('currentOrder') }}</h2>
              <div class="header-subtitle">
                <span class="table-info">
                  <el-icon size="14" class="mr-1">
                    <Location />
                  </el-icon>
                  Table {{ props.tableId }}
                </span>
                <span class="divider">•</span>
                <span class="date-info">{{ formatDate(new Date()) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="dialog-content">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <p class="loading-text">{{ t('loadingOrder') }}</p>
      </div>

      <!-- No Order State -->
      <div v-else-if="!currentOrder" class="empty-state">
        <div class="empty-icon">
          <el-icon size="32">
            <ShoppingCart />
          </el-icon>
        </div>
        <h3 class="empty-title">{{ t('noCurrentOrder') }}</h3>
        <p class="empty-description">{{ t('noActiveOrders') }}</p>
      </div>

      <!-- Order Content -->
      <div v-else class="order-content">
        <!-- Order Status Card -->
        <div class="status-card">
          <div class="status-header">
            <div class="order-info">
              <div class="order-code">
                <span class="code-label">Order #</span>
                <span class="code-value">{{ currentOrder.orderCode }}</span>
              </div>
              <div class="order-time">
                {{ formatOrderTime(currentOrder.createdAt) }}
              </div>
            </div>
            <div class="status-badges">
              <div class="status-badge">
                <span class="badge-label">{{ t('orderStatus') }}</span>
                <el-tag
                  :type="getStatusType(currentOrder.status)"
                  effect="light"
                  size="small"
                  class="status-tag"
                >
                  <el-icon size="12" class="mr-1">
                    <component :is="getStatusIcon(currentOrder.status)" />
                  </el-icon>
                  {{ currentOrder.status }}
                </el-tag>
              </div>
              <div class="status-badge">
                <span class="badge-label">{{ t('paymentStatus') }}</span>
                <el-tag
                  :type="getPaymentStatusType(currentOrder.paymentStatus)"
                  effect="light"
                  size="small"
                  class="payment-tag"
                >
                  <el-icon size="12" class="mr-1">
                    <component :is="getPaymentIcon(currentOrder.paymentStatus)" />
                  </el-icon>
                  {{ currentOrder.paymentStatus }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="items-container">
          <!-- Pending Items -->
          <div v-if="currentOrder.pendingItems && currentOrder.pendingItems.length > 0" class="items-section">
            <div class="section-header pending">
              <div class="section-icon pending-icon">
                <el-icon size="16">
                  <Clock />
                </el-icon>
              </div>
              <h3 class="section-title">{{ t('pendingItems') }}</h3>
              <span class="item-count">{{ currentOrder.pendingItems.length }}</span>
            </div>
            <div class="items-list">
              <div
                v-for="item in currentOrder.pendingItems"
                :key="item._id"
                class="order-item pending-item"
              >
                <div class="item-content">
                  <div class="item-info">
                    <h4 class="item-name">{{ item.foodId.foodName }}</h4>
                    <div class="item-details">
                      <span class="quantity">
                        <el-icon size="12" class="mr-1">
                          <Box />
                        </el-icon>
                        Qty: {{ item.quantity }}
                      </span>
                      <span class="price-per-unit">
                        ${{ item.foodId.price.toFixed(2) }} each
                      </span>
                    </div>
                  </div>
                  <div class="item-price">
                    <span class="total-price">${{ item.totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ready Items -->
          <div v-if="currentOrder.readyItems && currentOrder.readyItems.length > 0" class="items-section">
            <div class="section-header ready">
              <div class="section-icon ready-icon">
                <el-icon size="16">
                  <Check />
                </el-icon>
              </div>
              <h3 class="section-title">{{ t('readyItems') }}</h3>
              <span class="item-count">{{ currentOrder.readyItems.length }}</span>
            </div>
            <div class="items-list">
              <div
                v-for="item in currentOrder.readyItems"
                :key="item._id"
                class="order-item ready-item"
              >
                <div class="item-content">
                  <div class="item-info">
                    <h4 class="item-name">{{ item.foodId.foodName }}</h4>
                    <div class="item-details">
                      <span class="quantity">
                        <el-icon size="12" class="mr-1">
                          <Box />
                        </el-icon>
                        Qty: {{ item.quantity }}
                      </span>
                      <span class="price-per-unit">
                        ${{ item.foodId.price.toFixed(2) }} each
                      </span>
                    </div>
                  </div>
                  <div class="item-price">
                    <span class="total-price">${{ item.totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="summary-card">
          <div class="summary-header">
            <h3 class="summary-title">{{ t('orderSummary') }}</h3>
          </div>
          <div class="summary-content">
            <div class="summary-row">
              <span class="summary-label">{{ t('subtotal') }}</span>
              <span class="summary-value">${{ totalAmount.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">{{ t('tax') }} (0%)</span>
              <span class="summary-value">$0.00</span>
            </div>
            <div class="summary-row total-row">
              <span class="summary-label">{{ t('totalAmount') }}</span>
              <span class="summary-value total-value">${{ totalAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="footer-actions">
          <el-button
            @click="props.onClose"
            type="default"
            size="large"
            class="action-button secondary"
          >
            <el-icon class="mr-2">
              <CircleClose />
            </el-icon>
            {{ t('close') }}
          </el-button>
          <el-button
            @click="printReceipt"
            type="primary"
            size="large"
            :disabled="!currentOrder"
            :loading="isPrinting"
            class="action-button primary"
          >
            <el-icon class="mr-2">
              <Printer />
            </el-icon>
            {{ t('printReceipt') }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ElButton, ElDialog, ElTag } from 'element-plus';
import {
  ShoppingCart,
  Printer,
  Location,
  Clock,
  Check,
  Box,
  CircleCheck,
  InfoFilled,
  CircleClose
} from '@element-plus/icons-vue';
import { getCurrentOrder } from '@/composable/apiCalling';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
}

interface OrderItem {
  _id: string;
  foodId: FoodItem;
  quantity: number;
  status: string;
  addedAt: string;
  totalPrice: number;
}

interface CurrentOrder {
  orderCode: string;
  webID: string;
  tableId: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  readyItems: OrderItem[];
  pendingItems: OrderItem[];
}

interface Props {
  visible: boolean;
  onClose?: (evt?: MouseEvent) => void;
  tableId?: string | null;
  username?: string;
}

const props = defineProps<Props>();

const currentOrder = ref<CurrentOrder | null>(null);
const isLoading = ref(false);
const isPrinting = ref(false);

const totalAmount = computed(() => {
  if (!currentOrder.value) return 0;

  const pendingTotal = currentOrder.value.pendingItems?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  const readyTotal = currentOrder.value.readyItems?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;

  return pendingTotal + readyTotal;
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatOrderTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'preparing':
      return 'info';
    case 'ready':
      return 'success';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'info';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return Clock;
    case 'preparing':
      return InfoFilled;
    case 'ready':
      return Check;
    case 'completed':
      return CircleCheck;
    case 'cancelled':
      return CircleClose;
    default:
      return InfoFilled;
  }
};

const getPaymentStatusType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'success';
    case 'failed':
      return 'danger';
    default:
      return 'info';
  }
};

const getPaymentIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return Clock;
    case 'paid':
      return CircleCheck;
    case 'failed':
      return CircleClose;
    default:
      return InfoFilled;
  }
};

const fetchCurrentOrder = async () => {
  if (!props.tableId || !props.username) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await getCurrentOrder({
      tableId: props.tableId,
      username: props.username
    });

    if (response && response.success && response.statusCode === 200) {
      currentOrder.value = response;
    } else {
      currentOrder.value = null;
    }
  } catch (err: unknown) {
    console.error('Error fetching current order:', err);
    currentOrder.value = null;
  } finally {
    isLoading.value = false;
  }
};

const printReceipt = async () => {
  if (!currentOrder.value) return;

  isPrinting.value = true;

  try {
    const receiptContent = generateReceiptContent();

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();

      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  } catch (err) {
    console.error('Error printing receipt:', err);
  } finally {
    isPrinting.value = false;
  }
};

const generateReceiptContent = () => {
  if (!currentOrder.value) return '';

  const order = currentOrder.value;
  const currentDate = new Date();

  // Extract shop name from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const shopParam = urlParams.get('shop') || 'NHAMEY RESTAURANT';
  const shopName = shopParam.split('/')[0]?.replace(/_/g, ' ');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
            background: white;
            color: #000;
            line-height: 1.2;
            font-size: 12px;
            font-weight: normal;
        }

        .receipt-container {
            max-width: 300px;
            margin: 0 auto;
            background: white;
            border: none;
            border-radius: 0;
            overflow: hidden;
            box-shadow: none;
        }

        .receipt-header {
            background: white;
            color: #000;
            padding: 16px 12px 12px 12px;
            text-align: center;
            border-bottom: 1px dashed #ccc;
        }

        .restaurant-logo {
            width: 40px;
            height: 40px;
            background: #000;
            border-radius: 50%;
            margin: 0 auto 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            color: white;
            border: 2px solid #000;
        }

        .restaurant-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .restaurant-tagline {
            font-size: 10px;
            color: #666;
            font-weight: normal;
            margin-bottom: 8px;
        }

        .receipt-body {
            padding: 0;
        }

        .order-info {
            display: block;
            margin: 0;
            padding: 12px;
            background: white;
            border-bottom: 1px dashed #ccc;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
            font-size: 11px;
        }

        .info-row:last-child {
            margin-bottom: 0;
        }

        .info-label {
            color: #666;
            font-weight: normal;
        }

        .info-value {
            color: #000;
            font-weight: bold;
        }

        .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 2px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid #000;
        }

        .status-pending {
            background: #fff;
            color: #000;
        }

        .status-ready {
            background: #000;
            color: #fff;
        }

        .status-paid {
            background: #000;
            color: #fff;
        }

        .status-unpaid {
            background: #fff;
            color: #000;
        }

        .items-section {
            margin: 0;
            padding: 0;
        }

        .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #000;
            margin: 0;
            padding: 8px 12px 6px 12px;
            border-bottom: 1px dashed #ccc;
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f8f8f8;
        }

        .section-icon {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .item {
            display: block;
            padding: 6px 12px;
            border-bottom: 1px solid #eee;
            background: white;
        }

        .item:last-child {
            border-bottom: none;
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2px;
        }

        .item-name {
            font-size: 11px;
            font-weight: bold;
            color: #000;
            line-height: 1.2;
            flex: 1;
        }

        .item-price {
            text-align: right;
            flex-shrink: 0;
        }

        .item-total {
            font-size: 11px;
            font-weight: bold;
            color: #000;
        }

        .item-meta {
            font-size: 9px;
            color: #666;
            font-weight: normal;
            margin-left: 12px;
        }

        .total-section {
            background: white;
            margin: 0;
            padding: 12px;
            border-top: 1px dashed #ccc;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
            font-size: 11px;
        }

        .total-row:last-child {
            margin-bottom: 0;
            padding-top: 8px;
            border-top: 1px dashed #ccc;
            font-size: 13px;
            font-weight: bold;
        }

        .total-label {
            color: #000;
            font-weight: normal;
        }

        .total-value {
            color: #000;
            font-weight: bold;
        }

        .receipt-footer {
            background: white;
            padding: 12px;
            text-align: center;
            color: #000;
            border-top: 1px dashed #ccc;
        }

        .footer-text {
            font-size: 9px;
            color: #666;
            margin-bottom: 4px;
            font-weight: normal;
        }

        .footer-thanks {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .qr-code {
            width: 50px;
            height: 50px;
            margin: 8px auto;
        }

        .payment-status {
            background: #f0f0f0;
            padding: 4px 8px;
            border-radius: 2px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: inline-block;
            border: 1px solid #ccc;
        }

        .powered-by {
            background: #000;
            color: white;
            padding: 6px;
            text-align: center;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        @media print {
            @page {
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
            }

            .receipt-container {
                border: none;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <div class="restaurant-logo">NH</div>
            <div class="restaurant-name">${shopName.toUpperCase()}</div>
            <div class="restaurant-tagline">Authentic Cuisine</div>
        </div>

        <div class="receipt-body">
            <div class="order-info">
                <div class="info-row">
                    <span class="info-label">Restaurant:</span>
                    <span class="info-value">${shopName.toUpperCase()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Order Code:</span>
                    <span class="info-value">${order.orderCode}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Table:</span>
                    <span class="info-value">${props.tableId}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date:</span>
                    <span class="info-value">${currentDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span class="info-value">
                        <span class="status-badge status-${order.status.toLowerCase()}">${order.status.toUpperCase()}</span>
                    </span>
                </div>
            </div>

            <div class="items-section">
                ${order.pendingItems && order.pendingItems.length > 0 ? `
                <div class="section-title">
                    <div class="section-icon" style="background: #ffc107;"></div>
                    PENDING ITEMS (${order.pendingItems.length})
                </div>
                ${order.pendingItems.map(item => `
                <div class="item">
                    <div class="item-header">
                        <div class="item-name">${item.foodId.foodName}</div>
                        <div class="item-price">
                            <div class="item-total">$${item.totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="item-meta">Qty: ${item.quantity} × $${item.foodId.price.toFixed(2)}</div>
                </div>
                `).join('')}
                ` : ''}

                ${order.readyItems && order.readyItems.length > 0 ? `
                <div class="section-title">
                    <div class="section-icon" style="background: #28a745;"></div>
                    READY ITEMS (${order.readyItems.length})
                </div>
                ${order.readyItems.map(item => `
                <div class="item">
                    <div class="item-header">
                        <div class="item-name">${item.foodId.foodName}</div>
                        <div class="item-price">
                            <div class="item-total">$${item.totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="item-meta">Qty: ${item.quantity} × $${item.foodId.price.toFixed(2)}</div>
                </div>
                `).join('')}
                ` : ''}
            </div>
        </div>

        <div class="total-section">
            <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-value">$${totalAmount.value.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span class="total-label">Tax (0%):</span>
                <span class="total-value">$0.00</span>
            </div>
            <div class="total-row">
                <span class="total-label">TOTAL:</span>
                <span class="total-value">$${totalAmount.value.toFixed(2)}</span>
            </div>
        </div>

        <div class="receipt-footer">
            <div class="payment-status">PAYMENT: ${order.paymentStatus.toUpperCase()}</div>
            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${order.orderCode}" alt="QR Code" style="width: 50px; height: 50px;">
            </div>
            <div class="footer-thanks">THANK YOU!</div>
            <div class="footer-text">Please visit us again</div>
        </div>

        <div class="powered-by">
            Powered by Nhamey
        </div>
    </div>
</body>
</html>`;

  return htmlContent;
};

// Watch for dialog visibility changes
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      fetchCurrentOrder();
    } else {
      currentOrder.value = null;
    }
  }
);

// Fetch on mount if visible
onMounted(() => {
  if (props.visible) {
    fetchCurrentOrder();
  }
});
</script>

<style scoped>
.current-order-dialog .el-dialog {
  border-radius: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 2px solid #409eff;
  overflow: hidden;
}

.current-order-dialog .el-dialog__header {
  padding: 0;
  background: transparent;
  border-radius: 0;
}

.current-order-dialog .el-dialog__body {
  padding: 0;
  background: transparent;
  border-radius: 0;
}

.current-order-dialog .el-dialog__footer {
  padding: 0;
  background: transparent;
  border-radius: 0;
}

/* Header Styles */
.dialog-header {
  background: #409eff;
  padding: 20px 24px;
  border-bottom: 2px solid #409eff;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.header-text {
  color: white;
}

.header-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.header-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.table-info, .date-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.divider {
  color: rgba(255, 255, 255, 0.6);
}

/* Content Styles */
.dialog-content {
  padding: 0;
  background: #f0f9ff;
  min-height: 400px;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #f0f9ff;
}

.loading-spinner {
  margin-bottom: 16px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: #f0f9ff;
}

.empty-icon {
  width: 64px;
  height: 64px;
  background: #dbeafe;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
  margin-bottom: 20px;
  border: 2px solid #409eff;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.empty-description {
  color: #64748b;
  font-size: 14px;
  max-width: 280px;
  line-height: 1.5;
}

/* Order Content */
.order-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #f0f9ff;
}

/* Status Card */
.status-card {
  background: white;
  border-radius: 0;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.order-info {
  flex: 1;
}

.order-code {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.code-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-value {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.order-time {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.status-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.status-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.badge-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-tag, .payment-tag {
  font-weight: 600;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Items Container */
.items-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #f0f9ff;
}

.items-section {
  background: white;
  border-radius: 0;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.section-header.pending {
  background: #fef3c7;
  border-bottom-color: #fbbf24;
}

.section-header.ready {
  background: #d1fae5;
  border-bottom-color: #10b981;
}

.section-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.pending-icon {
  background: #f59e0b;
}

.ready-icon {
  background: #059669;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.item-count {
  background: rgba(255, 255, 255, 0.8);
  color: #1e293b;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
}

/* Items List */
.items-list {
  padding: 0;
}

.order-item {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
}

.order-item:nth-child(even) {
  background: #f8fafc;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item:hover {
  background: #f0f9ff;
}

.pending-item {
  border-left: 3px solid #f59e0b;
}

.ready-item {
  border-left: 3px solid #10b981;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.item-details {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #64748b;
}

.quantity, .price-per-unit {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.item-price {
  text-align: right;
  flex-shrink: 0;
}

.total-price {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

/* Summary Card */
.summary-card {
  background: white;
  border-radius: 0;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-header {
  background: #f8fafc;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.summary-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.summary-content {
  padding: 20px 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 14px;
}

.summary-label {
  color: #64748b;
  font-weight: 500;
}

.summary-value {
  color: #1e293b;
  font-weight: 600;
}

.total-row {
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid #e2e8f0;
  font-size: 16px;
  font-weight: 700;
}

.total-value {
  color: #409eff;
  font-size: 18px;
}

/* Footer */
.dialog-footer {
  background: #f8fafc;
  padding: 20px 24px;
  border-top: 1px solid #e2e8f0;
}

.footer-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-button {
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 24px;
  transition: all 0.2s ease;
  min-width: 120px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.action-button.secondary {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.action-button.secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-button.primary {
  background: #409eff;
  border: 1px solid #409eff;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
}

.action-button.primary:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.action-button.primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
}

.action-button.primary:disabled {
  background: #d1d5db;
  border-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.action-button .el-icon {
  font-size: 16px;
}

.mr-2 {
  margin-right: 8px;
}

/* Responsive Design */
@media (max-width: 640px) {
  .current-order-dialog .el-dialog {
    width: 95% !important;
    margin: 10px auto;
  }

  .dialog-header {
    padding: 16px 20px;
  }

  .header-left {
    gap: 10px;
  }

  .header-icon {
    width: 36px;
    height: 36px;
  }

  .header-title {
    font-size: 18px;
  }

  .header-subtitle {
    font-size: 13px;
  }

  .status-header {
    flex-direction: column;
    gap: 16px;
  }

  .status-badges {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .footer-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}

/* Animation */
.order-item {
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

