<template>
  <a-form
    :form="form"
    v-bind="formLayout">
    <a-form-item label="商品分类">
      <a-col v-bind="inputLayout">
        <input-dropdown
          v-decorator="[
            'productCategory',
            {
              valuePropName: 'productCategory'
            }
          ]"
          placeholder="请选择商品分类"
          @change="handleInputChange"
          :default-value="productCategory.name"
          :dropdown-data="treeDataProductCategoryList"/>
      </a-col>
    </a-form-item>
    <a-form-item label="类型">
      <a-col v-bind="inputLayout">
        <a-select
          v-decorator="['type']"
          placeholder="请选择类型">
          <a-select-option v-for="(type,index) in productTypes" :key="index" :value="type.value">
            {{ type.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-form-item>
    <a-form-item label="名称">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称!' }] },
          ]"
          placeholder="请输入名称"/>
      </a-col>
    </a-form-item>
    <a-form-item label="副标题">
      <a-col v-bind="inputLayout">
        <a-textarea
          v-decorator="['caption']"
          autosize
          placeholder="请输入副标题"/>
      </a-col>
    </a-form-item>
    <a-form-item label="售价" v-if="!isSelectSpecification">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="[
            'price',
            { rules: [{ required: true, message: '请输入售价!' }] },
          ]"
          placeholder="请输入售价"/>
      </a-col>
    </a-form-item>
    <a-form-item label="成本价" v-if="!isSelectSpecification">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['cost']"
          type="number"
          :min="0"
          placeholder="请输入成本价"/>
      </a-col>
    </a-form-item>
    <a-form-item label="市场价" v-if="!isSelectSpecification">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['marketPrice']"
          type="number"
          :min="0"
          placeholder="请输入市场价"/>
      </a-col>
    </a-form-item>
    <a-form-item label="展示图片">
      <a-upload
        v-decorator="[
          'image',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        list-type="picture-card"
        :customRequest="handleUpload"
        :remove="handleRemove"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </a-form-item>
    <a-form-item label="单位">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['unit']"
          placeholder="请输入单位"/>
      </a-col>
    </a-form-item>
    <a-form-item label="重量">
      <a-col v-bind="inputLayout">
        <a-tooltip>
          <template slot="title">
            单位/克
          </template>
          <a-input
            v-decorator="['weight']"
            placeholder="请输入重量"
            :min="0"
            type="number"/>
        </a-tooltip>
      </a-col>
    </a-form-item>
    <a-form-item label="赠送积分">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['rewardPoint']"
          placeholder="请输入赠送积分"
          :min="0"
          type="number"/>
      </a-col>
    </a-form-item>
    <a-form-item label="库存" v-if="!isSelectSpecification">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="[
            'stock',
            { rules: [{ required: true, message: '请输入库存!' }] }
          ]"
          placeholder="请输入库存"/>
      </a-col>
    </a-form-item>
    <a-form-item label="品牌">
      <a-col v-bind="inputLayout">
        <a-select
          v-decorator="[
            'brandId',
            { rules: [{ required: true, message: '请选择品牌!' }] },
          ]"
          placeholder="请选择品牌">
          <a-select-option v-for="brand in brandPageList.list" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-form-item>
    <a-form-item label="促销">
      <a-checkbox-group v-decorator="['promotions']">
        <a-checkbox v-for="promotion in promotionPageList.list" :key="promotion.id" :value="promotion.id">
          {{ promotion.name }}
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="商品标签">
      <a-checkbox-group v-decorator="['tags']">
        <a-checkbox v-for="tag in tagPageList.list" :key="tag.id" :value="tag.id">{{ tag.name }}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="设置">
      <a-checkbox-group v-decorator="['attrs']">
        <a-checkbox v-for="attr in productAttrs" :value="attr.key" :key="attr.key">
          {{ attr.label }}
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="备注">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['memo']"
          placeholder="请输入备注"/>
      </a-col>
    </a-form-item>
    <a-form-item label="搜索关键词">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['keyword']"
          placeholder="请输入搜索关键词"/>
      </a-col>
    </a-form-item>
    <a-form-item label="页面标题">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['seoTitle']"
          placeholder="请输入页面关键词"/>
      </a-col>
    </a-form-item>
    <a-form-item label="页面关键词">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['seoKeywords']"
          placeholder="请输入页面关键词"/>
      </a-col>
    </a-form-item>
    <a-form-item label="搜索页面描述">
      <a-col v-bind="inputLayout">
        <a-input
          v-decorator="['seoDescription']"
          placeholder="请输入页面描述"/>
      </a-col>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { ConfirmBack, InputDropdown } from '@/components'
