<template>
  <box class="padding-10px">
    <a-form :form="form" v-bind="formLayout" slot="content">
      <a-form-item label="标题">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'title',
              { rules: [{ required: true, message: '请输入标题!' }] },
            ]"
            placeholder="请输入标题"/>
        </a-col>
      </a-form-item>
      <a-form-item label="类型">
        <a-col v-bind="formItemLayout">
          <a-select
            :defalut-value="0"
            v-decorator="[
              'type',
              { rules: [{ required: true, message: '请选择类型!' }] }
            ]"
            placeholder="请选择类型">
            <a-select-option :value="0">
              图片
            </a-select-option>
            <a-select-option :value="1">
              文本
            </a-select-option>
          </a-select>
        </a-col>
      </a-form-item>
      <a-form-item label="广告">
        <a-col v-bind="formItemLayout">
          <a-select
            v-decorator="[
              'ad_position_id',
              { rules: [{ required: true, message: '请选择广告位!' }] }
            ]"
            placeholder="请选择广告位">
            <a-select-option v-for="item in adPositionList" :value="item.id" :key="item.id">
              {{ item.name }} {{ `[${item.width} x ${item.height}]` }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-form-item>
      <a-form-item label="路径">
        <a-row v-bind="formItemLayout">
          <a-col :span="14">
            <a-input
              v-decorator="[
                'path',
                { rules: [{ required: true, message: '请上传路径!' }] },
              ]"
              placeholder="请上传路径"/>
          </a-col>
          <a-col :span="6">
            <a-upload
              name="file"
              :show-upload-list="false"
              :multiple="false"
              :file-list="fileList"
              :customRequest="handlePathUpload"
            >
              <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
            </a-upload>
            <a v-if="fileList.length" :href="fileList[0].url" target="_blank">查看</a>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="起始日期">
        <a-col v-bind="formItemLayout">
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择起始日期"
            v-decorator="['begin_date']"
            show-time
          />
        </a-col>
      </a-form-item>
      <a-form-item label="结束日期">
        <a-col v-bind="formItemLayout">
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束日期"
            v-decorator="['end_date']"
            show-time
          />
        </a-col>
      </a-form-item>
      <a-form-item label="链接地址">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['url']"
            placeholder="请输入链接地址"/>
        </a-col>
      </a-form-item>
      <a-form-item label="排序">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"
            :min="0"
            type="number"/>
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
import { Box, ConfirmBack, InputDropdown } from '@/components'
import { ERR_OK } from '@/api/config'
import introduction from '@/mixins/introduction'
import { getAd, updateAd } from '@/api/ad'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { IMAGE_PREFIX } from '@/config/axios.config.js'

export default {
  components: {
    Box,
    ConfirmBack,
    InputDropdown
  },
  mixins: [introduction],
  name: 'AdEdit',
  computed: {
    ...mapGetters([
      'adPositionList'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AdEdit' }),
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
      inputStyle: {
        style: {
          width: '60%'
        }
      },
      fileList: []
    }
  },
  created() {
    this.$store.dispatch('GetAllAdPosition').then(() => {
      this._getAd()
    })
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 上传路径处理
     */
    handlePathUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.fileList = fileList
        this.form.setFieldsValue({
          path: fileList[0].url
        })
      }).catch((message) => {
        this.fileList = []
        this.form.setFieldsValue({
          path: ''
        })
        this.$message.error(message)
      })
    },
    /**
     * 更新广告位表单
     */
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const ad = {
            id: this.$route.params.id,
            title: values.title,
            ad_position_id: values.ad_position_id,
            type: values.type,
            path: values.path,
            begin_date: values.begin_date,
            end_date: values.end_date,
            url: values.url,
            orders: Number(values.orders)
          }
          this._updateAd(ad)
        }
      })
    },
    /**
     * 获取规格
     */
    _getAd() {
      const id = this.$route.params.id
      getAd(id).then((res) => {
        if (res.err_code) {
          const data = res.data
          this.setFormFieldsValue({
            title: data.title,
            ad_position_id: data.ad_position_id,
            type: data.type,
            path: data.path,
            begin_date: data.begin_date,
            end_date: data.end_date,
            url: data.url,
            orders: data.orders
          })
          this.fileList = [{
            uid: uuidv4(),
            name: uuidv4(),
            status: 'done',
            thumbUrl: IMAGE_PREFIX + data.path,
            url: IMAGE_PREFIX + data.path
          }]
        }
      })
    },
    /**
     * 更新广告位
     * @private
     * @param ad
     */
    _updateAd(ad) {
      ad.id = Number(ad.id)
      updateAd(JSON.stringify(ad)).then((res) => {
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
