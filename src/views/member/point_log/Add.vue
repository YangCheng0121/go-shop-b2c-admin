<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form
        :form="form"
        v-bind="formLayout">
        <a-form-item label="用户名">
          <a-col v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入用户名!' }] },
              ]"
              placeholder="请输入用户名"/>
          </a-col>
        </a-form-item>
        <a-form-item label="调整值">
          <a-col v-bind="formItemLayout">
            <a-tooltip>
              <template slot="title">
                正数代表积分增加，负数表示积分扣除
              </template>
              <a-input
                v-decorator="[
                  'adjusted_value',
                  { rules: [{ required: true, message: '请输入调整值!' }] },
                ]"
                type="number"
                placeholder="请输入调整值"/>
            </a-tooltip>
          </a-col>
        </a-form-item>
        <a-form-item label="备注">
          <a-col v-bind="formItemLayout">
            <a-input
              v-decorator="['memo']"
              placeholder="请输入备注"/>
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
import { Box, UploadButton, ConfirmBack } from '@/components'
import { ERR_OK } from '@/api/config'
import { addPointLog } from '@/api/point_log'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'PointLogAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'PointLogAdd' }),
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
      spinning: false
    }
  },
  created() {
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const pointLog = {
            member: values.username,
            memo: values.memo
          }
          const adjustedValue = Number(values.adjusted_value)
          if (adjustedValue > 0) {
            pointLog.credit = Math.abs(adjustedValue)
          }
          if (adjustedValue < 0) {
            pointLog.debit = Math.abs(adjustedValue)
          }
          if (adjustedValue === 0) {
            this.$message.error('调整值不能为0!')
            return
          }
          this._addPointLog(pointLog)
        }
      })
    },
    /**
     * 添加积分记录
     * @private
     * @param pointLog
     */
    _addPointLog(pointLog) {
      this.spinning = true
      addPointLog(JSON.stringify(pointLog)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.spinning = false
          this.$router.back()
        } else {
          this.$message.error(res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.image {
  position: relative;

  .image-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
