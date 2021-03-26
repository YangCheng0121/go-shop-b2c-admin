<template>
  <a-form :form="form" v-bind="formLayout">
    <a-form-item label="是否开放注册:">
      <a-checkbox-group
        v-decorator="['isRegisterEnabled']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="注册初始积分:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'registerPoint',
          {
            rules: [{ required: true, message: '请输入注册初始积分!' }]
          }
        ]"/>
    </a-form-item>
    <a-form-item label="验证密码类型:">
      <a-checkbox-group
        v-decorator="['captchaTypes']">
        <a-checkbox value="memberLogin">
          会员登录
        </a-checkbox>
        <a-checkbox value="memberRegister">
          会员注册
        </a-checkbox>
        <a-checkbox value="adminLogin">
          后台登录
        </a-checkbox>
        <a-checkbox value="review">
          商品评论
        </a-checkbox>
        <a-checkbox value="consultation">
          商品咨询
        </a-checkbox>
        <a-checkbox value="forgotPassword">
          忘记密码
        </a-checkbox>
        <a-checkbox value="resetPassword">
          忘记密码
        </a-checkbox>
        <a-checkbox value="other">
          其它
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="最大登录失败尝试次数:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[ 'maxFailedLoginAttempts']"/>
    </a-form-item>
    <a-form-item label="最大登录失败尝试次数:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'passwordLockTime',
          {
            rules: [{ required: true, message: '请输入最大登录失败尝试次数!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="安全密钥有效时间:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'safeKeyExpiryTime',
          {
            rules: [{ required: true, message: '请输入最大登录失败尝试次数!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="上传文件最大限制:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'uploadMaxSize',
          {
            rules: [{ required: true, message: '请输入最大登录失败尝试次数!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="允许上传图片扩展名:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[ 'uploadImageExtension']"/>
    </a-form-item>
    <a-form-item label="允许上传媒体扩展名:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[ 'uploadMediaExtension']"/>
    </a-form-item>
    <a-form-item label="允许上传文件扩展名:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[ 'uploadFileExtension']"/>
    </a-form-item>
    <a-form-item label="图片上传路径:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'imageUploadPath',
          {
            rules: [{ required: true, message: '请输入图片上传路径!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="媒体上传路径:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'mediaUploadPath',
          {
            rules: [{ required: true, message: '请输入媒体上传路径!' }]
          }]"/>
    </a-form-item>
    <a-form-item label="文件上传路径:">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'fileUploadPath',
          {
            rules: [{ required: true, message: '请输入文件上传路径!' }]
          }]"/>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
  import settingMixin from './mixin'

  export default {
    name: 'RegisterSafe',
    mixins: [settingMixin],
    data() {
      return {
        form: this.$form.createForm(this, { name: 'RegisterSafe' }),
        formLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 }
        },
        inputStyle: {
          style: {
            width: '30%'
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
            isRegisterEnabled,
            registerPoint,
            captchaTypes,
            maxFailedLoginAttempts,
            passwordLockTime,
            safeKeyExpiryTime,
            uploadMaxSize,
            uploadImageExtension,
            uploadMediaExtension,
            uploadFileExtension,
            imageUploadPath,
            mediaUploadPath,
            fileUploadPath
          } = this.setting
          this.form.setFieldsValue({
            isRegisterEnabled: [isRegisterEnabled],
            registerPoint: registerPoint,
            captchaTypes: captchaTypes.split(','),
            maxFailedLoginAttempts: maxFailedLoginAttempts,
            passwordLockTime: passwordLockTime,
            safeKeyExpiryTime: safeKeyExpiryTime,
            uploadMaxSize: uploadMaxSize,
            uploadImageExtension: uploadImageExtension,
            uploadMediaExtension: uploadMediaExtension,
            uploadFileExtension: uploadFileExtension,
            imageUploadPath: imageUploadPath,
            mediaUploadPath: mediaUploadPath,
            fileUploadPath: fileUploadPath
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
              values.isRegisterEnabled = values.isRegisterEnabled[0]
              values.captchaTypes = values.captchaTypes.join(',')
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
