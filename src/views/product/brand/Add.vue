<template>
  <box class="padding-10px">
    <a-form :form="form" v-bind="formLayout" slot="content">
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
      <a-form-item label="类型">
        <a-col v-bind="formItemLayout">
          <a-select
            v-decorator="['type']">
            <a-select-option value="text">
              文本
            </a-select-option>
            <a-select-option value="image">
              图片
            </a-select-option>
          </a-select>
        </a-col>
      </a-form-item>
      <a-form-item label="logo">
        <a-row v-bind="formItemLayout">
          <a-col :span="14">
            <a-input
              v-decorator="['logo']"
              placeholder="请上传logo"/>
          </a-col>
          <a-col :span="6">
            <a-upload
              name="file"
              :show-upload-list="false"
              :multiple="false"
              :file-list="fileList"
              :customRequest="handleLogoUpload"
            >
              <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
            </a-upload>
            <a v-if="fileList.length" :href="fileList[0].url" target="_blank">查看</a>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="网址">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['url']"
            placeholder="请输入网址"/>
        </a-col>
      </a-form-item>
      <a-form-item label="排序">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"/>
        </a-col>
      </a-form-item>
      <a-form-item
        label="介绍"
        :label-col="{span: 3}"
        :wrapper-col="{span:21}">
        <tinymce
          v-model="introduction"
          ref="Tinymce"
          @upload="handleUpload"/>
      </a-form-item>
    </a-form>
    <a-row style="width: 100%" slot="footer">
      <a-col :span="formLayout.labelCol.span"></a-col>
      <a-col :span="formLayout.wrapperCol.span">
        <confirm-back ref="confirmBack" @confirm="handleConfirm"/>
      </a-col>
    </a-row>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack, InputDropdown } from '@/components'
import { addBrand } from '@/api/brand'
import { ERR_OK } from '@/api/config'
import introduction from '@/mixins/introduction'

export default {
  components: {
    Box,
    ConfirmBack,
    InputDropdown
  },
  mixins: [introduction],
  name: 'BrandAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'BrandAdd' }),
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
      inputStyle: {
        style: {
          width: '60%'
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.setFormFieldsValue()
    })
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue() {
      this.form.setFieldsValue({
        type: 'text'
      })
    },
    /**
     * 上传Logo处理
     */
    handleLogoUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.fileList = fileList
        this.form.setFieldsValue({
          logo: fileList[0].url
        })
      }).catch((message) => {
        this.fileList = []
        this.form.setFieldsValue({
          logo: ''
        })
        this.$message.error(message)
      })
    },
    /**
     * 添加品牌表单处理
     */
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const { name, logo, type, url, orders } = values
          const introduction = this.introduction
          this._addBrand({ name, logo, brandUrl: url, type, orders, introduction })
        }
      })
    },
    /**
     * 添加品牌
     * @param name
     * @param logo
     * @param brandUrl
     * @param type
     * @param orders
     * @param introduction
     * @private
     */
    _addBrand({ name, logo, brandUrl, type, orders, introduction }) {
      addBrand({ name, logo, brandUrl, type, orders, introduction }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
