import { Tinymce } from '@/components'
import { IMAGE_PREFIX } from '@/config/axios.config.js'
import upload from '@/mixins/upload'

export default {
  components: {
    Tinymce
  },
  mixins: [upload],
  name: 'Introduction',
  data() {
    return {
      introduction: ''
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.introduction = form.introduction
    },
    /**
     * 上传图片处理
     * @param blobInfo
     * @param success
     * @param failure
     */
    handleUpload({ blobInfo, success, failure }) {
      const file = blobInfo.blob()// 转化为易于理解的file对象
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        fileList.forEach((item) => {
          item.thumbUrl = IMAGE_PREFIX + item.thumbUrl
          success(item.thumbUrl)
        })
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        resolve({
          introduction: this.introduction
        })
      })
    }
  }
}
