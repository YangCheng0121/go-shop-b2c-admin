<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
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
        <a-form-item label="优惠比例">
          <a-col v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'scale',
                { rules: [{ required: true, message: '请输入优惠比例!' }] },
              ]"
              :min="0"
              type="number"
              placeholder="请输入优惠比例"/>
          </a-col>
        </a-form-item>
        <a-form-item label="消费金额">
          <a-col v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'amount',
                { rules: [{ required: true, message: '请输入消费金额!' }] },
              ]"
              :min="0"
              type="number"
              placeholder="请输入消费金额"/>
          </a-col>
        </a-form-item>
        <a-form-item label="设置">
          <a-col v-bind="formItemLayout">
            <a-checkbox-group
              v-decorator="['setting']">
              <a-checkbox value="is_default">
                是否默认
              </a-checkbox>
              <a-checkbox value="is_special">
                是否特殊
              </a-checkbox>
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
import { Box, UploadButton, ConfirmBack } from '@/components'
import { addMemberRank } from '@/api/member_rank'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'RankAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'RankEdit' }),
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
          const member = {
            name: values.name,
            scale: Number(values.scale),
            amount: Number(values.amount)
          }
          const setting = values.setting || []
          if (setting['is_default']) {
            member['is_default'] = 1
          }
          if (setting['is_special']) {
            member['is_special'] = 1
          }
          this._addMemberRank(member)
        }
      })
    },
    /**
     * 添加会员等级
     * @param member
     * @private
     */
    _addMemberRank(member) {
      this.spinning = true
      addMemberRank(JSON.stringify(member)).then((res) => {
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
.image {
  position: relative;

  .image-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
