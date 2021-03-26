<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form
        :form="form"
        v-bind="formLayout">
        <a-form-item label="类型">
          <a-col v-bind="formItemLayout">
            <span>{{ messageConfig.type_name }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="是否启用邮件">
          <a-col v-bind="formItemLayout">
            <a-checkbox-group
              v-decorator="['is_mail_enabled']">
              <a-checkbox :value="1"/>
            </a-checkbox-group>
          </a-col>
        </a-form-item>
        <a-form-item label="是否启用短信">
          <a-col v-bind="formItemLayout">
            <a-checkbox-group
              v-decorator="['is_sms_enabled']">
              <a-checkbox :value="1"/>
            </a-checkbox-group>
          </a-col>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <a-col v-bind="formItemLayout">
            <confirm-back @confirm="handleSubmit"/>
          </a-col>
        </a-form-item>
      </a-form>
    </a-spin>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack, UploadButton } from '@/components'
import { ERR_OK } from '@/api/config'
import { getMessageConfig, updateMessageConfig } from '@/api/message_config'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'MessageConfigEdit',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'MessageConfigEdit' }),
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      },
      formItemLayout: {
        span: 14,
        md: 24,
        lg: 24,
        xl: 14
      },
      spinning: false,
      messageConfig: {}
    }
  },
  created() {
    this._getMessageConfig()
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 获取消息配置
     */
    _getMessageConfig() {
      this.spinning = true
      const id = this.$route.params.id
      getMessageConfig(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.messageConfig = data
          this.$nextTick(() => {
            this.setFormFieldsValue({
              is_mail_enabled: [data.is_mail_enabled],
              is_sms_enabled: [data.is_sms_enabled]
            })
          })
          this.spinning = false
        }
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const messageConfig = {
            id: this.messageConfig.id,
            is_mail_enabled: Number(values.is_mail_enabled[0]),
            is_sms_enabled: Number(values.is_sms_enabled[0])
          }
          this._updateMessageConfig(messageConfig)
        }
      })
    },
    /**
     * 更新消息配置
     * @param messageConfig
     * @private
     */
    _updateMessageConfig(messageConfig) {
      this.spinning = true
      updateMessageConfig(JSON.stringify(messageConfig)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.spinning = false
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
