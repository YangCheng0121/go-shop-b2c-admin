<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form v-bind="formLayout">
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="编号">
              {{ refunds.sn }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="创建日期">
              {{ refunds.creation_date | Moment }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="方式">
              {{ refunds.method_name }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="支付方式">
              {{ refunds.payment_method }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收款银行">
              {{ refunds.bank }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收款账号">
              {{ refunds.account }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="付款金额">
              {{ refunds.amount | Amount }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="付款人">
              {{ refunds.payee }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="订单">
              {{ refunds.order_sn }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="备注">
              {{ refunds.memo }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label=" " :colon="false">
              <a-button @click="back">返回</a-button>
              <a-button class="margin-left-5px" @click="_reviewRefundOrder(1)">通过</a-button>
              <a-button class="margin-left-5px" @click="_reviewRefundOrder(0)">拒绝</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </box>
</template>

<script type="es6">
import { Box } from '@/components'
import { reviewRefundOrder, getRefunds } from '@/api/refunds'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box
  },
  name: 'RefundsLook',
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
      refunds: {}
    }
  },
  created() {
    this._getRefunds()
  },
  methods: {
    back() {
      this.$router.back()
    },
    /**
     * 获取退款信息
     * @private
     */
    _getRefunds() {
      const sn = this.$route.params.sn
      this.spinning = true
      getRefunds(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          this.refunds = res.data
          this.spinning = false
        }
      })
    },
    /**
     * 订单退款审核
     * @param review
     * @private
     */
    _reviewRefundOrder(review) {
      this.$confirm({
        title: `确定${review ? '通过' : '拒绝'}该退款单?`,
        onOk: () => {
          const sn = this.$route.params.sn
          reviewRefundOrder(sn, review).then((res) => {
            if (res.err_code === ERR_OK) {

            }
          })
        },
        onCancel() {
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
