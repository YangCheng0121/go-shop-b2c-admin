<template>
  <box>
    <a-form
      :form="form"
      v-bind="formLayout"
      @submit="handleSubmit"
      class="form"
      slot="content">
      <a-form-item label="分类名称">
        <a-col v-bind="formItemLayout">
          <a-input
            placeholder="输入分类名称"
            v-decorator="['name', { rules: [{ required: true, message: '请输入分类名称!' }] }]"
          />
        </a-col>
      </a-form-item>
      <a-form-item label="上级分类">
        <a-col v-bind="formItemLayout">
          <input-dropdown
            v-decorator="[
              'parentCategory',
              {
                valuePropName: 'parentCategory',
              }]"
            :default-value="parentCategoryName"
            :dropdown-data="productCategoryList"
          />
        </a-col>
      </a-form-item>
      <a-form-item label="图片">
        <a-col v-bind="formItemLayout">
          <a-input
            placeholder="请上传图片"
            v-decorator="['image']"/>
        </a-col>
        <upload-button @upload="handleUpload" :image="image" class="margin-left-5px"/>
      </a-form-item>
      <a-form-item label="促销">
        <a-checkbox-group v-decorator="['promotionGroup']">
          <a-checkbox v-for="promotion in promotionPageList.list" :value="promotion.id" :key="promotion.id">
            {{ promotion.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="设置">
        <a-checkbox-group v-decorator="['settingGroup']">
          <a-checkbox v-for="attr in productCategoryAttrs" :value="attr.key" :key="attr.key">
            {{ attr.label }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="排序">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入数字"/>
        </a-col>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }" class="button-wrap">
        <confirm-back/>
      </a-form-item>
    </a-form>
  </box>
</template>

<script type="es6">
import { Box, InputDropdown, ConfirmBack, UploadButton } from '@/components'
import { mapGetters } from 'vuex'
import { updateProductCategory, getProductCategory } from '@/api/product_category'
import { ERR_ERROR, ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    InputDropdown,
    ConfirmBack,
    UploadButton
  },
  name: 'ProductCategoryEdit',
  computed: {
    /**
     * 上级分类列表
     */
    productCategoryList() {
      const arr = this.treeDataProductCategoryList.slice()
      arr.unshift({ name: '顶级分类' })
      return arr
    },
    /**
     * 上级分类名称
     */
    parentCategoryName() {
      if (this.productCategory && this.productCategory.parent_name) {
        return this.productCategory.parent_name
      }
      return '顶级分类'
    },
    ...mapGetters([
      'productCategory',
      'productCategoryList',
      'promotionPageList',
      'productCategoryAttrs'
    ])
  },
  created() {
    this.$store.dispatch('GetProductCategoryList')
    this.$store.dispatch('GetAllPromotionList')
    this._getProductCategory()
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ProductCategoryEdit' }),
      formLayout: {
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 17
        }
      },
      formItemLayout: {
        span: 5
      },
      image: ''
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 设置上级分类
     */
    setParentCategory(category) {
      if (category.parent_id) {
        this.parentCategory = {
          name: category.parent_name,
          id: category.parent_id
        }
      }
    },
    /**
     * 获取商品分类
     */
    _getProductCategory() {
      const id = this.$route.params.id
      getProductCategory(id).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$store.dispatch('GetCurrentProductCategory', res.data)
          this.setParentCategory(res.data)
          const category = res.data
          const promotionGroup = category.promotions ? category.promotions.map(item => parseInt(item)) : []
          const productCategoryAttrs = this.productCategoryAttrs.map((item) => {
            if (category[item.key]) {
              return item.key
            }
          })
          const filedsValue = {
            name: category.name,
            settingGroup: productCategoryAttrs,
            orders: category.orders,
            promotionGroup: promotionGroup,
            image: category.image
          }
          this.image = category.image
          this.setFormFieldsValue(filedsValue)
        }
      })
    },
    /**
     * 提交表单
     * @param e
     */
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const parentId = this.parentCategory && this.parentCategory.id
          const { orders, name, settingGroup, promotionGroup, image } = values
          const attrs = {}
          settingGroup.forEach((item) => {
            attrs[item] = 1
          })
          const promotions = promotionGroup.join(',')
          this._updateProductCategory({ name, parentId, orders, promotions, image }, attrs)
        }
      })
    },
    /**
     * 更新商品分类
     * @param name
     * @param parentId
     * @param orders
     * @param promotions
     * @param image
     * @param attrs
     * @private
     */
    _updateProductCategory({ name, parentId, orders, promotions, image }, attrs) {
      this.loading = true
      const id = this.productCategory.id
      updateProductCategory({ id, name, parentId, orders, promotions, image }, attrs).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
        if (res.err_code === ERR_ERROR) {
          this.$message.error(res.data)
        }
        this.loading = false
      })
    },
    /**
     * 处理图片上产
     */
    handleUpload(fileList) {
      this.image = fileList[0].source
      this.setFormFieldsValue({
        image: fileList[0].source
      })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding-top: 10px;

  .button-wrap {
    .button {
      margin-left: 8px;
    }
  }
}

</style>
