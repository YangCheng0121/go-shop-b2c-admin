<template>
  <box class="padding-10px">
    <div slot="content">
      <a-tabs
        default-active-key="order"
        type="card">
        <a-tab-pane key="order" tab="订单信息">
          <order-info-edit ref="OrderInfo"/>
        </a-tab-pane>
        <a-tab-pane key="product" tab="商品信息">
          <products-info/>
        </a-tab-pane>
      </a-tabs>
      <a-row class="padding-top-10px padding-bottom-10px">
        <a-col :span="2"/>
        <a-col>
          <confirm-back @confirm="confirmHandle"/>
        </a-col>
      </a-row>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import OrderInfoEdit from './components/OrderInfoEdit'
import ProductsInfo from './components/ProductsInfo'
import { updateOrder } from '@/api/order'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    OrderInfoEdit,
    ProductsInfo,
    ConfirmBack
  },
  name: 'OrderEdit',
  methods: {
    /**
     * 确认按钮回调
     */
    confirmHandle() {
      const OrderInfo = this.$refs.OrderInfo
      OrderInfo.handleSubmit().then((values) => {
        this._updateOrder(values)
      })
    },
    /**
     * 更新订单
     * @param order
     * @private
     */
    _updateOrder(order) {
      order = JSON.stringify(order)
      updateOrder(order).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
