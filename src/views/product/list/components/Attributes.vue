<template>
  <a-form>
    <a-form-item>
      <a-table
        :columns="columns"
        :data-source="attributes"
        :pagination="false"
        :show-header="false"
        row-key="id">
        <span slot="name" slot-scope="name">
          {{ name }}:
        </span>
        <span slot="options" slot-scope="options,record">
          <a-select
            style="width: 120px"
            placeholder="请选择"
            @change="handleChange"
            v-model="record[`attribute_value_${record.property_index}`]">
            <a-select-option v-for="(option,index) in options" :attribute="record" :key="index" :value="option">
              {{ option }}
            </a-select-option>
          </a-select>
        </span>
      </a-table>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { mapGetters } from 'vuex'

const columns = [
  {
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '100px'
  },
  {
    dataIndex: 'options',
    scopedSlots: { customRender: 'options' }
  },
  {
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'ProductAttributes',
  computed: {
    ...mapGetters([
      'productAttributes'
    ])
  },
  watch: {
    productAttributes(newList) {
      this.attributes = newList
    }
  },
  data() {
    return {
      attributes: [], // 商品属性列表
      attributeOptions: {},
      columns
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.$nextTick(() => {
        const attributes = this.attributes || []
        attributes.forEach((attribute, index) => {
          const key = `attribute_value_${attribute.property_index}`
          if (form.attributes[key]) {
            attribute[key] = form.attributes[key]
            this.attributeOptions[key] = form.attributes[key]
            this.attributes.splice(index, 1, attribute)
          }
        })
      })
    },
    /**
     * SelectOption的值改变时处理
     */
    handleChange(value, option) {
      const attribute = option.data.attrs.attribute
      const obj = this.attributeOptions
      const key = `attribute_value_${attribute.property_index}`
      obj[key] = value

      this.attributeOptions = obj
    },
    /**
     * 提交表单
     * @returns {Promise<unknown>}
     */
    handleSubmit() {
      return new Promise(resolve => {
        resolve(this.attributeOptions)
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
