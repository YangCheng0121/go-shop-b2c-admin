<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form v-bind="formLayout">
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="编号">
              {{ payment.sn }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="创建日期">
              {{ payment.creation_date | Moment }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="方式">
              {{ payment.method_name }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="支付方式">
              {{ payment.payment_method }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收款银行">
              {{ payment.bank }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收款账号">
              {{ payment.account }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="付款金额">
              {{ payment.amount | Amount }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="付款人">
              {{ payment.payer }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="订单">
              {{ payment.order_sn }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="备注">
              {{ payment.memo }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label=" " :colon="false">
              <a-button @click="back">返回</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </box>
</template>

<script type="es6">
import { Box } from '@/components'
import { getPayment } from '@/api/payment'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box
  },
  name: 'PaymentLook',
  data() {
    return {
      spinning: false,
      formLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 10, md: 18, lg: 18, xl: 10 }
      },
      formItemLayout: {
        span: 12
      },
      payment: {}
    }
  },
  created() {
    this._getPayment()
  },
  methods: {
    back() {
      this.$router.back()
    },
    /**
     * 获取支付信息
     * @private
     */
    _getPayment() {
      const sn = this.$route.params.sn
      this.spinning = true
      getPayment(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          this.payment = res.data
          this.spinning = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
