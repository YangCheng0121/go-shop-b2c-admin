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
        v-model="form.selectOption"
        default-value="Title"
        size="small"
        style="width: 70px">
        <a-select-option value="Title">
          标题
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
        <span slot="begin_date" slot-scope="begin_date">
          <span v-if="begin_date">
            {{ begin_date | Moment }}
          </span>
          <span v-else>-</span>
        </span>
        <span slot="end_date" slot-scope="end_date">
          <span v-if="end_date">
            {{ end_date | Moment }}
          </span>
          <span v-else>-</span>
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
import { deleteAd, getAdList } from '@/api/ad'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '广告',
    dataIndex: 'ad_position'
  },
  {
    title: '起始日期',
    dataIndex: 'begin_date',
    scopedSlots: { customRender: 'begin_date' }
  },
  {
    title: '结束日期',
    dataIndex: 'end_date',
    scopedSlots: { customRender: 'end_date' }
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
  Title: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'AdList',
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
        selectOption: 'Title', // 搜索框Select
        query
      }
    }
  },
  created() {
    this._getAdList()
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
      this._getAdList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getAdList()
    },
    /**
     * 删除广告
     */
    handleDelete() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteAd(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getAdList()
            }
          })
        }
      })
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Name: null,
        Title: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getAdList()
    },
    /**
     * 跳转添加广告页面
     */
    toAddPage() {
      this.$router.push({ name: 'AdAdd' })
    },
    /**
     * 跳转编辑广告页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'AdEdit', params: { id: id } })
    },
    _getAdList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'Orders'
      const order = 'asc' // 顺序
      this.loading = true

      getAdList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
