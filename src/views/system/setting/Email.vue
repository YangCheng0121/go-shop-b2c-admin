<template>
  <a-form :form="form" v-bind="formLayout">
    <a-form-item label="SMTP服务器地址:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'smtpHost',
          {
            rules: [{ required: true, message: '请输入SMTP服务器地址!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="SMTP服务器端口:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'smtpPort',
          {
            rules: [{ required: true, message: '请输入SMTP服务器端口!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="SMTP用户名:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'smtpUsername',
          {
            rules: [{ required: true, message: '请输入SMTP用户名!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="SMTP密码:">
      <a-input
        v-bind="inputStyle"
        v-decorator="['smtpPassword']"/>
    </a-form-item>
    <a-form-item label="SMTP是否启用SSL:">
      <a-checkbox-group
        v-decorator="['smtpSSLEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="发件人邮箱:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'smtpFromMail',
          {
            rules: [{ required: true, message: '请输入发件人邮箱!' }]
          }]"/>
    </a-form-item>
    <a-form-item label=" " :colon="false">
      <a>[邮件测试]</a>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
  import settingMixin from './mixin'

  export default {
    name: 'EmailSetting',
    mixins: [settingMixin],
    data() {
      return {
        form: this.$form.createForm(this, { name: 'EmailSetting' }),
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
            smtpHost,
            smtpPort,
            smtpUsername,
            smtpPassword,
            smtpSSLEnabled,
            smtpFromMail
          } = this.setting

          this.form.setFieldsValue({
            smtpHost: smtpHost,
            smtpPort: smtpPort,
            smtpUsername: smtpUsername,
            smtpPassword: smtpPassword,
            smtpSSLEnabled: [smtpSSLEnabled],
            smtpFromMail: smtpFromMail
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
              values.smtpSSLEnabled = values.smtpSSLEnabled[0]
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
