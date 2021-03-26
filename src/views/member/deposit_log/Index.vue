<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button @click="toAddPage">预存款调整</a-button>
      <reload/>
      <a-dropdown>
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
    <a-input-group compact size="small" slot="right">
      <a-select
        default-value="Name"
        size="small"
        style="width: 70px"
        @change="handleSelectChange">
        <a-select-option value="Name">
          名称
        </a-select-option>
      </a-select>
      <a-input-search
        style="width:60%"
        size="small"
        enter-button
        placeholder="请输入搜索内容"
        allow-clear
        @search="handleSearch"/>
    </a-input-group>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="pages.list"
        :scroll="{x: 'max-content' }"
        :pagination="false"
        :loading="loading"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        row-key="id">
        <span slot="credit" slot-scope="credit">
          {{ credit | Amount }}
        </span>
        <span slot="detinyint" slot-scope="detinyint">
          {{ detinyint | Amount }}
        </span>
        <span slot="balance" slot-scope="balance">
          {{ balance | Amount }}
        </span>
        <span slot="member" slot-scope="member">
          <a>{{ member }}</a>
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
    </div>
    <a-pagination
      :default-current="pages.page_number"
      :page-size.sync="pages.page_size"
      :total="pages.total"
      @change="handlePaginationChange"
      slot="footer"/>
  </box>
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { ERR_OK } from '@/api/config'
import { getDepositLogList } from '@/api/deposit_log'

const columns = [
  {
    title: '类型',
    dataIndex: 'type_name'
  },
  {
    title: '收入金额',
    dataIndex: 'credit',
    scopedSlots: { customRender: 'credit' }
  },
  {
    title: '支出金额',
    dataIndex: 'detinyint',
    scopedSlots: { customRender: 'detinyint' }
  },
  {
    title: '当前余额',
    dataIndex: 'balance',
    scopedSlots: { customRender: 'balance' }
  },
  {
    title: '会员',
    dataIndex: 'member',
    scopedSlots: { customRender: 'member' }
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
  Name: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'DepositLogList',
  computed: {
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    }
  },
  data() {
    return {
      columns: columns,
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      // 搜索表单的搜索条件
      form: {
        selectOption: 'Name', // 搜索框Select
        query
      }
    }
  },
  created() {
    this._getDepositLogList()
  },
  methods: {
    /**
     * 选中
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getDepositLogList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getDepositLogList()
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Name: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getDepositLogList()
    },
    /**
     * 跳转预存款调整页面
     */
    toAddPage() {
      this.$router.push({ name: 'MemberDepositLogAdd' })
    },
    _getDepositLogList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true

      getDepositLogList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
