<template>
  <a-form
    :form="form"
    v-bind="formLayout">
    <a-form-item label="名称">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称!' }] },
          ]"
          placeholder="请输入名称"/>
      </a-col>
    </a-form-item>
    <a-form-item label="条件">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'condition',
            { rules: [{ required: true, message: '请输入条件!' }] },
          ]"
          placeholder="请输入条件"/>
      </a-col>
    </a-form-item>
    <a-form-item label="前缀">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'prefix',
            { rules: [{ required: true, message: '请输入前缀!' }] },
          ]"
          placeholder="请输入前缀"/>
      </a-col>
    </a-form-item>
    <a-form-item label="开始日期">
      <a-col v-bind="formItemLayout">
        <a-date-picker
          v-decorator="['begin_date']"
          format="YYYY-MM-DD HH:mm:ss"
          show-time
        />
      </a-col>
    </a-form-item>
    <a-form-item label="结束日期">
      <a-col v-bind="formItemLayout">
        <a-date-picker
          v-decorator="['end_date']"
          format="YYYY-MM-DD HH:mm:ss"
          show-time
        />
      </a-col>
    </a-form-item>
    <a-form-item label="最小商品价格">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['minimum_price']"
          :min="0"
          type="number"
          placeholder="请输入最小商品价格"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最大商品价格">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['maximum_price']"
          :min="0"
          type="number"
          placeholder="请输入最大商品价格"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最小商品数量">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['minimum_quantity']"
          :min="0"
          type="number"
          placeholder="请输入最小商品数量"/>
      </a-col>
    </a-form-item>
    <a-form-item label="最大商品数量">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['maximum_quantity']"
          :min="0"
          type="number"
          placeholder="请输入最大商品数量"/>
      </a-col>
    </a-form-item>
    <a-form-item label="价格运算表达式">
      <a-col v-bind="formItemLayout">
        <a-tooltip>
          <template slot="title">
            可用变量 quantity、price
          </template>
          <a-input
            v-decorator="['price_expression']"
            placeholder="请输入价格运算表达式"/>
        </a-tooltip>
      </a-col>
    </a-form-item>
    <a-form-item label="设置">
      <a-col v-bind="formItemLayout">
        <a-checkbox-group v-decorator="['setting']">
          <a-checkbox value="is_enabled">是否启用</a-checkbox>
          <a-checkbox value="is_exchange">是否允许积分兑换</a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-form-item>
    <a-form-item label="积分兑换数">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'point',
            { rules: [{ required: true, message: '请输入积分兑换数!' }] },
          ]"
          :min="0"
          type="number"
          placeholder="请输入积分兑换数"/>
      </a-col>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'CouponBasic',
  computed: {
    ...mapGetters([
      'coupon'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'CouponBasic' }),
      formLayout: {
        labelCol: { span: 3, md: 4, lg: 4, xl: 3 },
        wrapperCol: { span: 8 }
      },
      formItemLayout: {
        span: 14,
        md: 24,
        lg: 24,
        xl: 14
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
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const coupon = {
              id: this.coupon.id,
              name: values.name,
              prefix: values.prefix,
              condition: values.condition,
              introduction: values.introduction,
              begin_date: moment(values.begin_date, 'YYYY-MM-DD HH:mm:ss'),
              end_date: moment(values.end_date, 'YYYY-MM-DD HH:mm:ss'),
              maximum_price: Number(values.maximum_price),
              maximum_quantity: Number(values.maximum_quantity),
              minimum_price: Number(values.minimum_price),
              minimum_quantity: Number(values.minimum_quantity),
              point: Number(values.point),
              price_expression: values.price_expression
            }
            const setting = values.setting || []
            setting.forEach((item) => {
              coupon[item] = 1
            })
            resolve(coupon)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
