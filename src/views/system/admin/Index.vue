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
      <a-select v-model="form.selectOption" size="small">
        <a-select-option value="Name">
          名称
        </a-select-option>
        <a-select-option value="Email">
          E-mail
        </a-select-option>
        <a-select-option value="Name">
          姓名
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
      <span slot="status" slot-scope="_,record">
        {{ !record.is_enabled ? '未启用' : record.is_locked ? '锁定' : '正常' }}
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
import { getAdminList } from '@/api/admin'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: 'E-mail',
    dataIndex: 'email'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '部门',
    dataIndex: 'department'
  },
  {
    title: '最后登录IP',
    dataIndex: 'login_ip'
  },
  {
    title: '状态',
    scopedSlots: { customRender: 'status' }
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
  Name: null,
  Email: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'Admin',
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
    this._getAdminList()
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
      this._getAdminList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getAdminList()
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getAdminList()
    },
    /**
     * 跳转添加页面
     */
    toAddPage() {
      this.$router.push({ name: 'AdminAdd' })
    },
    /**
     * 跳转编辑页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'AdminEdit', params: { id: id } })
    },
    /**
     * 获取管理员
     * @private
     */
    _getAdminList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc'

      this.loading = true
      getAdminList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.pages = res.data
          this.loading = false
        }
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
              this._getAdminList()
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
