<template>
  <box>
    <!--Header-->
    <a-button-group size="small" slot="left">
      <a-button @click="toInStockPage">入库</a-button>
      <a-button @click="toOutStockPage">出库</a-button>
      <reload/>
      <a-dropdown :trigger="['click']">
        <a-menu slot="overlay" @click="handlePageSizeClick">
          <a-menu-item key="10">
            10
          </a-menu-item>
          <a-menu-item key="20">
            20
          </a-menu-item>
          <a-menu-item key="30">
            50
          </a-menu-item>
          <a-menu-item key="100">
            100
          </a-menu-item>
        </a-menu>
        <a-button>
          每页显示
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </a-button-group>
    <a-input-group compact slot="right">
      <a-select
        default-value="Sn"
        size="small"
        @change="handleSelectChange">
        <a-select-option value="Sn">
          编号
        </a-select-option>
      </a-select>
      <a-input-search
        size="small"
        style="width: 60%"
        enter-button
        placeholder="请输入搜索内容"
        allow-clear
        @search="handleSearch"/>
    </a-input-group>
    <!--Content-->
    <a-table
      :columns="columns"
      :data-source="pages.list"
      :pagination="false"
      :scroll="{x: 'max-content' }"
      :loading="loading"
      row-key="id"
      slot="content">
      <span slot="name" slot-scope="name,record">
        {{ name }}
        <span class="silver" v-if="record.sku.specification_values">
          [{{ record.sku.specification_values }}]
        </span>
      </span>
      <span slot="type" slot-scope="type">
        {{ stockTypes[type] }}
      </span>
      <span slot="creation_date" slot-scope="creation_date">
        <a-tooltip>
          <template slot="title">
            {{ creation_date | Moment }}
          </template>
          {{ creation_date | Moment('YYYY-MM-DD') }}
        </a-tooltip>
      </span>
    </a-table>
    <!--Footer-->
    <a-pagination
      slot="footer"
      :default-current="pages.page_number"
      :page-size.sync="pages.page_size"
      :total="pages.total"
      @change="handlePaginationChange"/>
  </box>
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { getStockLogList } from '@/api/stock'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '编号',
    dataIndex: 'sku.sn'
  },
  {
    title: '商品',
    dataIndex: 'sku.name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '入库数量',
    dataIndex: 'in_quantity'
  },
  {
    title: '出库数量',
    dataIndex: 'out_quantity'
  },
  {
    title: '当前库存',
    dataIndex: 'stock'
  },
  {
    title: '备注',
    dataIndex: 'memo'
  },
  {
    title: '创建日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  }
]

const query = {
  Sn: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'Stock',
  data() {
    return {
      // 搜索表单的搜索条件
      form: {
        selectOption: 'Sn', // 搜索框Select
        query
      },
      columns,
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0,
        list: []
      },
      stockLogs: [],
      stockTypes: {
        in: '入库',
        out: '出库'
      },
      loading: false
    }
  },
  created() {
    this._getStockLogList()
  },
  methods: {
    /**
     * 跳转入库页面
     */
    toInStockPage() {
      this.$router.push({ name: 'InStock' })
    },
    /**
     * 跳转出库页面
     */
    toOutStockPage() {
      this.$router.push({ name: 'OutStock' })
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getStockLogList()
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getStockLogList()
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Sn: null
      }
      this.form.selectOption = value
    },
    /**
     * 搜索回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getStockLogList()
    },
    /**
     * 获取库存记录列表
     * @private
     */
    _getStockLogList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      getStockLogList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          if (data.list) {
            data.list.forEach((item) => {
              item.sku.specification_values = item.sku.specification_values.split(',').filter(value => value !== '').join(',')
            })
          }
          this.pages = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
