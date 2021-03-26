<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        v-bind="formLayout"
        :form="form"
        slot="content">
        <a-form-item label="支付方式名称">
          <a-input
            v-decorator="[
              'paymentName',
              { rules: [{ required: true, message: '请输入支付方式名称!' }] },
            ]"
            placeholder="请输入支付方式名称"/>
        </a-form-item>
        <a-form-item label="APP ID">
          <a-input
            v-decorator="[
              'appId',
              { rules: [{ required: true, message: '请输入APP ID!' }] },
            ]"
            placeholder="请输入APP ID"/>
        </a-form-item>
        <a-form-item label="商户号">
          <a-input
            v-decorator="[
              'mch_id',
              { rules: [{ required: true, message: '请输入商户号!' }] },
            ]"
            placeholder="请输入商户号"/>
        </a-form-item>
        <a-form-item label="API密钥">
          <a-input
            v-decorator="[
              'appSecret',
              { rules: [{ required: true, message: '请输入API密钥!' }] },
            ]"
            placeholder="请输入API密钥"/>
        </a-form-item>
        <a-form-item label="手续费类型">
          <a-select v-decorator="['feeType']">
            <a-select-option value="scale">
              按比例收费
            </a-select-option>
            <a-select-option value="fixed">
              固定收费
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="手续费">
          <a-input
            v-decorator="[
              'fee',
              { rules: [{ required: true, message: '请输入手续费!' }] },
            ]"
            :min="0"
            type="number"
            placeholder="请输入手续费"/>
        </a-form-item>
        <a-form-item label="logo">
          <div class="logo">
            <a-input
              v-decorator="['logo']"
              placeholder="请上传logo"/>
            <div class="logo-right">
              <upload-button @upload="_uploadImage"/>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            v-decorator="['description']"
            placeholder="请输入描述"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
        <a-form-item label="排序">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"
            :min="0"
            type="number"/>
        </a-form-item>
        <a-form-item label="启用">
          <a-checkbox-group v-decorator="['is_enabled']">
            <a-checkbox :value="1"/>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="_handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { pluginEdit } from '@/mixins'
import { IMAGE_PREFIX } from '@/config/axios.config.js'
import { updatePluginConfig } from '@/api/plugin_config'
import { ERR_OK } from '@/api/config'

export default {
  mixins: [pluginEdit],
  name: 'PaymentPluginEdit',
  created() {
    this._getPluginConfig().then((data) => {
      const attributes = this.pluginConfig.attributes
      this.$nextTick(() => {
        this.setFormFieldsValue({
          appSecret: attributes.appSecret,
          appId: attributes.appId,
          description: attributes.description,
          fee: attributes.fee,
          feeType: attributes.feeType,
          logo: IMAGE_PREFIX + attributes.logo,
          mch_id: attributes.mch_id,
          paymentName: attributes.paymentName,
          orders: data.orders,
          is_enabled: [data.is_enabled]
        })
      })
    })
  },
  methods: {
    _handleSubmit() {
      this.handleSubmit().then((values) => {
        const pluginConfig = {}
        pluginConfig.id = this.pluginConfig.id
        pluginConfig.orders = Number(values.orders)
        pluginConfig.is_enabled = values.is_enabled[0]
        const attributes = {
          appSecret: values.appSecret,
          appId: values.appId,
          description: values.description,
          fee: values.fee,
          feeType: values.feeType,
          logo: values.logo,
          mch_id: values.mch_id,
          paymentName: values.paymentName
        }
        pluginConfig.attributes = JSON.stringify(attributes)
        this.spinning = true
        updatePluginConfig(JSON.stringify(pluginConfig)).then((res) => {
          if (res.err_code === ERR_OK) {
            this.spinning = false
            this.$router.back()
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  position: relative;

  .logo-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
