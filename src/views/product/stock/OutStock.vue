<template>
  <box class="in-stock-box">
    <a-spin :spinning="spinning" slot="content">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="商品选择:">
          <a-col v-bind="inputLayout">
            <a-select
              placeholder="请输入名称、编号查找商品"
              show-search
              allowClear
              :value="selectValue"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
              @search="handleSearch"
              @change="handleChange">
              <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
              <a-select-option
                v-for="item in skuList"
                :key="item.sn">
                {{ item.name }}
                <span class="silver" v-if="item.specification_values">
                  [{{ item.specification_values }}]
                </span>
              </a-select-option>
            </a-select>
          </a-col>
        </a-form-item>
        <a-form-item label="编号:" v-if="skuSn">
          <span>{{ sku.sn }}</span>
        </a-form-item>
        <a-form-item label="名称:" v-if="skuSn">
          <div>
            {{ sku.name }}
            <span class="silver">
              [{{ sku.specification_values }}]
            </span>
          </div>
        </a-form-item>
        <a-form-item label="库存:" v-if="skuSn">
          <span>{{ sku.stock }}</span>
        </a-form-item>
        <a-form-item label="已分配库存:" v-if="skuSn">
          <span>{{ sku.allocated_stock }}</span>
        </a-form-item>
        <a-form-item label="数量:">
          <a-col v-bind="inputLayout">
            <a-input
              v-decorator="[
                'quantity',
                { rules: [{required: true, type: 'number', message: '数量必须为数字', whitespace: true ,transform:(value) => Number(value) }] },
              ]"
              placeholder="请输入数量"/>
          </a-col>
        </a-form-item>
        <a-form-item label="备注:">
          <a-col v-bind="inputLayout">
            <a-input
              v-decorator="['memo']"
              placeholder="请输入备注"/>
          </a-col>
        </a-form-item>
      </a-form>
    </a-spin>
    <a-row style="width: 100%" slot="footer">
      <a-col :span="formLayout.labelCol.span"></a-col>
      <a-col :span="formLayout.wrapperCol.span">
        <confirm-back ref="confirmBack" @confirm="handleSubmit"/>
      </a-col>
    </a-row>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import { getSku, getSkuList } from '@/api/sku'
import { outStock } from '@/api/stock'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const query = {
  Sn: null,
  Name: null
} // 查询条件

export default {
  name: 'ProductOutStock',
  components: {
    Box,
    ConfirmBack
  },
  computed: {
    ...mapGetters([
      'skuSn'
    ])
  },
  watch: {
    skuSn(newSn) {
      if (newSn && newSn !== this.sku.sn) {
        this._getSku(newSn)
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'InStock' }),
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8, md: 16, lg: 12, xl: 8 }
      },
      inputLayout: {
        span: 12
      },
      sku: {}, // 当前SKU
      skuList: [],
      selectValue: undefined,
      fetching: false,
      query: query,
      spinning: false
    }
  },
  created() {
    const sn = this.skuSn
    if (sn) {
      this._getSku(sn)
    }
  },
  methods: {
    _getSku(sn) {
      getSku(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          data.specification_values = data.specification_values.split(',').filter(value => value !== '').join(',')
          this.sku = data
        }
      })
    },
    /**
     * 商品选择 搜索处理
     */
    handleSearch(value) {
      if (value) {
        this.query = query
        const pattern = /^[0-9]*$/
        if (pattern.test(value)) {
          this.query.Sn = value
        } else {
          this.query.Name = value
        }
        this._getSkuList()
      }
    },
    /**
     * 商品选择 值改变时处理
     */
    handleChange(value) {
      this.$store.dispatch('SetSkuSn', value)
    },
    /**
     * 获取 SKU 列表
     * @private
     */
    _getSkuList() {
      const query = this.query
      this.spinning = true
      getSkuList(query).then((res) => {
        if (res.err_code === ERR_OK) {
          const skuList = res.data
          skuList.forEach((sku) => {
            sku.specification_values = sku.specification_values.split(',').filter(value => value !== '').join(',')
          })
          this.skuList = skuList
          this.spinning = false
        }
      })
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this._outStock(values)
        }
      })
    },
    /**
     * 入库
     * @param values
     * @private
     */
    _outStock(values) {
      const outQuantity = values.quantity
      const sn = this.sku.sn
      const memo = values.memo
      outStock({ outQuantity, sn, memo }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.in-stock-box {
  padding: 20px;
}
</style>
