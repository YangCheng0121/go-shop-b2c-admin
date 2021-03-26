<template>
  <a-spin :spinning="spinning">
    <box class="add-box">
      <a-tabs type="card" default-active-key="basic" slot="content">
        <a-tab-pane key="basic" tab="基本信息" forceRender>
          <basic ref="Basic"/>
        </a-tab-pane>
        <a-tab-pane key="introduction" tab="商品介绍" forceRender>
          <introduction ref="Introduction"/>
        </a-tab-pane>
        <a-tab-pane key="image" tab="商品图片" forceRender>
          <product-image ref="Image"/>
        </a-tab-pane>
        <a-tab-pane key="parameters" tab="商品参数" forceRender>
          <parameter ref="Parameters"/>
        </a-tab-pane>
        <a-tab-pane key="attributes" tab="商品属性" forceRender>
          <attribute ref="Attributes"/>
        </a-tab-pane>
        <a-tab-pane key="specifications" tab="商品规格" forceRender>
          <specification ref="Specifications"/>
        </a-tab-pane>
      </a-tabs>
      <a-row style="width: 100%" slot="footer">
        <a-col :span="formLayout.labelCol.span"></a-col>
        <a-col :span="formLayout.wrapperCol.span">
          <confirm-back @confirm="handleConfirm"/>
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
import { addProduct } from '@/api/product'
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
  name: 'ProductAdd',
  data() {
    return {
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8, lg: 12, xl: 8 }
      },
      spinning: false
    }
  },
  created() {
    this.$store.dispatch('GetProductCategoryList').then((list) => {
      if (list && list.length) {
        const category = list[0]
        this.$store.dispatch('GetProductParametersAndAttributesAndSpecifications', category.id)
        this.$store.dispatch('SetIsSelectSpecification', false)
        this.$store.dispatch('GetCurrentProductCategory', category)
      }
    })
    this.$store.dispatch('GetAllBrandPageList')
    this.$store.dispatch('GetAllTagPageList')
    this.$store.dispatch('GetAllPromotionList')
  },
  methods: {
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

      const params = Object.assign({}, basicParam, {
        introduction: introductionParam,
        productImages: JSON.stringify(imageParam),
        parameters: JSON.stringify(parameterParam),
        attributes: JSON.stringify(attributesParam),
        specifications: JSON.stringify(specificationsParam.specifications)
      }, {
        skus: JSON.stringify(skus)
      })
      this._addProduct(params)
    },
    _addProduct(params) {
      this.spinning = true
      addProduct(params).then((res) => {
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
.add-box {
  padding: 20px;
}
</style>
