<template>
  <a-form :form="form" v-bind="formLayout">
    <a-form-item label="货币符号:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'currencySign',
          {
            rules: [{ required: true, message: '请输入货币符号!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="货币单位:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'currencyUnit',
          {
            rules: [{ required: true, message: '请输入货币单位!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="库存警告数:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'stockAlertCount',
          {
            rules: [{ required: true, message: '请输入库存警告数!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="库存分配时间点">
      <a-select
        v-decorator="['stockAllocationTime']"
        style="width: 120px">
        <a-select-option value="order">
          下订单
        </a-select-option>
        <a-select-option value="payment">
          订单支付
        </a-select-option>
        <a-select-option value="ship">
          订单发货
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="默认换算比例:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'defaultPointScale',
          {
            rules: [{ required: true, message: '请输入默认换算比例!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="是否开启开发模式:">
      <a-checkbox-group
        v-decorator="['isDevelopmentEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否开启评论:">
      <a-checkbox-group
        v-decorator="['isReviewEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否审核评论:">
      <a-checkbox-group
        v-decorator="['isReviewCheck']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否开启咨询:">
      <a-checkbox-group
        v-decorator="['isConsultationEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否审核咨询:">
      <a-checkbox-group
        v-decorator="['isConsultationCheck']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否开启发票功能:">
      <a-checkbox-group
        v-decorator="['isInvoiceEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="是否开启含税价:">
      <a-checkbox-group
        v-decorator="['isTaxPriceEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="税率:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'taxRate',
          {
            rules: [{ required: true, message: '请输入税率!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="Cookie路径:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'cookiePath',
          {
            rules: [{ required: true, message: '请输入Cookie路径!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="Cookie作用域:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['cookieDomain']"/>
    </a-form-item>
    <a-form-item label="快递100授权KEY:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['kuaidi100Key']"/>
    </a-form-item>
    <a-form-item label="快递100公司编号:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['kuaidi100Customer']"/>
    </a-form-item>
    <a-form-item label="短信AppId:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['smsAppId']"/>
    </a-form-item>
    <a-form-item label="短信服务密钥:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['smsSecretKey']"/>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
  import settingMixin from './mixin'

  export default {
    name: 'OtherSetting',
    mixins: [settingMixin],
    data() {
      return {
        form: this.$form.createForm(this, { name: 'OtherSetting' }),
        formLayout: {
          labelCol: { span: 3 },
          wrapperCol: { span: 8 }
        },
        inputStyle: {
          style: {
            width: '70%'
          }
        }
      }
    },
    methods: {
      /**
       * 设置表单的 Filed Value
       */
      setFormFieldsValue() {
        if (Object.keys(this.setting).length) {
          const {
            currencySign,
            currencyUnit,
            stockAlertCount,
            stockAllocationTime,
            defaultPointScale,
            isDevelopmentEnabled,
            isReviewEnabled,
            isReviewCheck,
            isConsultationEnabled,
            isConsultationCheck,
            isInvoiceEnabled,
            isTaxPriceEnabled,
            taxRate,
            cookiePath,
            cookieDomain,
            kuaidi100Key,
            kuaidi100Customer,
            smsAppId,
            smsSecretKey
          } = this.setting
          this.form.setFieldsValue({
            currencySign: currencySign,
            currencyUnit: currencyUnit,
            stockAlertCount: stockAlertCount,
            stockAllocationTime: stockAllocationTime,
            defaultPointScale: defaultPointScale,
            isDevelopmentEnabled: [isDevelopmentEnabled],
            isReviewEnabled: [isReviewEnabled],
            isReviewCheck: [isReviewCheck],
            isConsultationEnabled: [isConsultationEnabled],
            isConsultationCheck: [isConsultationCheck],
            isInvoiceEnabled: [isInvoiceEnabled],
            isTaxPriceEnabled: [isTaxPriceEnabled],
            taxRate: taxRate,
            cookiePath: cookiePath,
            cookieDomain: cookieDomain,
            kuaidi100Key: kuaidi100Key,
            kuaidi100Customer: kuaidi100Customer,
            smsAppId: smsAppId,
            smsSecretKey: smsSecretKey
          })
        }
      },
      /**
       * 提交表单
       */
      handleSubmit() {
        return new Promise(resolve => {
          this.form.validateFields((err, values) => {
            if (!err) {
              values.isDevelopmentEnabled = values.isDevelopmentEnabled[0]
              values.isReviewEnabled = values.isReviewEnabled[0]
              values.isReviewCheck = values.isReviewCheck[0]
              values.isConsultationEnabled = values.isConsultationEnabled[0]
              values.isConsultationCheck = values.isConsultationCheck[0]
              values.isInvoiceEnabled = values.isInvoiceEnabled[0]
              values.isTaxPriceEnabled = values.isTaxPriceEnabled[0]
              resolve(values)
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
