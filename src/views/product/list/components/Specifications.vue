<template>
  <a-form>
    <a-form-item>
      <a-button icon="reload" @click="resetSpecifications">重置规格</a-button>
    </a-form-item>
    <a-form-item>
      <a-table
        :data-source="specifications"
        :show-header="false"
        :pagination="false"
        row-key="id">
        <a-table-column data-index="name">
          <template slot-scope="name,record">
            <a-input
              :value="name"
              style="width: 100px"
              @change="e => handleProductSpecificationsTableData(e.target.value,record.id, 'name')"/>
          </template>
        </a-table-column>
        <a-table-column data-index="options">
          <template slot-scope="options,record,recordIndex">
            <a-checkbox-group v-model="record.selectSpecifications" style="width: 100%">
              <a-row>
                <a-col v-bind="checkboxLayout" v-for="option in options" :key="option.value_id">
                  <a-checkbox
                    :value="option.value_id"
                    class="checkbox"
                    @change="e => handleChange(e,record,recordIndex)">
                    <a-input
                      :value="option.value"
                      style="width: 50%"
                      @change="e => handleProductSpecificationsOptionsTableData(e.target.value,record.id, option.value_id,'value')"/>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </template>
        </a-table-column>
      </a-table>
    </a-form-item>
    <a-form-item>
      <a-table
        :columns="selectColumns"
        :data-source="selectOptions"
        :pagination="false"
        :scroll="{x: 'max-content' }"
        row-key="id">
        <span slot="price" slot-scope="price,record">
          <a-col v-bind="inputLayout">
            <a-input
              :value="price"
              :disabled="!record.is_enable"
              :min="0"
              type="number"
              @change="e => handleTableDataChange(e.target.value,record.id, 'price')"/>
          </a-col>
        </span>
        <span slot="cost" slot-scope="cost,record">
          <a-col v-bind="inputLayout">
            <a-input
              :value="cost"
              :disabled="!record.is_enable"
              type="number"
              :min="0"
              @change="e => handleTableDataChange(e.target.value,record.id, 'cost')"/>
          </a-col>
        </span>
        <span slot="market_price" slot-scope="market_price,record">
          <a-col v-bind="inputLayout">
            <a-input
              :value="market_price"
              :disabled="!record.is_enable"
              type="number"
              :min="0"
              @change="e => handleTableDataChange(e.target.value,record.id, 'market_price')"/>
          </a-col>
        </span>
        <span slot="reward_point" slot-scope="reward_point,record">
          <a-col v-bind="inputLayout">
            <a-input
              :value="reward_point"
              :disabled="!record.is_enable"
              type="number"
              :min="0"
              @change="e => handleTableDataChange(e.target.value,record.id, 'reward_point')"/>
          </a-col>
        </span>
        <span slot="stock" slot-scope="stock,record">
          <a-tooltip v-if="isShowStockButton">
            <template slot="title">
              请点击+、-图标入库、出库
            </template>
            <a-row type="flex" align="middle">
              <a-col v-bind="inputLayout">
                <a-input
                  :value="stock"
                  :disabled="!record.is_enable || isShowStockButton"
                  type="number"
                  :min="0"
                  @change="e => handleTableDataChange(e.target.value,record.id, 'stock')"/>
              </a-col>
              <a-col v-bind="buttonLayout" style="vertical-align: middle">
                <a-button-group>
                  <a-button size="small" class="no-border" @click="toInStockPage(record.sn)">+</a-button>
                  <a-button size="small" class="no-border" @click="toOutStockPage(record.sn)">-</a-button>
                </a-button-group>
              </a-col>
            </a-row>
          </a-tooltip>
          <a-row type="flex" align="middle" v-else>
            <a-col v-bind="inputLayout">
              <a-input
                :value="stock"
                :disabled="!record.is_enable || isShowStockButton"
                type="number"
                :min="0"
                @change="e => handleTableDataChange(e.target.value,record.id, 'stock')"/>
            </a-col>
          </a-row>
        </span>
        <span slot="is_default" slot-scope="is_default,record">
          <a-checkbox-group
            :value="record.is_enable ? [is_default] : []"
            :disabled="!record.is_enable"
            @change="e => handleTableDataChange(e[0],record.id, 'is_default')">
            <a-checkbox :value="1"></a-checkbox>
          </a-checkbox-group>
        </span>
        <span slot="is_enable" slot-scope="is_enable,record">
          <a-checkbox-group
            :value="[is_enable]"
            @change="e => handleTableDataChange(e[0],record.id, 'is_enable')">
            <a-checkbox :value="1"></a-checkbox>
          </a-checkbox-group>
        </span>
      </a-table>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import { deepClone, isArray } from '@/utils/util'

