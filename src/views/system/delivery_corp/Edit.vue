<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        v-bind="formLayout"
        :form="form"
        slot="content">
        <a-form-item label="名称">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入名称!' }] },
            ]"
            placeholder="请输入名称"/>
        </a-form-item>
        <a-form-item label="网址">
          <a-input
            v-decorator="['url']"
            placeholder="请输入网址"/>
        </a-form-item>
        <a-form-item label="代码">
          <a-input
            v-decorator="['code']"
            placeholder="请输入代码"/>
        </a-form-item>
        <a-form-item label="排序">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"
            :min="0"
            type="number"/>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack, Tinymce, UploadButton } from '@/components'
import { getDeliveryCorp, updateDeliveryCorp } from '@/api/delivery_corp'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack,
    UploadButton,
    Tinymce
  },
  name: 'DeliveryCorpEdit',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'DeliveryCorpEdit' }),
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
      deliveryCorp: null
    }
  },
  created() {
    this._getDeliveryCorp()
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
        icon: fileList[0].url
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
     * 获取物流中心
     * @private
     */
    _getDeliveryCorp() {
      const id = this.$route.params.id
      this.spinning = true
      getDeliveryCorp(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.deliveryCorp = data
          this.$nextTick(() => {
            this.setFormFieldsValue({
              name: data.name,
              code: data.code,
              url: data.url,
              orders: data.orders
            })
          })
          this.spinning = false
        }
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const deliveryCrop = values
          deliveryCrop.id = this.deliveryCorp.id
          deliveryCrop.orders = Number(deliveryCrop.orders)
          this.spinning = true
          updateDeliveryCorp(JSON.stringify(deliveryCrop)).then((res) => {
            if (res.err_code === ERR_OK) {
              this.spinning = false
              this.$router.back()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.icon {
  position: relative;

  .icon-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
