<template>
  <el-dialog :model-value="props.visible" width="400px" :before-close="props.onClose" class="order-history-dialog"
    align-center :show-close="false" top="10vh">
    <template #header>
      <div class="px-4 pt-4 pb-1">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Order Receipt</h2>
        <div class="text-xs text-gray-500 font-medium">Table <span class="font-semibold">{{ props.tableId }}</span>
          &bull; {{ order.date }}</div>
      </div>
    </template>
    <div class="px-4 pb-1">
      <el-table :data="order.items" class="receipt-table" :border="false" :show-header="true" style="width: 100%">
        <el-table-column prop="name" label="Item" min-width="120" align="left" />
        <el-table-column prop="quantity" label="Qty" width="50" align="center" />
        <el-table-column prop="price" label="Price" width="70" align="right">
          <template #default="scope">
            ${{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-2 mb-1">
        <div class="receipt-total">
          <span class="text-xs text-gray-500 mr-2">Total:</span>
          <span class="font-bold text-base text-gray-800">${{ order.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <el-divider class="my-1" />
    <template #footer>
      <div class="flex justify-end gap-2 px-4 pb-3 pt-1">
        <el-button @click="(evt) => props.onClose?.(evt)" type="default" size="small">Close</el-button>
        <el-button type="primary" size="small">Call for Payment</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElButton, ElDialog, ElDivider } from 'element-plus';

interface Props {
  visible: boolean;
  onClose?: (evt?: MouseEvent) => void;
  tableId?: string;
  username?: string;
}
const props = defineProps<Props>();

// Static single order data for demonstration
const order = {
  id: 'ORD-001',
  date: '2024-06-01',
  items: [
    { name: 'Fried Rice', quantity: 2, price: 5.25 },
    { name: 'Spring Rolls', quantity: 1, price: 2.50 },
    { name: 'Pad Thai', quantity: 1, price: 6.00 },
  ],
  total: 5.25 * 2 + 2.50 + 6.00,
};
</script>

<style scoped>
.order-history-dialog .el-dialog {
  border-radius: 0;
  box-shadow: none;
  background: #fff;
}

.order-history-dialog .el-dialog__header {
  padding: 0;
  background: transparent;
  border-radius: 0;
}

.order-history-dialog .el-dialog__body {
  padding: 0;
  background: transparent;
  border-radius: 0;
}

.receipt-table {
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  font-size: 0.98rem;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
}

.el-table th,
.el-table td {
  font-size: 0.98rem;
  background: #fff;
  border: none;
  padding: 8px 4px;
}

.el-table th {
  color: #888;
  font-weight: 600;
  background: #fff;
}

.el-table__row:nth-child(even)>td {
  background: #fafafa !important;
}

.el-table__row:hover>td {
  background: #f3f3f3 !important;
}

.receipt-total {
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  background: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
