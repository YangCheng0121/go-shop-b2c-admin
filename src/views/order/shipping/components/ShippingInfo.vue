<template>
  <a-form v-bind="formLayout">
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="编号">
          {{ shipping.sn }}
        </a-form-item>
      </a-col>
      <a-col v-bind="formItemLayout">
        <a-form-item label="创建日期">
          {{ shipping.creation_date | Moment }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="配送方式">
          {{ shipping.shipping_method }}
        </a-form-item>
      </a-col>
      <a-col v-bind="formItemLayout">
        <a-form-item label="物流公司">
          {{ shipping.delivery_corp }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="运单号">
          {{ shipping.tracking_no | Empty }}
        </a-form-item>
      </a-col>
      <a-col v-bind="formItemLayout">
        <a-form-item label="物流费用">
          {{ shipping.freight | Amount }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="收货人">
          {{ shipping.consignee }}
        </a-form-item>
      </a-col>
      <a-col v-bind="formItemLayout">
        <a-form-item label="电话">
          {{ shipping.phone }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="邮编">
          {{ shipping.zip_code }}
        </a-form-item>
      </a-col>
      <a-col v-bind="formItemLayout">
        <a-form-item label="订单">
          {{ shipping.order_sn }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col v-bind="formItemLayout">
        <a-form-item label="备注">
          {{ shipping.memo }}
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script type="es6">
export default {
  name: 'ShippingInfo',
  props: {
    shipping: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 10, md: 18, lg: 18, xl: 10 }
      },
      formItemLayout: {
        span: 12
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
