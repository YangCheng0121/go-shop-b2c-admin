import { getBase64 } from '@/utils/helper/base64'

const upload = {
  data() {
    return {
      previewVisible: false, // 是否预览
      previewImage: '', // 预览图片
      fileList: [], // 图片文件 用于辅助表单显示
      noPrefixFileList: []
    }
  },
  methods: {
    normFile(e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleCancel() {
      this.previewVisible = false
    },
    /**
     * 预览图片处理
     * @param file
     * @returns {Promise<void>}
     */
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    /**
     * 删除图片处理
     */
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.noPrefixFileList.splice(index, 1)
      this.fileList = newFileList
    }
  }
}

export default upload
