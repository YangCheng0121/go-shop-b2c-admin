<template>
  <a-form :form="form" v-bind="formLayout">
    <a-form-item label="区域设置">
      <a-col :span="8">
        <a-select v-decorator="['locale']">
          <a-select-option value="zh_CN">
            中文(简体, 中国)
          </a-select-option>
          <a-select-option value="zh_TW">
            中文(繁体, 台湾)
          </a-select-option>
        </a-select>
      </a-col>
    </a-form-item>
    <a-form-item label="商品图片(大):" type="flex" required>
      <a-form :form="largeProductImageForm" layout="inline">
        <a-form-item label="宽度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'largeProductImageWidth',
                {
                  rules: [{ required: true, message: '请输入宽度!' }]
                }
              ]"
              placeholder="请输宽度"
            />
          </a-col>
        </a-form-item>
        <a-form-item label="高度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'largeProductImageHeight',
                {
                  rules: [{ required: true, message: '请输入高度!' }]
                }
              ]"
              placeholder="请输高度"
            />
          </a-col>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="商品图片(中):" type="flex" required>
      <a-form :form="mediumProductImageForm" layout="inline">
        <a-form-item label="宽度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'mediumProductImageWidth',
                {
                  rules: [{ required: true, message: '请输入宽度!' }]
                }
              ]"
              placeholder="请输宽度"
            />
          </a-col>
        </a-form-item>
        <a-form-item label="高度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'mediumProductImageHeight',
                {
                  rules: [{ required: true, message: '请输入高度!' }]
                }
              ]"
              placeholder="请输高度"
            />
          </a-col>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="商品图片(缩略):" type="flex" required>
      <a-form :form="thumbnailProductImageForm" layout="inline">
        <a-form-item label="宽度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'thumbnailProductImageWidth',
                {
                  rules: [{ required: true, message: '请输入宽度!' }]
                }
              ]"
              placeholder="请输宽度"
            />
          </a-col>
        </a-form-item>
        <a-form-item label="高度:">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'thumbnailProductImageHeight',
                {
                  rules: [{ required: true, message: '请输入高度!' }]
                }
              ]"
              placeholder="请输高度"
            />
          </a-col>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="默认商品图片(大):">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'defaultLargeProductImage',
          {
            rules: [{ required: true, message: '请上传图片!' }]
          }
        ]"
        placeholder="请上传图片"
      />
      <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
      <a>查看</a>
    </a-form-item>
    <a-form-item label="默认商品图片(中):">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'defaultMediumProductImage',
          {
            rules: [{ required: true, message: '请上传图片!' }]
          }
        ]"
        placeholder="请上传图片"
      />
      <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
      <a>查看</a>
    </a-form-item>
    <a-form-item label="默认商品图片(缩略):">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'defaultThumbnailProductImage',
          {
            rules: [{ required: true, message: '请上传图片!' }]
          }
        ]"
        placeholder="请上传图片"
      />
      <a-button type="primary" class="margin-left-5px margin-right-5px">选择文件</a-button>
      <a>查看</a>
    </a-form-item>
    <a-form-item label="水印透明度">
      <a-tooltip placement="rightBottom">
        <template slot="title">
          取值范围0-100, 0表示完全透明
        </template>
        <a-input
          v-bind="inputStyle"
          v-decorator="[
            'watermarkAlpha',
            {
              rules: [{ required: true, message: '请输入网站网址!' }]
            }
          ]"
          placeholder="请输入水印透明度"
        />
      </a-tooltip>
    </a-form-item>
    <a-form-item label="水印图片">
      <a-upload
        v-decorator="[
          'watermarkImageFile',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        :multiple="false"
        :customRequest="handleUpload"
      >
        <a-button>
          <a-icon type="upload"/>
          选择文件
        </a-button>
        <span class="padding-left-10px padding-right-10px">未选择任何文件</span>
        <a class="padding-left-10px padding-right-10px">查看</a>
      </a-upload>
    </a-form-item>
    <a-form-item label="水印位置">
      <a-select
        v-decorator="['watermarkPosition']"
        style="width: 120px">
        <a-select-option value="NO">
          无
        </a-select-option>
        <a-select-option value="topLeft">
          左上
        </a-select-option>
        <a-select-option value="topRight">
          右上
        </a-select-option>
        <a-select-option value="center">
          居中
        </a-select-option>
        <a-select-option value="bottomLeft">
          左下
        </a-select-option>
        <a-select-option value="bottomRight">
          右下
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="价格精确到两位小数">
      <a-select
        v-decorator="['priceScale']"
        style="width: 120px">
        <a-select-option value="0">
          无小数位
        </a-select-option>
        <a-select-option value="1">
          1位小数
        </a-select-option>
        <a-select-option value="2">
          2位小数
        </a-select-option>
        <a-select-option value="3">
          3位小数
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="价格精确方式">
      <a-select
        v-decorator="['priceRoundType']"
        style="width: 120px">
        <a-select-option value="ROUND_HALF_UP">
          四舍五入
        </a-select-option>
        <a-select-option value="ROUND_UP">
          向上取整
        </a-select-option>
        <a-select-option value="ROUND_DOWN">
          向下取整
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="是否前台显示市场价:">
      <a-checkbox-group
        v-decorator="['isShowMarketPrice']">
        <a-checkbox value="true"/>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="默认市场价换算比例">
      <a-input
        v-bind="inputStyle"
        v-decorator="[
          'defaultMarketPriceScale',
          {
            rules: [{ required: true, message: '请输入默认市场价换算比例!' }]
          }
        ]"
        placeholder="请输入水印透明度"
      />
    </a-form-item>
  </a-form>
