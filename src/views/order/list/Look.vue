<template>
  <box class="padding-10px">
    <div slot="content">
      <a-tabs
        default-active-key="order"
        type="card">
        <a-tab-pane key="order" tab="订单信息">
          <order-info-look ref="OrderInfoLook"/>
        </a-tab-pane>
        <a-tab-pane key="product" tab="商品信息">
          <products-info/>
        </a-tab-pane>
        <a-tab-pane key="payments" tab="收款信息">
          <payments-info/>
        </a-tab-pane>
        <a-tab-pane key="refunds" tab="退款信息">
          <refunds-info/>
        </a-tab-pane>
        <a-tab-pane key="ships" tab="发货信息">
          <shippings-info/>
        </a-tab-pane>
        <a-tab-pane key="returns" tab="退货信息">
          <returns-info/>
        </a-tab-pane>
        <a-tab-pane key="logs" tab="订单记录">
          <logs-info/>
        </a-tab-pane>
      </a-tabs>
      <a-row class="padding-top-10px padding-bottom-10px">
        <a-col :span="2"/>
        <a-col>
          <a-button @click="back">返回</a-button>
        </a-col>
      </a-row>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import OrderInfoLook from './components/OrderInfoLook'
import ProductsInfo from './components/ProductsInfo'
import PaymentsInfo from './components/PaymentsInfo'
import RefundsInfo from './components/RefundsInfo'
import ShippingsInfo from './components/ShippingsInfo'
import ReturnsInfo from './components/ReturnsInfo'
import LogsInfo from './components/LogsInfo'

export default {
  components: {
    Box,
    OrderInfoLook,
    ProductsInfo,
    ConfirmBack,
    PaymentsInfo,
    RefundsInfo,
    ShippingsInfo,
    ReturnsInfo,
    LogsInfo
  },
  name: 'OrderLook',
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

</style>
