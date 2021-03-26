<template>
  <a-form :form="form">
    <a-form-item class="image-list">
      <a-upload
        list-type="picture-card"
        v-decorator="[
          'productImages',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        :customRequest="handleUpload"
        :remove="handleRemove"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { ConfirmBack } from '@/components'
import upload from '@/mixins/upload'
import { deepClone } from '@/utils/util'
import { setImagePrefix } from '@/utils/helper/image'

export default {
  components: {
    ConfirmBack
  },
  mixins: [upload],
  name: 'ProductImage',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ProductImage' })
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      if (form.productImages) {
        const productImages = form.productImages
        this.noPrefixFileList = this.noPrefixFileList.concat(deepClone(productImages))
        this.fileList = setImagePrefix(productImages)
        this.form.setFieldsValue({
          productImages: this.fileList
        })
      }
    },
    /**
     * 上传图片处理
     */
    handleUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.noPrefixFileList = this.noPrefixFileList.concat(deepClone(fileList))
        const cloneFileList = deepClone(this.noPrefixFileList)
        this.fileList = setImagePrefix(cloneFileList)
        this.form.setFieldsValue({
          productImages: this.fileList
        })
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err) => {
          if (!err) {
            resolve(this.noPrefixFileList)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~ant-design-vue/es/style/themes/default";

.image-list {
  padding: 10px;
  border: @border-width-base @border-style-base @border-color-base;
  border-radius: @border-radius-base;
}
</style>
