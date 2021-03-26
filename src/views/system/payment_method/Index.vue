<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="plus" @click="toAddPage">添加</a-button>
      <a-button icon="close" :disabled="isCanDelete" @click="_deletePaymentMethod">删除</a-button>
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
    <a-input-group compact slot="right">
      <a-select
        default-value="Name"
        size="small"
        @change="handleSelectChange">
        <a-select-option value="Name">
          名称
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
    <a-table
      :columns="columns"
      :data-source="pages.list"
      :scroll="{x: 'max-content' }"
      :pagination="false"
      :loading="loading"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      row-key="id"
      slot="content">
      <span slot="action" slot-scope="_,record">
        <a @click="toEditPage(record.id)">[编辑]</a>
      </span>
    </a-table>
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
import { deletePaymentMethod } from '@/api/payment_method'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type_name'
  },
  {
    title: '方式',
    dataIndex: 'method_name'
  },
  {
    title: '排序',
    dataIndex: 'orders'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
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
  name: 'PaymentMethod',
  computed: {
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    }
  },
  data() {
    return {
      columns,
      // 搜索表单的搜索条件
      form: {
        selectOption: 'Name', // 搜索框Select
        query
      },
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      loading: false,
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  created() {
    this._getPaymentMethodList()
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
      this._getPaymentMethodList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getPaymentMethodList()
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
      this._getPaymentMethodList()
    },
    /**
     * 跳转添加页面
     */
    toAddPage() {
      this.$router.push({ name: 'PaymentMethodAdd' })
    },
    /**
     * 跳转编辑页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'PaymentMethodEdit', params: { id: id } })
    },
    /**
     * 获取支付方式
     * @private
     */
    _getPaymentMethodList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'Orders'
      const order = 'asc'

      this.loading = true
      this.$store.dispatch('GetPaymentMethods', { query, sortby, order, pageNumber, pageSize }).then((pageList) => {
        this.pages = pageList
        this.loading = false
      })
    },
    /**
     * 删除支付方式
     * @private
     */
    _deletePaymentMethod() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        okText: '确定',

        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deletePaymentMethod(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getPaymentMethodList()
            }
          })
        },
        onCancel() {

        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
