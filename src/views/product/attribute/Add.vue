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
            :default-value="product_category && product_category.name"
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
            placeholder="请输入排序"
            :min="0"
            type="number"/>
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
          <span slot="action">
            <a @click="handleDelete">[删除]</a>
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
import { addAttribute } from '@/api/attribute'
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

const options = []

export default {
  components: {
    Box,
    ConfirmBack,
    InputDropdown
  },
  name: 'AttributeAdd',
  computed: {
    ...mapGetters([
      'productCategoryList',
      'productCategory'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'AttributeAdd' }),
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
      options,
      columns
    }
  },
  created() {
    this.$store.dispatch('GetProductCategoryList').then((list) => {
      this.setFormFieldsValue({
        productCategory: list[0]
      })
      this.$store.dispatch('GetCurrentProductCategory', list[0])
    })
    this.options = [{
      id: uuidv4(),
      option: ' '
    }]
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
          const { name, productCategory } = values
          const productCategoryId = productCategory.id
          let options = []
          this.options.forEach((item) => {
            if (item.option.replace(/\s+/g, '').length) {
              options.push(item.option)
            }
          })
          options = options.join(',')
          const orders = Number(values.orders)
          this._addAttribute({ name, productCategoryId, orders, options })
        }
      })
    },
    /**
     * 点击删除按钮处理
     */
    handleDelete() {
      if (this.data.length === 1) {
        this.$message.error('删除失败,必须保留一项')
        return
      }
      this.data.shift()
    },
    /**
     * 添加商品属性
     * @param name
     * @param productCategoryId
     * @param orders
     * @param options
     * @private
     */
    _addAttribute({ name, productCategoryId, orders, options }) {
      addAttribute({ name, productCategoryId, orders, options }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
