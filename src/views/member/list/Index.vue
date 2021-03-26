<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="plus" @click="toAddPage">添加</a-button>
      <a-button icon="close" :disabled="isCanDelete" @click="handleDelete">删除</a-button>
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
        default-value="Username"
        size="small"
        style="width: 90px"
        @change="handleSelectChange">
        <a-select-option value="Username">
          用户名
        </a-select-option>
        <a-select-option value="Email">
          E-mail
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
        <span slot="email" slot-scope="email">
          {{ email ? email : '-' }}
        </span>
        <span slot="status" slot-scope="_, record">
          <a v-if="record.is_enabled && !record.is_locked">
            正常
          </a>
          <a v-if="!record.is_enabled" style="color: gray">
            禁用
          </a>
          <a v-if="record.is_locked" style="color: red">
            锁定
          </a>
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
import { deleteMember, getMemberList } from '@/api/member'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '会员等级',
    dataIndex: 'member_rank'
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' }
  },
  {
    title: '状态',
    dataIndex: 'status',
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
  Username: null,
  Email: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'MemberList',
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
        selectOption: 'Username', // 搜索框Select
        query
      }
    }
  },
  created() {
    this._getMemberList()
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
      this._getMemberList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getMemberList()
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Username: null,
        Email: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getMemberList()
    },
    /**
     * 跳转会员添加页面
     */
    toAddPage() {
      this.$router.push({ name: 'MemberAdd' })
    },
    /**
     * 跳转会员编辑页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'MemberEdit', params: { id: id } })
    },
    /**
     * 删除会员
     */
    handleDelete() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteMember(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getMemberList()
            }
          })
        }
      })
    },
    _getMemberList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true

      getMemberList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