import { mapGetters } from 'vuex'
import upload from '@/mixins/upload'
import { v4 as uuidv4 } from 'uuid'
import { setImagePrefix } from '@/utils/helper/image'

export default {
  components: {
    ConfirmBack,
    InputDropdown
  },
  name: 'ProductBasic',
  mixins: [upload],
  computed: {
    ...mapGetters([
      'productAttrs',
      'treeDataProductCategoryList',
      'productCategory',
      'brandPageList',
      'tagPageList',
      'isSelectSpecification',
      'promotionPageList',
      'productTypes'
    ])
  },
  watch: {
    treeDataProductCategoryList() {
      this.$nextTick(() => {
        this.setFormFieldsValue({
          productCategory: this.treeDataProductCategoryList[0],
          type: 'general' // 默认普通商品
        })
      })
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ProductBasic' }),
      fetching: false, // 是否搜索
      brandOpen: false, // brand Select open status
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8, md: 16, lg: 12, xl: 8 }
      },
      inputLayout: {
        span: 12
      }
    }
  },
  methods: {
    /**
     * 商品分类改变时处理
     */
    handleInputChange(category) {
      this.$store.dispatch('GetProductParametersAndAttributesAndSpecifications', category.id)
    },
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      if (form.image) {
        this.fileList = form.image
        form.image = setImagePrefix(form.image)
      }
      this.form.setFieldsValue(form)
    },
    /**
     * 上传图片处理
     */
    handleUpload(e) {
      const file = e.file
      this.$store.dispatch('UploadImage', file).then((fileList) => {
        this.fileList = fileList
        this.form.setFieldsValue({
          image: setImagePrefix(fileList)
        })
      }).catch((message) => {
        this.fileList = []
        this.form.setFieldsValue({
          image: []
        })
        this.$message.error(message)
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const productCategoryId = values.productCategory && values.productCategory.id
            const { attrs, tags } = values
            const productAttrs = {}
            if (attrs) {
              attrs.forEach((item) => {
                productAttrs[item] = 1
              })
            }
            let image
            if (values.image && values.image.length) {
              image = this.fileList[0]['medium']
            }
            const skus = []
            if (values.price) {
              skus.push({
                id: uuidv4(),
                specification_values: ',',
                specification_values_arr: [],
                price: Number(values.price),
                market_price: Number(values.marketPrice),
                cost: Number(values.cost),
                stock: Number(values.stock)
              })
            }
            const params = {
              productCategoryId: productCategoryId,
              productType: values.type,
              name: values.name,
              caption: values.caption,
              skus: skus,
              image: image,
              weight: Number(values.weight),
              unit: values.unit,
              rewardPoint: Number(values.rewardPoint),
              brandId: values.brandId,
              tags: tags ? tags.join(',') : null,
              memo: values.memo,
              keyword: values.keyword,
              seoTitle: values.seoTitle,
              seoKeywords: values.seoKeywords,
              seoDescription: values.seoDescription,
              promotions: values.promotions ? values.promotions.join(',') : null,
              ...productAttrs
            }
            resolve(params)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.add-box {
  padding: 20px 20px 0 20px;
}
</style>
