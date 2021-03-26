const uploadMixin = {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    /**
     * 上传图片处理
     */
    handleUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.fileList = fileList
        this.form.setFieldsValue({
          icon: fileList[0]._url
        })
      }).catch((message) => {
        this.fileList = []
        this.form.setFieldsValue({
          icon: ''
        })
        this.$message.error(message)
      })
    }
  }
}

export default uploadMixin
