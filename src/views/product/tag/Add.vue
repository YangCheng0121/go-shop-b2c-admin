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
      <a-form-item label="图标">
        <a-row v-bind="formItemLayout">
          <a-col :span="16">
            <a-input
              v-decorator="['icon']"
              placeholder="请上传icon"/>
          </a-col>
          <a-col :span="6">
            <a-upload
              name="file"
              :show-upload-list="false"
              :multiple="false"
              :file-list="fileList"
              :customRequest="handleUpload"
            >
              <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
            </a-upload>
            <a v-if="fileList.length" :href="fileList[0].url" target="_blank">查看</a>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="备注">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['memo']"
            placeholder="请输入备注"/>
        </a-col>
      </a-form-item>
      <a-form-item label="排序">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"/>
        </a-col>
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
import { Box, ConfirmBack } from '@/components'
import { addTag } from '@/api/tag'
import { ERR_OK } from '@/api/config'
import upload from './upload-mixin'

export default {
  components: {
    Box,
    ConfirmBack
  },
  name: 'TagAdd',
  mixins: [upload],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'TagAdd' }),
      formLayout: {
        labelCol: { span: 3, md: 3, lg: 3, xl: 3 },
        wrapperCol: { span: 8, md: 14, lg: 14, xl: 8 }
      },
      formItemLayout: {
        span: 14,
        md: 16
      }
    }
  },
  methods: {
    /**
     * 添加标签表单处理
     */
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const name = values.name
          const icon = values.icon
          const memo = values.memo
          const orders = values.orders
          this._addTag({ name, icon, memo, orders })
        }
      })
    },
    /**
     * 添加标签
     * @param name
     * @param icon
     * @param memo
     * @param orders
     * @private
     */
    _addTag({ name, icon, memo, orders }) {
      addTag({ name, icon, memo, orders }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        } else {
          this.$message.error(res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
