<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="plus" @click="toAaaPage">添加</a-button>
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
        default-value="Name"
        size="small"
        style="width: 80px"
        @change="handleSelectChange">
        <a-select-option value="Name">
          名称
        </a-select-option>
        <a-select-option value="Contact">
          联系人
        </a-select-option>
        <a-select-option value="Phone">
          手机
        </a-select-option>
        <a-select-option value="Mobile">
          电话
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
        <span slot="is_default" slot-scope="is_default">
          {{ is_default ? '是' : '否' }}
        </span>
        <span slot="action" slot-scope="_,record">
          <a @click="toEditPage(record.id)">[编辑]</a>
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
import { getDeliveryCenterList } from '@/api/delivery_center'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '联系人',
    dataIndex: 'contact'
  },
  {
    title: '地区名称',
    dataIndex: 'area_name'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '邮编',
    dataIndex: 'zip_code'
  },
  {
    title: '电话',
    dataIndex: 'mobile'
  },
  {
    title: '手机',
    dataIndex: 'phone'
  },
  {
    title: '是否默认',
    dataIndex: 'is_default',
    scopedSlots: { customRender: 'is_default' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const query = {
  Name: null,
  Contact: null,
  Phone: null,
  Mobile: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'DeliveryCenterList',
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
    this._getDeliveryCenterList()
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
      this._getDeliveryCenterList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getDeliveryCenterList()
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
        Name: null,
        Contact: null,
        Phone: null,
        Mobile: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getDeliveryCenterList()
    },
    /**
     * 跳转添加发货点页面
     */
    toAaaPage() {
      this.$router.push({ name: 'DeliveryCenterAdd' })
    },
    /**
     * 跳转编辑发货点页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'DeliveryCenterEdit', params: { id: id } })
    },
    _getDeliveryCenterList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      getDeliveryCenterList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
