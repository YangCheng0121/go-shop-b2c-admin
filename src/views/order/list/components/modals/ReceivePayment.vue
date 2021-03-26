<template>
  <a-modal
    title="收款"
    :visible="visible"
    forceRender
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
    :width="900">
    <a-form
      v-if="order"
      :form="form"
      v-bind="formLayout">
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="编号">
            <span>{{ order.sn }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemLayout">
          <a-form-item label="创建日期">
            <span>{{ order.creation_date | Moment }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="订单金额">
            <span>{{ order.amount | Amount }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemLayout">
          <a-form-item label="应付金额">
            <span>{{ (order.amount - order.amount_paid) | Amount }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="收款银行">
            <a-input v-decorator="['bank']" placeholder="请输入收款银行"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemLayout">
          <a-form-item label="收款账号">
            <a-input v-decorator="['account']" placeholder="请输入收款账号"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="付款金额">
            <a-input
              v-decorator="[
                'amount',
                { rules: [{ required: true, message: '请输入付款金额!' }] },
              ]"
              placeholder="请输入付款金额"
              type="number"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemLayout">
          <a-form-item label="付款人">
            <a-input v-decorator="['payer']" placeholder="请输入付款人"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="方式">
            <a-select
              v-decorator="[
                'method',
                { rules: [{ required: true, message: '请选择方式!' }] },
              ]">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option value="0">
                在线支付
              </a-select-option>
              <a-select-option value="1">
                线下支付
              </a-select-option>
              <a-select-option value="2">
                预存款支付
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemLayout">
          <a-form-item label="支付方式">
            <a-select
              v-decorator="[
                'payment_method_id',
                { rules: [{ required: true, message: '请选择支付方式!' }] },
              ]">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="method in paymentMethods" :key="method.id" :value="method.id">
                {{ method.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formItemLayout">
          <a-form-item label="备注">
            <a-input v-decorator="['memo']" placeholder="请输入备注"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script type="es6">
import { receivePayment } from '@/api/order'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  name: 'ReceivePayment',
  computed: {
    ...mapGetters([
      'order',
      'paymentMethods'
    ])
  },
  data() {
    return {
      visible: false, // Modal Visible
      form: this.$form.createForm(this, { name: 'ReceivePayment' }),
      formLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      },
      formItemLayout: {
        span: 12
      }
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 显示 Modal
     */
    showModal() {
      this.visible = true
      this.setFormFieldsValue({
        method: this.order.payment_method_type.toString(),
        payment_method_id: ''
      })
    },
    /**
     * 隐藏 Modal
     */
    hideModal() {
      this.visible = false
    },
    /**
     * 确认收款
     */
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const orderId = this.order.id
          const bank = values.bank
          const account = values.account
          const amount = values.amount
          const payer = values.payer
          const method = values.method
          const paymentMethod = values.payment_method_id
          const memo = values.memo
          receivePayment({ orderId, bank, account, amount, payer, method, paymentMethod, memo }).then((res) => {
            if (res.err_code === ERR_OK) {
              this.hideModal()
              this.setFormFieldsValue({
                bank: '',
                account: '',
                amount: '',
                payer: '',
                method: '',
                payment_method_id: '',
                memo: ''
              })
              this.$emit('receivePayment')
            }
          })
        }
      })
    },
    handleCancel() {
      this.hideModal()
    }
  }
}
</script>

<style scoped lang="less">

</style>
