<template>
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
    <a-form-item label="密码">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'password1',
            { rules: [{ required: true, message: '请输入密码!' }] },
          ]"
          type="password"
          placeholder="请输入密码"/>
      </a-col>
    </a-form-item>
    <a-form-item label="确认密码">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'password2',
            { rules: [{ required: true, message: '请输入确认密码!' }] },
          ]"
          type="password"
          placeholder="请输入确认密码"/>
      </a-col>
    </a-form-item>
    <a-form-item label="邮件">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'email',
            { rules: [
              {
                type: 'email',
                message: '无效的邮件格式',
              },
              {
                required: true,
                message: '请输入邮件!'
              }
            ]},
          ]"
          placeholder="请输入邮件"/>
      </a-col>
    </a-form-item>
    <a-form-item label="手机">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'phone',
            { rules: [{ required: true, message: '请输入手机!' }] },
          ]"
          :min="0"
          type="number"
          placeholder="请输入手机"/>
      </a-col>
    </a-form-item>
    <a-form-item label="会员等级">
      <a-col v-bind="formItemLayout">
        <a-select
          v-decorator="['rank']"
          style="width: 120px">
          <a-select-option v-for="rank in memberRankList" :key="rank.id" :value="rank.id">
            {{ rank.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-form-item>
    <a-form-item label="设置">
      <a-col v-bind="formItemLayout">
        <a-checkbox-group v-decorator="['setting']">
          <a-checkbox value="is_enabled">是否启用</a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { mapGetters } from 'vuex'

export default {
  name: 'Basic',
  computed: {
    ...mapGetters([
      'member'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'Basic' }),
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
      memberRankList: []
    }
  },
  created() {
    this.$store.dispatch('GetAllMemberRank').then((data) => {
      this.memberRankList = data
      this.$nextTick(() => {
        this.setFormFieldsValue({
          rank: data[0].id
        })
      })
    })
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
            const member = {
              username: values.username,
              name: values.name,
              email: values.email,
              password1: values.password1,
              password2: values.password2,
              member_rank_id: values.rank,
              phone: values.phone
            }
            const setting = values.setting || []
            setting.forEach((item) => {
              member[item] = 1
            })
            resolve(member)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
