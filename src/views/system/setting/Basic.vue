<template>
  <a-form :form="form" v-bind="formLayout">
    <a-form-item label="网站名称">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'siteName',
          {
            rules: [{ required: true, message: '请输入网站名称!' }]
          }
        ]"
        placeholder="请输入网站名称"
      />
    </a-form-item>
    <a-form-item label="网站网址">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'siteUrl',
          {
            rules: [{ required: true, message: '请输入网站网址!' }]
          }
        ]"
        placeholder="请输入网站网址"
      />
    </a-form-item>
    <a-form-item label="logo">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'logo',
          {
            rules: [{ required: true, message: '请上传logo!' }]
          }
        ]"
        placeholder="请上传logo"
      />
      <a-button type="primary" class="margin-5px">选择文件</a-button>
      <a>查看</a>
    </a-form-item>
    <a-form-item label="热门搜索">
      <a-input
        v-bind="inputStyle"
        v-decorator="['hotSearch']"
        placeholder="请输入热门搜索"
      />
    </a-form-item>
    <a-form-item label="联系地址">
      <a-input
        v-bind="inputStyle"
        v-decorator="['address']"
        placeholder="请输入联系地址"
      />
    </a-form-item>
    <a-form-item label="邮政编码">
      <a-input
        v-bind="inputStyle"
        v-decorator="['zipCode']"
        placeholder="请输入邮政编码"
      />
    </a-form-item>
    <a-form-item label="E-mail">
      <a-input
        v-bind="inputStyle"
        v-decorator="['email']"
        placeholder="请输入E-mail"
      />
    </a-form-item>
    <a-form-item label="备案号">
      <a-input
        v-bind="inputStyle"
        v-decorator="['certtext']"
        placeholder="请输入备案号"
      />
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import settingMixin from './mixin'

export default {
  name: 'BasicSetting',
  mixins: [settingMixin],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'BasicSetting' }),
      formLayout: {
        labelCol: { span: 3, sm: 6, md: 6, lg: 4, xl: 3, xxl: 3 },
        wrapperCol: { span: 8, sm: 14, md: 12, lg: 12, xl: 8, xxl: 8 }
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
          siteName,
          siteUrl,
          logo,
          hotSearch,
          address,
          zipCode,
          email,
          certtext
        } = this.$store.getters.setting
        this.form.setFieldsValue({
          siteName,
          siteUrl,
          logo,
          hotSearch,
          address,
          zipCode,
          email,
          certtext
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
            resolve(values)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.margin-5px {
  margin: 0 5px;
}
</style>
