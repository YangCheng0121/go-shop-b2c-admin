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
                rules: [{ required: true, message: '请选择商品分类!' }]
              }]"
            :default-value="productCategory && productCategory.name"
            :dropdown-data="treeDataProductCategoryList"
          />
        </a-col>
      </a-form-item>
      <a-form-item label="参数组">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'group',
              { rules: [{ required: true, message: '请输入参数组!' }] },
            ]"
            placeholder="请输入参数组"/>
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
          <a-button type="primary" @click="addParameterName">增加参数名称</a-button>
        </a-col>
      </a-form-item>
      <a-form-item
        label=" "
        :colon="false"
        :label-col="{span: 3}"
        :wrapper-col="{span:21}">
        <a-table
          :columns="columns"
          :data-source="names"
          :pagination="false"
          row-key="id">
          <a-col :span="8" slot="name" slot-scope="name,record">
            <a-input :value="name" @change="e => handleChange(e.target.value, record.id, 'name')"/>
          </a-col>
          <span slot="action" slot-scope="_,record,index">
            <a @click="handleDelete(index)">[删除]</a>
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
import { addParameter } from '@/api/parameter'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  {
    dataIndex: 'name',
    title: '参数名称',
    scopedSlots: { customRender: 'name' }
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
  name: 'ParameterAdd',
  computed: {
    ...mapGetters([
      'treeDataProductCategoryList',
      'productCategory'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ParameterAdd' }),
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
      names: [{
        id: uuidv4(),
        name: ' '
      }],
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
      const newData = [...this.names]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        target[column] = value
        this.names = newData
      }
    },
    /**
     * 增加参数名称
     */
    addParameterName() {
      this.names.push({
        id: uuidv4(),
        name: ''
      })
    },
    /**
     * 添加商品参数表单处理
     */
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const productCategoryId = values.productCategory.id
          const group = values.group
          const orders = values.orders
          let names = []
          this.names.forEach((item) => {
            if (item.name.replace(/\s+/g, '').length) {
              names.push(item.name)
            }
          })
          names = names.join(',')
          this._addParameter({ productCategoryId, group, orders, names })
        }
      })
    },
    /**
     * 点击删除按钮处理
     * @param index
     */
    handleDelete(index) {
      if (this.names.length === 1) {
        this.$message.error('删除失败,必须保留一项')
        return
      }
      this.names.splice(index, 1)
    },
    /**
     * 添加商品参数
     * @param productCategoryId
     * @param group
     * @param orders
     * @param names
     * @private
     */
    _addParameter({ productCategoryId, group, orders, names }) {
      addParameter({ productCategoryId, group, orders, names }).then((res) => {
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
