<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form
        :form="form"
        v-bind="formLayout">
        <a-form-item label="商品">
          <a-col v-bind="formItemLayout">
            <span>{{ consultation.product_name }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="会员">
          <a-col v-bind="formItemLayout">
            <span>{{ consultation.username }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="IP">
          <a-col v-bind="formItemLayout">
            <span>{{ consultation.ip }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="内容">
          <a-col v-bind="formItemLayout">
            <span>{{ consultation.content }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label=" " :colon="false" v-if="consultation.for_consultation">
          <a-col v-bind="formItemLayout" v-for="(item,index) in consultation.for_consultation" :key="index">
            <span>{{ item.content }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="回复">
          <a-col v-bind="formItemLayout">
            <a-textarea
              placeholder="请输入回复内容"
              v-decorator="[
                'reply',
                { rules: [{ required: true, message: '请输入回复内容!' }] },
              ]"
              :auto-size="{ minRows: 6, maxRows: 12 }"
            />
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
import { getConsultation, updateConsultation } from '@/api/consultation'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'ConsultationReply',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ConsultationReply' }),
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
      consultation: {}
    }
  },
  created() {
    this._getConsultation()
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 获取咨询
     */
    _getConsultation() {
      this.spinning = true
      const id = this.$route.params.id
      getConsultation(id).then((res) => {
        if (res.err_code === ERR_OK) {
          this.consultation = res.data
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
          const consultation = {
            id: this.consultation.id,
            reply: values.reply
          }
          this._updateConsultation(consultation)
        }
      })
    },
    /**
     * 更新咨询
     * @param consultation
     * @private
     */
    _updateConsultation(consultation) {
      this.spinning = true
      updateConsultation(JSON.stringify(consultation)).then((res) => {
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
