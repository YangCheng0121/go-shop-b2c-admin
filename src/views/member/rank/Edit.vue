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
import { Box, ConfirmBack, UploadButton } from '@/components'
import { getMemberRank, updateMemberRank } from '@/api/member_rank'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'RankEdit',
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
      spinning: false,
      memberRank: null
    }
  },
  created() {
    this._getMemberRank()
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 获取会员等级
     */
    _getMemberRank() {
      this.spinning = true
      const id = this.$route.params.id
      getMemberRank(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.memberRank = data
          const setting = []
          if (data['is_default']) {
            setting.push('is_default')
          }
          if (data['is_special']) {
            setting.push('is_special')
          }
          this.$nextTick(() => {
            this.setFormFieldsValue({
              name: data.name,
              scale: data.scale,
              amount: data.amount,
              setting: setting
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
          const member = {
            id: this.memberRank.id,
            name: values.name,
            scale: Number(values.scale),
            amount: Number(values.amount)
          }
          const setting = values.setting
          setting.forEach((item) => {
            member[item] = 1
          })
          this._updateMemberRank(member)
        }
      })
    },
    /**
     * 更新会员等级
     * @param member
     * @private
     */
    _updateMemberRank(member) {
      this.spinning = true
      updateMemberRank(JSON.stringify(member)).then((res) => {
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
