import { Box, ConfirmBack, Tinymce, UploadButton } from '@/components'
import { ERR_OK } from '@/api/config'
import { getPluginConfig } from '@/api/plugin_config'

const pluginEdit = {
  components: {
    Box,
    ConfirmBack,
    UploadButton,
    Tinymce
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'PluginEdit' }),
      formLayout: {
        labelCol: {
          span: 3,
          sm: 6,
          md: 6,
          xl: 3
        },
        wrapperCol: {
          span: 6,
          sm: 10,
          md: 10,
          xl: 6
        }
      },
      spinning: false,
      pluginConfig: null
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    _uploadImage(fileList) {
      this.setFormFieldsValue({
        logo: fileList[0].url
      })
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
          success(item.thumbUrl)
        })
      })
    },
    /**
     * 获取插件
     * @private
     */
    _getPluginConfig() {
      return new Promise(resolve => {
        const id = this.$route.params.id
        this.spinning = true
        getPluginConfig(id).then((res) => {
          if (res.err_code === ERR_OK) {
            const data = res.data
            this.pluginConfig = data
            if (data.attributes) {
              this.pluginConfig.attributes = JSON.parse(data.attributes)
            }
            resolve(this.pluginConfig)
            this.spinning = false
          }
        })
      })
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

export default pluginEdit