</template>

<script type="es6">
  import settingMixin from './mixin'

  // TODO 水印图片上传
  export default {
    name: 'DisplaySetting',
    mixins: [settingMixin],
    data() {
      return {
        form: this.$form.createForm(this, { name: 'DisplaySetting' }),
        largeProductImageForm: this.$form.createForm(this, { name: 'largeProductImageForm' }),
        mediumProductImageForm: this.$form.createForm(this, { name: 'mediumProductImageForm' }),
        thumbnailProductImageForm: this.$form.createForm(this, { name: 'thumbnailProductImageForm' }),
        formLayout: {
          labelCol: { span: 4, md: 6, lg: 6, xl: 4, xxl: 4 },
          wrapperCol: { span: 10, md: 18, lg: 18, xl: 16, xxl: 10 }
        },
        inputStyle: {
          style: {
            width: '70%'
          }
        },
        fileList: []
      }
    },
    methods: {
      normFile(e) {
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      /**
       * 设置表单的 Filed Value
       */
      setFormFieldsValue() {
        if (Object.keys(this.setting).length) {
          const {
            locale,
            largeProductImageWidth,
            largeProductImageHeight,
            mediumProductImageWidth,
            mediumProductImageHeight,
            thumbnailProductImageWidth,
            thumbnailProductImageHeight,
            defaultLargeProductImage,
            defaultMediumProductImage,
            defaultThumbnailProductImage,
            watermarkAlpha,
            watermarkImageFile,
            watermarkPosition,
            priceScale,
            priceRoundType,
            isShowMarketPrice,
            defaultMarketPriceScale
          } = this.setting
          this.form.setFieldsValue({
            locale: locale,
            defaultLargeProductImage: defaultLargeProductImage,
            defaultMediumProductImage: defaultMediumProductImage,
            defaultThumbnailProductImage: defaultThumbnailProductImage,
            watermarkAlpha: watermarkAlpha,
            watermarkImageFile: watermarkImageFile || [],
            watermarkPosition: watermarkPosition,
            priceScale: priceScale,
            priceRoundType: priceRoundType,
            isShowMarketPrice: [isShowMarketPrice],
            defaultMarketPriceScale: defaultMarketPriceScale
          })
          this.largeProductImageForm.setFieldsValue({
            largeProductImageWidth: largeProductImageWidth,
            largeProductImageHeight: largeProductImageHeight
          })
          this.mediumProductImageForm.setFieldsValue({
            mediumProductImageWidth: mediumProductImageWidth,
            mediumProductImageHeight: mediumProductImageHeight
          })
          this.thumbnailProductImageForm.setFieldsValue({
            thumbnailProductImageWidth: thumbnailProductImageWidth,
            thumbnailProductImageHeight: thumbnailProductImageHeight
          })
        }
      },
      /**
       * 提交表单
       */
      handleSubmit() {
        return new Promise(resolve => {
          let param = {}

          this.form.validateFields((err, values) => {
            if (!err) {
              values.isShowMarketPrice = values.isShowMarketPrice[0]
              values.watermarkImageFile = values.watermarkImageFile[0]
              param = Object.assign({}, param, values)
            }
          })
          this.largeProductImageForm.validateFields((err, values) => {
            if (!err) {
              param = Object.assign({}, param, values)
            }
          })
          this.mediumProductImageForm.validateFields((err, values) => {
            if (!err) {
              param = Object.assign({}, param, values)
            }
          })
          this.thumbnailProductImageForm.validateFields((err, values) => {
            if (!err) {
              param = Object.assign({}, param, values)
            }
          })
          resolve(param)
        })
      },
      /**
       * 上传图片
       */
      handleUpload() {

      }
    }
  }
</script>

<style scoped lang="less">
</style>
