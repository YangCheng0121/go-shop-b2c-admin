<template>
  <a-spin :spinning="spinning">
    <box class="edit-box">
      <a-tabs type="card" default-active-key="basic" slot="content" @change="handleChange">
        <a-tab-pane key="Basic" tab="基本信息" forceRender>
          <basic ref="Basic"/>
        </a-tab-pane>
        <a-tab-pane key="Introduction" tab="商品介绍" forceRender>
          <introduction ref="Introduction"/>
        </a-tab-pane>
        <a-tab-pane key="Image" tab="商品图片" forceRender>
          <product-image ref="Image"/>
        </a-tab-pane>
        <a-tab-pane key="Parameters" tab="商品参数" forceRender>
          <parameter ref="Parameters"/>
        </a-tab-pane>
        <a-tab-pane key="Attributes" tab="商品属性" forceRender>
          <attribute ref="Attributes"/>
        </a-tab-pane>
        <a-tab-pane key="Specifications" tab="商品规格" forceRender>
          <specification ref="Specifications"/>
        </a-tab-pane>
      </a-tabs>
      <a-row style="width: 100%" slot="footer">
        <a-col :span="formLayout.labelCol.span"></a-col>
        <a-col :span="formLayout.wrapperCol.span">
          <confirm-back ref="confirmBack" @confirm="handleConfirm"/>
        </a-col>
      </a-row>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import Basic from './components/Basic'
import Introduction from './components/Introduction'
import Image from './components/Image'
import Parameter from './components/Parameters'
import Attribute from './components/Attributes'
import Specification from './components/Specifications'
import { getProduct, updateProduct } from '@/api/product'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Introduction,
    'product-image': Image,
    Parameter,
    Attribute,
    Specification,
    ConfirmBack
  },
  name: 'ProductEdit',
  data() {
    return {
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8, lg: 12, xl: 8 }
      },
      spinning: false,
      introduction: '',
      attributeValues: {},
      product: null,
      isSelect: true
    }
  },
  created() {
    this.$store.dispatch('GetProductCategoryList')
    this.$store.dispatch('GetAllBrandPageList')
    this.$store.dispatch('GetAllTagPageList')
    this.$store.dispatch('GetAllPromotionList')
  },
  mounted() {
    this._getProduct()
  },
  methods: {
    /**
     * Tabs 切换时处理
     */
    handleChange(activeKey) {
      if (activeKey !== 'Introduction') {
        this.isSelect = false
      } else {
        this.isSelect = true
        this.$nextTick(() => {
          // Introduction
          const Introduction = this.$refs.Introduction
          Introduction.setFormFieldsValue({
            introduction: this.product.introduction
          })
        })
      }
    },
    async handleConfirm() {
      const Basic = this.$refs.Basic
      const basicParam = Basic && await Basic.handleSubmit()

      const Introduction = this.$refs.Introduction
      const introductionParam = Introduction && await Introduction.handleSubmit()

      const Image = this.$refs.Image
      const imageParam = Image && await Image.handleSubmit()

      const Parameters = this.$refs.Parameters
      const parameterParam = Parameters && await Parameters.handleSubmit()

      const Attributes = this.$refs.Attributes
      const attributesParam = Attributes && await Attributes.handleSubmit()

      const Specifications = this.$refs.Specifications
      const specificationsParam = Specifications && await Specifications.handleSubmit()

      let skus
      if (basicParam.skus.length) {
        skus = basicParam.skus
      }
      if (specificationsParam.skus.length) {
        skus = specificationsParam.skus
      }

      const params = Object.assign({}, basicParam, introductionParam, {
        id: this.product.id,
        productImages: JSON.stringify(imageParam),
        parameters: JSON.stringify(parameterParam),
        attributes: JSON.stringify(attributesParam),
        specifications: JSON.stringify(specificationsParam.specifications)
      }, {
        skus: JSON.stringify(skus)
      })
      this._updateProduct(params)
    },
    _updateProduct(params) {
      this.spinning = true
      updateProduct(params).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$refs.confirmBack.back()
        }
      })
    },
    /**
     * 获取商品
     */
    _getProduct() {
      const sn = this.$route.params.sn
      this.spinning = true
      getProduct(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.product = data
          this.$store.dispatch('GetProductParametersAndAttributesAndSpecifications', data.product_category_id).then(() => {
            this.setFormFieldsValue(data)
            this.spinning = false
          })
        }
      })
    },
    /**
     * 设置各个的表单的 Filed
     */
    setFormFieldsValue(data) {
      const productCategory = {
        id: data.product_category_id,
        name: data.product_category_name
      }
      /**
       * 促销
       */
      let promotions
      if (data.promotions) {
        promotions = data.promotions.map((item) => {
          return item.id
        })
      }
      /**
       * 是否上架、是否置顶、是否列出
       */
      const attrs = []
      if (data.is_marketable) {
        attrs.push('is_marketable')
      }
      if (data.is_list) {
        attrs.push('is_list')
      }
      if (data.is_top) {
        attrs.push('is_top')
      }
      // 商品属性
      const attributes = {}
      let count = 19
      while (count > -1) {
        const key = `attribute_value_${count}`
        if (data[key]) {
          attributes[key] = data[key]
        }
        count--
      }

      // Basic
      const Basic = this.$refs.Basic
      let skus
      if (data.skus) {
        skus = data.skus.filter((sku) => {
          if (sku.specification_values !== ',') {
            return sku
          }
        })
        if (!skus.length) {
          const sku = data.skus[0]
          Basic.setFormFieldsValue({
            price: sku.price,
            cost: sku.cost,
            marketPrice: sku.market_price,
            rewardPoint: sku.reward_point,
            stock: sku.stock
          })
        }
      }
      Basic.setFormFieldsValue({
        productCategory: productCategory,
        type: data.type,
        name: data.name,
        caption: data.caption,
        image: data.image ? [data.image] : [],
        unit: data.unit,
        weight: data.weight,
        brandId: data.brand_id,
        promotions: promotions,
        tags: data.tags,
        attrs: attrs,
        memo: data.memo,
        keyword: data.keyword,
        seoTitle: data.seo_title,
        seoKeywords: data.seo_keywords,
        seoDescription: data.seo_description
      })
      this.$store.dispatch('GetCurrentProductCategory', productCategory)

      // Image
      const Image = this.$refs.Image
      Image.setFormFieldsValue({
        productImages: data.product_images
      })
      // Parameters
      const Parameters = this.$refs.Parameters
      Parameters.setFormFieldsValue({
        parameterValues: data.parameters
      })
      // Attributes
      const Attributes = this.$refs.Attributes
      Attributes.setFormFieldsValue({
        attributes: attributes
      })
      this.attributeValues = attributes

      // Specifications
      const Specifications = this.$refs.Specifications
      Specifications.setFormFieldsValue({
        skus: skus || []
      })
    }
  }
}
</script>

<style scoped lang="less">
.edit-box {
  padding: 20px;
}
</style>
