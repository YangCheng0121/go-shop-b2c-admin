<template>
  <page-header-wrapper>
    <box>
      <!--Header-->
      <a-button-group slot="left" size="small">
        <a-button icon="plus">添加</a-button>
        <a-button icon="close">删除</a-button>
        <reload/>
        <a-dropdown :trigger="['click']">
          <a-menu slot="overlay" @click="handleDropdownChange">
            <a-menu-item key="is_marketable:1">
              已上架
            </a-menu-item>
            <a-menu-item key="is_marketable:0">
              未上架
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="Stock__gt:1">
              有货
            </a-menu-item>
            <a-menu-item key="Stock:0">
              缺货
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="HasSent:1">
              已发送
            </a-menu-item>
            <a-menu-item key="HasSent:0">
              未发送
            </a-menu-item>
          </a-menu>
          <a-button>
            到货通知筛选
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
        <a-dropdown :trigger="['click']">
          <a-menu slot="overlay">
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
          default-value="Email"
          size="small"
          @change="handleSelectChange">
          <a-select-option value="Email">
            E-mail
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
        slot="content"
        :columns="columns"
        :data-source="pages.list"
        :pagination="false"
        :loading="loading"
        row-key="id">
        <span slot="creation_date" slot-scope="creation_date">
          <a-tooltip>
            <template slot="title">
              {{ creation_date | Moment }}
            </template>
            {{ creation_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
        </span>
        <span slot="last_updated_date" slot-scope="last_updated_date">
          <a-tooltip>
            <template slot="title">
              {{ last_updated_date | Moment }}
            </template>
            {{ last_updated_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
        </span>
        <span slot="status" slot-scope="_,record">
          <a>{{ record.product.is_marketable === 0 ? '未上架' : '已上架' }} </a>
          <span> {{ (record.product.stock - record.product.allocated_stock) > 0 ? '有货' : '缺货' }}</span>
        </span>
        <span slot="has_sent" slot-scope="has_sent">
          <a-icon type="close" v-if="has_sent === 0"/>
          <a-icon type="check" v-else/>
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
  </page-header-wrapper>
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { getProductNotifyList } from '@/api/product_notify'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'product.name'
  },
  {
    title: '会员',
    dataIndex: 'member_name'
  },
  {
    title: 'E-mail',
    dataIndex: 'email'
  },
  {
    title: '登记日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  },
  {
    title: '通知日期',
    dataIndex: 'last_updated_date',
    scopedSlots: { customRender: 'last_updated_date' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '已发送',
    dataIndex: 'has_sent',
    scopedSlots: { customRender: 'has_sent' }
  }
]

const query = {
  Email: null
}

export default {
  components: {
    Box,
    Reload
  },
  name: 'ProductNotify',
  data() {
    return {
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0,
        list: []
      },
      form: {
        selectOption: 'Email', // 搜索框Select
        query: query
      },
      columns,
      loading: false
    }
  },
  created() {
    this._getProductNotifyList()
  },
  methods: {
    /**
     * 到货通知筛选
     */
    handleDropdownChange(e) {

    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Email: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getProductNotifyList()
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getProductNotifyList()
    },
    /**
     * 获取到货通知列表
     * @private
     */
    _getProductNotifyList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      getProductNotifyList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
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