const selectColumns = [
  {
    title: '销售价',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
    width: '180px'
  },
  {
    title: '成本价',
    dataIndex: 'cost',
    scopedSlots: { customRender: 'cost' },
    width: '180px'
  },
  {
    title: '市场价',
    dataIndex: 'market_price',
    scopedSlots: { customRender: 'market_price' },
    width: '180px'
  },
  {
    title: '赠送积分',
    dataIndex: 'reward_point',
    scopedSlots: { customRender: 'reward_point' },
    width: '180px'
  },
  {
    title: '库存',
    dataIndex: 'stock',
    scopedSlots: { customRender: 'stock' },
    width: '180px'
  },
  {
    title: '是否默认',
    dataIndex: 'is_default',
    scopedSlots: { customRender: 'is_default' },
    width: '180px'
  },
  {
    title: '是否启用',
    dataIndex: 'is_enable',
    scopedSlots: { customRender: 'is_enable' },
    width: '180px'
  }
]

export default {
  name: 'Specification',
  computed: {
    isShowStockButton() {
      const { name } = this.$route
      return name === 'ProductEdit'
    },
    ...mapGetters([
      'productSpecifications',
      'productCategory'
    ])
  },
  watch: {
    productSpecifications(newList) {
      if (newList) {
        newList.forEach((item) => {
          this.$set(item, 'selectOptions', [])
          this.$set(item, 'selectSpecifications', [])
        })
        if (!this.addColumns.length) {
          newList.forEach((item, index) => {
            this.addColumns[index] = undefined
          })
        }
        this.specifications = newList
      }
    }
  },
  data() {
    return {
      selectColumns,
      selectOptions: [],
      specifications: [], // 规格列表
      checkboxLayout: {
        span: 8,
        lg: 8,
        xl: 4
      },
      addColumns: [],
      skus: [], // SKU
      inputLayout: {
        span: 16,
        md: 12,
        lg: 12,
        xl: 16
      },
      buttonLayout: {
        span: 8,
        md: 12,
        lg: 12,
        xl: 8
      }
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      if (form.skus) {
        /**
         * this.skus 则单纯做存储
         * skus 用来处理数据
         */
        const skus = form.skus
        this.skus = skus.slice()

        skus.forEach((sku) => {
          sku.id = uuidv4()
          sku.specification_values_arr = []
        })

        /**
         * 根据 specification_values 值来动态设置表格的 column
         */
        let addColumns
        if (skus.length) {
          this.$store.dispatch('SetIsSelectSpecification', true)
          const specificationValues = skus[0].specification_values.split(',').filter((value) => {
            return value !== ''
          })
          addColumns = specificationValues.map((item) => {
            let column
            this.specifications.forEach((specification) => {
              const option = specification.options.find((option) => {
                return option.value === item
              })
              if (option) {
                column = specification.name
              }
            })
            if (column) {
              return {
                title: column,
                dataIndex: column,
                width: '100px'
              }
            }
          }).filter(item => item)
          this.addColumns = this.getAddColumns(addColumns)
          this.selectColumns = addColumns.concat(selectColumns)
        }
        /**
         * 设置 skus
         */
        if (addColumns) {
          skus.forEach((sku) => {
            const specificationValues = sku.specification_values.split(',').filter((value) => {
              return value !== ''
            })
            specificationValues.forEach((value) => {
              this.specifications.forEach((specification) => {
                const option = specification.options.find((option) => {
                  return option.value === value
                })
                if (option) {
                  const column = specification.name
                  sku.id = uuidv4()
                  sku[column] = option.value
                  sku.specification_values_arr.push({
                    specification_id: specification.id,
                    specification_name: specification.name,
                    value: option.value,
                    value_id: option.value_id
                  })
                }
              })
            })
          })
        }
        /**
         * 设置 specifications 的 selectOptions、selectSpecifications
         * selectSpecifications 用于控制 规格是否选中
         * selectOptions 则用来处理表格数据
         */
        if (addColumns) {
          skus.forEach((sku) => {
            sku.specification_values_arr.forEach((item) => {
              this.specifications.forEach((specification) => {
                const index = specification.selectOptions.findIndex((value) => {
                  return value.value_id === item.value_id
                })
                if (index === -1) {
                  if (specification.id === item.specification_id) {
                    specification.selectOptions.push(item)
                    specification.selectSpecifications.push(item.value_id)
                  }
                }
              })
            })
          })
        }
        this.selectOptions = skus
      }
    },
    /**
     * 选中的 column 需要对应 specifications
     */
    getAddColumns(addColumns) {
      const _addColumns = []

      addColumns.forEach((column) => {
        const index = this.specifications.findIndex((value) => {
          return value.name === column.dataIndex
        })
        if (index !== -1) {
          _addColumns[index] = column
        }
      })
      return _addColumns
    },
    /**
     * 重置规格
     */
    resetSpecifications() {
      this.$store.dispatch('GetProductSpecifications', this.productCategory.id)
    },
    /**
     * ProductSpecifications 表格值改变时处理
     * @param value
     * @param id
     * @param column
     */
    handleProductSpecificationsTableData(value, id, column) {
      const newData = [...this.specifications]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        value = value.replace(/\s*/g, '')
        target.options.forEach((option) => {
          option['specification_name'] = value
        })
        target[column] = value
        this.specifications = newData
      }
    },
    /**
     * ProductSpecificationsOptions 表格值改变时处理
     * @param value
     * @param id
     * @param valueId
     * @param column
     */
    handleProductSpecificationsOptionsTableData(value, id, valueId, column) {
      const newData = [...this.specifications]
      const parent = newData.filter(item => id === item.id)[0]
      const target = parent.options.filter(item => valueId === item.value_id)[0]
      if (target) {
        target[column] = value.replace(/\s*/g, '')
        this.specifications = newData
      }
    },
    /**
     * Checkbox 值改变时回调
     */
    handleChange(e, record, recordIndex) {
      this.updateSpecifications(e, recordIndex)
      this.addOrDeleteColumns(record, recordIndex).then(() => {
        /**
         * 设置表格项内容
         */
        this.setTableOption()
      })
    },
    updateSpecifications(e, recordIndex) {
      const targetValue = e.target.value
      const checked = e.target.checked
      if (checked) {
        const option = this.specifications[recordIndex].options.find((value) => {
          return value.value_id === targetValue
        })
        this.specifications[recordIndex].selectOptions.push(option)
      } else {
        const index = this.specifications[recordIndex].selectOptions.findIndex((value) => {
          return value.value_id === targetValue
        })
        this.specifications[recordIndex].selectOptions.splice(index, 1)
      }
    },
    /**
     * 设置表格的 Column
     */
    addOrDeleteColumns(record, recordIndex) {
      return new Promise(resolve => {
        const index = this.selectColumns.findIndex((value) => {
          return value.dataIndex === record.name
        })
        /**
         * 新增 Column
         */
        if (index === -1) {
          this.addColumns[recordIndex] = {
            title: record.name,
            dataIndex: record.name,
            width: '100px'
          }
          const sliceAddColumns = this.addColumns.filter((item) => {
            if (item) {
              return item
            }
          })
          this.selectColumns = sliceAddColumns.concat(selectColumns)
        }

        /**
         * 删除 Column
         */
        const selectItem = this.specifications[recordIndex]
        if (index > -1 && !selectItem.selectOptions.length) {
          this.addColumns[recordIndex] = undefined
          const deleteIndex = this.selectColumns.findIndex((value) => {
            return value.dataIndex === selectItem.name
          })
          this.selectColumns.splice(deleteIndex, 1)
        }
        /**
         * 利用 setTimeout 宏任务数据更新后再操作
         */
        setTimeout(() => {
          resolve()
        }, 20)
      })
    },
    /**
     * 设置表格项内容
     */
    setTableOption() {
      const selectOptions = this.specifications.map((item) => {
        return item.selectOptions
      }).map((item) => {
        if (item.length) {
          return item
        }
      }).filter((item) => {
        return item && item
      })

      if (!selectOptions.length) {
        this.selectOptions = []
        this.$store.dispatch('SetIsSelectSpecification', false)
        return
      }
      this.$store.dispatch('SetIsSelectSpecification', true)

      this.sortSelectOptions(selectOptions)
      /**
       * 复制 selectOptions,不让Vue的响应式影响数据
       */
      const copySelectOptions = deepClone(selectOptions)
      const options = this.combination(copySelectOptions)
      this.selectOptions = this.getSelectOptions(options)
    },
    sortSelectOptions(selectOptions) {
      selectOptions.forEach((options) => {
        options.sort(function(first, second) {
          const firstId = first.value_id
          const secondId = second.value_id

          if (firstId < secondId) {
            return -1
          }
          if (firstId > secondId) {
            return 1
          }
          return 0
        })
      })
    },
    /**
     * 通过二维数组 options 获取选中的 option
     * @param options
     */
    getSelectOptions(options) {
      const results = []
      options.forEach((option, index) => {
        if (!isArray(option)) {
          options[index] = []
          options[index].push(option)
        }
      })
      options.forEach((option, index) => {
        let specificationValuesText = ','
        option.forEach((item) => {
          const specificationValues = {
            specification_id: item.specification_id,
            specification_name: item.specification_name,
            value_id: item.value_id,
            value: item.value
          }
          specificationValuesText += item.value + ','
          if (!results[index]) {
            results.push({
              id: uuidv4(),
              [item.specification_name]: item.value,
              price: 0,
              cost: 0,
              market_price: 0,
              reward_point: 0,
              stock: 0,
              is_default: 0,
              is_enable: 0,
              specification_values: specificationValuesText,
              specification_values_arr: [specificationValues]
            })
          } else {
            results[index][item.specification_name] = item.value
            results[index].specification_values = specificationValuesText
            results[index].specification_values_arr.push(specificationValues)
          }
        })
        /**
         * 如果存在skus数组，则需要显示 stock
         * @type {number}
         */
        const i = this.selectOptions.findIndex((value) => {
          return value['specification_values'] === specificationValuesText
        })
        const skuIndex = this.skus.findIndex((value) => {
          return value['specification_values'] === specificationValuesText
        })
        if (i > -1) {
          const resultIndex = results.findIndex((value) => {
            return value['specification_values'] === specificationValuesText
          })
          results.splice(resultIndex, 1, this.selectOptions[i])
        }
        if (i === -1 && skuIndex > -1) {
          const resultIndex = results.findIndex((value) => {
            return value['specification_values'] === this.skus[skuIndex]['specification_values']
          })
          results[resultIndex].stock = this.skus[skuIndex].stock
        }
      })
      return results
    },
    /**
     * 二维数组排列组合
     * @param originalData
     * @returns {*}
     */
    combination(originalData) {
      const length = originalData.length
      if (length < 2) {
        return originalData[0]
      }
      const firstArrayLength = originalData[0].length
      const secondArrayLength = originalData[1].length
      const result = []
      for (let firstIndex = 0; firstIndex < firstArrayLength; firstIndex++) {
        for (let secondIndex = 0; secondIndex < secondArrayLength; secondIndex++) {
          result[result.length] = []
          if (isArray(originalData[0][firstIndex])) {
            result[result.length - 1].push(...originalData[0][firstIndex])
          } else {
            result[result.length - 1].push(originalData[0][firstIndex])
          }
          result[result.length - 1].push(originalData[1][secondIndex])
        }
      }
      const tmpResult = []
      for (let i = 2; i < originalData.length; i++) {
        tmpResult[i - 1] = originalData[i]
      }
      tmpResult[0] = result
      return this.combination(tmpResult)
    },
    /**
     * 表格数据改变时处理
     * @param value
     * @param id
     * @param column
     */
    handleTableDataChange(value, id, column) {
      const newData = [...this.selectOptions]
      const target = newData.filter(item => id === item.id)[0]
      if (column === 'is_default') {
        newData.forEach((data) => {
          data['is_default'] = 0
        })
      }
      if (target) {
        if (typeof value === 'string') {
          target[column] = Number(value.replace(/\s*/g, ''))
        } else {
          target[column] = value
        }
        /**
         * 有且仅有一个被启用时，必须为默认选中
         */
        if (column === 'is_enable') {
          if (newData.length === 1 && target['is_enable'] === '1') {
            target['is_default'] = '1'
          }
        }

        this.selectOptions = newData
      }
    },
    /**
     * 跳转入库页面
     */
    toInStockPage(sn) {
      this.$store.dispatch('SetSkuSn', sn)
      this.$router.push({ name: 'InStock' })
    },
    /**
     * 跳转出库页面
     */
    toOutStockPage(sn) {
      this.$store.dispatch('SetSkuSn', sn)
      this.$router.push({ name: 'OutStock' })
    },
    /**
     * 提交表单
     * @returns {Promise<unknown>}
     */
    handleSubmit() {
      return new Promise(resolve => {
        resolve({
          skus: this.selectOptions,
          specifications: this.specifications
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.checkbox {
  margin: 0 0 5px 0;
}

.no-border {
  border: none;
}
</style>
