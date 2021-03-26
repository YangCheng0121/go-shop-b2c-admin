<template>
  <a-form>
    <a-row>
      <a-button icon="plus" @click="addGroupParameter">增加参数</a-button>
      <a-button class="margin-left-5px" icon="reload" @click="resetGroupParameter">重置参数</a-button>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="parameters"
      :pagination="false"
      :show-header="false"
      :expandedRowKeys="expandedRowKeys"
      @expand="open"
      row-key="id">
      <span slot="group_label">参数组:</span>
      <span slot="group" slot-scope="group,record">
        <a-col v-bind="innerInputLayout.value">
          <a-input :value="group" @change="e => handleGroupChange(e.target.value, record.id,'group')"/>
        </a-col>
      </span>
      <span slot="action" slot-scope="_,record, index">
        <a @click="deleteGroupParameter(record,index)">[删除]</a>
        <a-divider type="vertical"/>
        <a @click="addParameter(record,index)">[添加]</a>
      </span>
      <a-table
        slot="expandedRowRender"
        slot-scope="record,parentIndex"
        :columns="innerColumns"
        :data-source="record.names"
        :show-header="false"
        :pagination="false"
        row-key="id">
        <span slot="name" slot-scope="name,innerRecord">
          <a-col v-bind="innerInputLayout.name">
            <a-input
              :value="name"
              @change="e => handleTableDataChange(e.target.value, innerRecord.id,'name',parentIndex)"/>
          </a-col>
        </span>
        <span slot="value" slot-scope="value,innerRecord">
          <a-col v-bind="innerInputLayout.value">
            <a-input
              :value="value"
              @change="e => handleTableDataChange(e.target.value, innerRecord.id,'value',parentIndex)"/>
          </a-col>
        </span>
        <span slot="action" slot-scope="_,innerRecord,index">
          <a @click="deleteParameter(innerRecord,index,parentIndex)">[删除]</a>
        </span>
      </a-table>
    </a-table>
  </a-form>
</template>

<script type="es6">
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'

const columns = [
  {
    dataIndex: 'group_label',
    scopedSlots: { customRender: 'group_label' },
    width: '400px'
  },
  {
    dataIndex: 'group',
    scopedSlots: { customRender: 'group' },
    width: '400px'
  },
  {
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: '200px'
  }
]

const innerColumns = [
  {
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '400px'
  },
  {
    dataIndex: 'value',
    scopedSlots: { customRender: 'value' },
    width: '400px'
  },
  {
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: '200px'
  }
]

export default {
  name: 'ProductParameters',
  computed: {
    ...mapGetters([
      'productParameters',
      'productCategory'
    ])
  },
  watch: {
    productParameters(parameters) {
      if (parameters) {
        parameters.forEach((parameter) => {
          this.expandedRowKeys.push(parameter.id)
          if (!parameter.names) {
            parameter.names = [{
              id: uuidv4(),
              group: '',
              names: [{ id: uuidv4(), name: '' }]
            }]
          }
        })
        this.parameters = parameters
      } else {
        const id = uuidv4()
        this.expandedRowKeys.push(id)
        this.parameters = [{
          id: id,
          group: '',
          names: [{ id: uuidv4(), name: '' }]
        }]
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ProductParameter' }),
      parameters: [],
      columns,
      innerColumns,
      innerInputLayout: {
        name: {
          span: 10,
          md: 16,
          lg: 16,
          xl: 8
        },
        value: {
          span: 12,
          md: 20,
          lg: 20,
          xl: 12
        }
      },
      expandedRowKeys: []
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      if (form.parameterValues) {
        this.parameters.forEach((productParameter) => {
          if (productParameter.names) {
            productParameter.names.forEach((parameter) => {
              form.parameterValues.forEach((item) => {
                if (item.id === parameter.id) {
                  parameter.value = item.value
                }
              })
            })
          } else {
            productParameter.names = [{
              id: uuidv4(),
              group: '',
              names: [{ id: uuidv4(), name: '' }]
            }]
          }
        })
      }
    },
    /**
     * 增加参数组
     */
    addGroupParameter() {
      this.parameters.push({
        id: uuidv4(),
        group: '',
        names: [{ id: uuidv4(), name: '' }]
      })
    },
    /**
     * 重置参数
     */
    resetGroupParameter() {
      this.$confirm({
        title: '提示',
        content: '重置参数后当前商品参数设置将清空，是否继续？',
        onOk: () => {
          this.$store.dispatch('GetProductParameters', this.productCategory.id)
        },
        onCancel() {
        }
      })
    },
    open(expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id)
      } else {
        const index = this.expandedRowKeys.findIndex((value) => {
          return value === record.id
        })
        this.expandedRowKeys.splice(index, 1)
      }
    },
    /**
     * Group Input 的值改变时处理
     */
    handleGroupChange(value, id, column) {
      const newData = [...this.parameters]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        target[column] = value.replace(/\s*/g, '')
        this.parameters = newData
      }
    },
    /**
     * 表格数据改变时处理
     * @param value
     * @param id
     * @param column
     * @param parentIndex
     */
    handleTableDataChange(value, id, column, parentIndex) {
      const newData = [...this.parameters[parentIndex].names]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        target[column] = value.replace(/\s*/g, '')
        this.parameters[parentIndex].names = newData
      }
    },
    /**
     * 删除参数组
     * @param record
     * @param index
     */
    deleteGroupParameter(record, index) {
      this.parameters.splice(index, 1)
    },
    /**
     * 添加参数
     * @param record
     * @param index
     */
    addParameter(record, index) {
      this.parameters[index].names.push({
        id: uuidv4(),
        name: '',
        value: ''
      })
    },
    /**
     * 删除参数
     * @param record
     * @param index
     * @param parentIndex
     */
    deleteParameter(record, index, parentIndex) {
      if (this.parameters[parentIndex].names.length > 1) {
        this.parameters[parentIndex].names.splice(index, 1)
      } else {
        this.$message.error('至少保留一下项')
      }
    },
    /**
     * 提交表单
     * @returns {Promise<unknown>}
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err) => {
          if (!err) {
            resolve(this.parameters)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
