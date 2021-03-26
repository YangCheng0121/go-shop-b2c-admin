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
            default-value="顶级分类"
            :dropdown-data="treeDataProductCategoryList"
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
          <a-checkbox v-for="promotion in promotionPageList.list" :key="promotion.id" :value="promotion.id">
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
      <a-form-item label=" " :colon="false">
        <confirm-back ref="confirmBack"/>
      </a-form-item>
    </a-form>
  </box>
</template>

<script type="es6">
import { Box, InputDropdown, ConfirmBack, UploadButton } from '@/components'
import { addProductCategory } from '@/api/product_category'
import { ERR_ERROR, ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  components: {
    Box,
    InputDropdown,
    ConfirmBack,
    UploadButton
  },
  name: 'ProductCategoryAdd',
  computed: {
    ...mapGetters([
      'productCategoryList',
      'promotionPageList',
      'productCategoryAttrs',
      'treeDataProductCategoryList'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ProductCategoryAdd' }),
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
  created() {
    this.$store.dispatch('GetProductCategoryList')
    this.$store.dispatch('GetAllPromotionList')
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 提交表单
     * @param e
     */
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const parentId = values.parentCategory && values.parentCategory.id
          const { orders, name, settingGroup, promotionGroup } = values
          const attrs = {}
          settingGroup && settingGroup.forEach((item) => {
            attrs[item] = 1
          })
          const promotions = promotionGroup && promotionGroup.join(',')
          this._addProductCategory({ name, parentId, orders, promotions }, attrs)
        }
      })
    },
    /**
     * 新增商品分类
     * @param name
     * @param parentId
     * @param orders
     * @param promotions
     * @param attrs
     * @private
     */
    _addProductCategory({ name, parentId, orders, promotions }, attrs) {
      this.loading = true
      addProductCategory({ name, parentId, orders, promotions }, attrs).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$refs.confirmBack.back()
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
}
</style>
