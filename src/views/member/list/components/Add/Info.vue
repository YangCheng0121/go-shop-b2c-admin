<template>
  <a-form
    :form="form"
    v-bind="formLayout">
    <a-form-item label="姓名">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['name']"
          placeholder="请输入姓名"/>
      </a-col>
    </a-form-item>
    <a-form-item label="性别">
      <a-col v-bind="formItemLayout">
        <a-radio-group
          v-decorator="[
            'gender',
            { rules: [{ required: true, message: '请选择性别!' }] },
          ]">
          <a-radio :value="0">男</a-radio>
          <a-radio :value="1">女</a-radio>
        </a-radio-group>
      </a-col>
    </a-form-item>
    <a-form-item label="电话">
      <a-col v-bind="formItemLayout">
        <a-input
          v-decorator="['mobile']"
          :min="0"
          type="number"
          placeholder="请输入电话"/>
      </a-col>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { ConfirmBack } from '@/components'

export default {
  components: {
    ConfirmBack
  },
  name: 'Basic',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'Info' }),
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
            const info = {
              name: values.name,
              gender: values.gender ? values.gender[0] : null,
              mobile: values.mobile
            }
            resolve(info)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
