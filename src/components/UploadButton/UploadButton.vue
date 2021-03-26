<template>
  <div class="upload-container">
    <a-upload
      class="upload"
      :show-upload-list="false"
      :customRequest="handleUpload">
      <a-button type="primary">选择文件</a-button>
    </a-upload>
    <a class="margin-left-5px" :href="previewImage" target="_blank">查看</a>
  </div>
</template>

<script type="es6">
import { IMAGE_PREFIX } from '@/config/axios.config.js'

export default {
  name: 'UploadButton',
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    previewImage() {
      if (this.fileList.length) {
        if (this.fileList[0].url.indexOf(IMAGE_PREFIX) === -1) {
          return IMAGE_PREFIX + this.fileList[0].url
        }
      } else if (this.image) {
        return IMAGE_PREFIX + this.image
      }
      return ''
    }
  },
  data() {
    return {
      fileList: [],
      previewVisible: false
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    /**
     * 上传图片处理
     * @param e
     */
    handleUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.$emit('upload', fileList)
      })
    },
    /**
     * 取消预览
     */
    handleCancel() {
      this.previewVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.upload-container {
  display: inline-block;
}
</style>
