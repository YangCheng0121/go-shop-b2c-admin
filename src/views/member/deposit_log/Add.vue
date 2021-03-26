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
        <a-form-item label=" " :colon="false" v-if="member.balance">
          <a-col v-bind="formItemLayout">
            余额：{{ member.balance }}员
          </a-col>
        </a-form-item>
        <a-form-item label="调整值">
          <a-col v-bind="formItemLayout">
            <a-tooltip>
              <template slot="title">
                正数代表预存充值，负数表示预存款扣除
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
import { addDepositLog } from '@/api/deposit_log'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'DepositLogAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'DepositLogAdd' }),
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
      member: {}
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
            pointLog.detinyint = Math.abs(adjustedValue)
          }
          if (adjustedValue === 0) {
            this.$message.error('调整值不能为0!')
            return
          }
          this._addDepositLog(pointLog)
        }
      })
    },
    /**
     * 添加预存款记录
     * @private
     * @param pointLog
     */
    _addDepositLog(pointLog) {
      this.spinning = true
      addDepositLog(JSON.stringify(pointLog)).then((res) => {
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
