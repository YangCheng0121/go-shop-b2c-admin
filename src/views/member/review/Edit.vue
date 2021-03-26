<template>
  <box class="padding-10px">
    <a-spin :spinning="spinning" slot="content">
      <a-form
        :form="form"
        v-bind="formLayout">
        <a-form-item label="商品">
          <a-col v-bind="formItemLayout">
            <span>{{ review.product_name }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="会员">
          <a-col v-bind="formItemLayout">
            <span>{{ review.username }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="IP">
          <a-col v-bind="formItemLayout">
            <span>{{ review.ip }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="评分">
          <a-col v-bind="formItemLayout">
            <span>{{ review.score }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="内容">
          <a-col v-bind="formItemLayout">
            <span>{{ review.content }}</span>
          </a-col>
        </a-form-item>
        <a-form-item label="设置">
          <a-col v-bind="formItemLayout">
            <a-checkbox-group
              v-decorator="['setting']">
              <a-checkbox value="is_show">
                是否显示
              </a-checkbox>
            </a-checkbox-group>
          </a-col>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <a-col v-bind="formItemLayout">
            <confirm-back @confirm="handleSubmit"/>
          </a-col>
        </a-form-item>
      </a-form>
    </a-spin>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack, UploadButton } from '@/components'
import { ERR_OK } from '@/api/config'
import { getReview, updateReview } from '@/api/review'

export default {
  components: {
    Box,
    UploadButton,
    ConfirmBack
  },
  name: 'ReviewEdit',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ReviewEdit' }),
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
      spinning: false,
      review: {}
    }
  },
  created() {
    this._getReview()
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 获取评论
     */
    _getReview() {
      this.spinning = true
      const id = this.$route.params.id
      getReview(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.review = data
          const setting = []
          if (data['is_show']) {
            setting.push('is_show')
          }
          this.$nextTick(() => {
            this.setFormFieldsValue({
              setting: setting
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
          const review = {
            id: this.review.id
          }
          const setting = values.setting
          setting.forEach((item) => {
            review[item] = 1
          })
          this._updateReview(review)
        }
      })
    },
    /**
     * 更新评论
     * @param review
     * @private
     */
    _updateReview(review) {
      this.spinning = true
      updateReview(JSON.stringify(review)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.spinning = false
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.image {
  position: relative;

  .image-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
