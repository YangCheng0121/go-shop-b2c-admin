<template>
  <box class="padding-10px">
    <a-form :form="form" v-bind="formLayout" slot="content">
      <a-form-item label="绑定分类">
        <a-col v-bind="formItemLayout">
          <input-dropdown
            v-decorator="[
              'productCategory',
              {
                valuePropName: 'productCategory',
              }]"
            :default-value="productCategory && productCategory.name"
            :dropdown-data="productCategoryList"
          />
        </a-col>
      </a-form-item>
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
      <a-form-item label="排序">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="['orders']"
            placeholder="请输入排序"/>
        </a-col>
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-col v-bind="formItemLayout">
          <a-button type="primary" @click="addParameterName">增加可选项</a-button>
        </a-col>
      </a-form-item>
      <a-form-item
        label=" "
        :colon="false"
        :label-col="{span: 3}"
        :wrapper-col="{span:21}">
        <a-table
          :columns="columns"
          :data-source="options"
          :pagination="false"
          row-key="id">
          <a-col :span="8" slot="option" slot-scope="option,record">
            <a-input :value="option" @change="e => handleChange(e.target.value, record.id, 'option')"/>
          </a-col>
          <span slot="action" slot-scope="record">
            <a @click="handleDelete(record.id)">[删除]</a>
          </span>
        </a-table>
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
import { updateAttribute, getAttribute } from '@/api/attribute'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  {
    dataIndex: 'option',
    title: '可选项',
    scopedSlots: { customRender: 'option' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    Box,
    ConfirmBack,
    InputDropdown
  },
  name: 'AttributeEdit',
  computed: {
    ...mapGetters([
      'productCategoryList',
      'productCategory'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AttributeEdit' }),
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
      options: [{
        id: uuidv4(),
        option: ' '
      }],
      columns,
      propertyIndex: 0 // 属性号
    }
  },
  created() {
    this.$store.dispatch('GetProductCategoryList')
    this._getAttribute()
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 表单的 Input 的值改变时处理
     */
    handleChange(value, id, column) {
      const newData = [...this.options]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        target[column] = value
        this.options = newData
      }
    },
    /**
     * 增加参数名称
     */
    addParameterName() {
      this.options.push({
        id: uuidv4(),
        option: ' '
      })
    },
    /**
     * 添加标签表单处理
     */
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const id = this.$route.params.id
          const { name, productCategory, orders } = values
          const productCategoryId = productCategory.id
          let options = []
          this.options.forEach((item) => {
            if (item.option.replace(/\s+/g, '').length) {
              options.push(item.option)
            }
          })
          options = options.join(',')
          const propertyIndex = this.propertyIndex
          this._updateAttribute({ id, name, productCategoryId, orders, options, propertyIndex })
        }
      })
    },
    /**
     * 点击删除按钮处理
     */
    handleDelete(id) {
      if (this.options.length) {
        const index = this.options.findIndex((value) => {
          return value.id === id
        })
        this.options.splice(index, 1)
      }
    },
    /**
     * 获取商品属性
     */
    _getAttribute() {
      const id = this.$route.params.id
      getAttribute(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          if (data.options && data.options.length) {
            this.options = data.options.map((option) => {
              return {
                id: uuidv4(),
                option: option
              }
            })
          }
          this.propertyIndex = data.property_index
          this.$store.dispatch('GetCurrentProductCategory', data.product_category)
          this.$nextTick(() => {
            this.setFormFieldsValue({
              productCategory: data.product_category,
              name: data.name,
              orders: data.orders
            })
          })
        }
      })
    },
    /**
     * 更新商品属性
     * @param id
     * @param name
     * @param productCategoryId
     * @param orders
     * @param options
     * @param propertyIndex
     * @private
     */
    _updateAttribute({ id, name, productCategoryId, orders, options, propertyIndex }) {
      updateAttribute({ id, name, productCategoryId, orders, options, propertyIndex }).then((res) => {
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
