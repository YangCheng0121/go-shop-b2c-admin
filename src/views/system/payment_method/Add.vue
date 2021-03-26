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
        <a-form-item label="类型">
          <a-select
            v-decorator="['type']"
            placeholder="请选择类型">
            <a-select-option :value="0">
              款到发货
            </a-select-option>
            <a-select-option :value="1">
              货到付款
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="方式">
          <a-select
            v-decorator="['method']"
            placeholder="请选择方式">
            <a-select-option :value="0">
              在线支付
            </a-select-option>
            <a-select-option :value="1">
              线下支付
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="超时时间">
          <a-input
            v-decorator="['timeout']"
            placeholder="请输入超时时间"
            type="number"/>
        </a-form-item>
        <a-form-item label="图标">
          <div class="icon">
            <a-input
              v-decorator="['icon']"
              placeholder="请上传icon"/>
            <div class="icon-right">
              <upload-button @upload="_uploadImage"/>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="介绍">
          <a-input
            v-decorator="['description']"
            placeholder="请输入介绍"/>
        </a-form-item>
        <a-form-item label="排序">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"/>
        </a-form-item>
        <a-form-item label="内容" v-bind="contentFormItemLayout">
          <tinymce
            v-model="content"
            ref="Tinymce"
            @upload="handleUpload"/>
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
import { addPaymentMethod } from '@/api/payment_method'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack,
    UploadButton,
    Tinymce
  },
  name: 'PaymentMethodAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'PaymentMethodAdd' }),
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
      contentFormItemLayout: {
        wrapperCol: {
          span: 20,
          md: 24,
          xl: 20
        }
      },
      spinning: false,
      paymentMethod: null,
      content: null
    }
  },
  created() {
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
     * 提交表单
     */
    handleSubmit() {
      this.spinning = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const paymentMethod = values
          paymentMethod.orders = Number(paymentMethod.orders)
          paymentMethod.timeout = Number(paymentMethod.timeout)
          paymentMethod.content = this.content
          addPaymentMethod(JSON.stringify(paymentMethod)).then((res) => {
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
