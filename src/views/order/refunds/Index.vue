<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="close" :disabled="isCanDelete">删除</a-button>
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
        default-value="Sn"
        size="small"
        style="width: 90px"
        @change="handleSelectChange">
        <a-select-option value="Sn">
          编号
        </a-select-option>
        <a-select-option value="Account">
          退款账号
        </a-select-option>
        <a-select-option value="Payee">
          收款人
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
        row-key="sn">
        <span slot="is_review" slot-scope="is_review">
          <a-icon type="check" v-if="is_review"/>
          <a-icon type="close" v-else style="color: red"/>
        </span>
        <span slot="amount" slot-scope="amount">
          {{ amount | Amount }}
        </span>
        <span slot="fee" slot-scope="fee">
          {{ fee | Amount }}
        </span>
        <span slot="creation_date" slot-scope="creation_date">
          <a-tooltip>
            <template slot="title">
              {{ creation_date | Moment }}
            </template>
            {{ creation_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
        </span>
        <span slot="action" slot-scope="_,record">
          <a @click="toLookPage(record.sn)">[查看]</a>
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
import { getRefundsList } from '@/api/refunds'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '是否审核通过',
    dataIndex: 'is_reivew',
    scopedSlots: { customRender: 'is_review' }
  },
  {
    title: '方式',
    dataIndex: 'method_name'
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method'
  },
  {
    title: '退款金额',
    dataIndex: 'amount',
    scopedSlots: { customRender: 'amount' }
  },
  {
    title: '收款人',
    dataIndex: 'payee'
  },
  {
    title: '订单',
    dataIndex: 'order_sn'
  },
  {
    title: '创建日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const query = {
  Sn: null,
  Account: null,
  Payee: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'RefundsList',
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
        selectOption: 'Sn', // 搜索框Select
        query
      }
    }
  },
  created() {
    this._getRefundsList()
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
      this._getRefundsList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getRefundsList()
    },
    /**
     * Modal 点击确定回调
     */
    handleOk() {
      this.handleSubmit()
    },
    /**
     * Modal 点击取消回调
     */
    handleCancel() {
      this.hideModal()
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Sn: null,
        Account: null,
        Payee: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getRefundsList()
    },
    /**
     * 跳转查看退款信息页面
     */
    toLookPage(sn) {
      this.$router.push({ name: 'RefundsLook', params: { sn: sn } })
    },
    _getRefundsList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      getRefundsList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
