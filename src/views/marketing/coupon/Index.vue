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
        <span slot="begin_date" slot-scope="begin_date">
          <a-tooltip v-if="begin_date">
            <template slot="title">
              {{ begin_date | Moment }}
            </template>
            {{ begin_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
          <span v-else>-</span>
        </span>
        <span slot="end_date" slot-scope="end_date">
          <a-tooltip v-if="end_date">
            <template slot="title">
              {{ end_date | Moment }}
            </template>
            {{ end_date | Moment('YYYY-MM-DD') }}
          </a-tooltip>
          <span v-else>-</span>
        </span>
        <span slot="is_enabled" slot-scope="is_enabled">
          <a v-if="is_enabled">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" style="color: red" v-else/>
        </span>
        <span slot="action" slot-scope="_,record">
          <a @click="toCodePage(record.id)">生成优惠码</a>
          <a-divider type="vertical"/>
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
import { deleteCoupon, getCouponList } from '@/api/coupon'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '前缀',
    dataIndex: 'prefix'
  },
  {
    title: '使用日期',
    dataIndex: 'begin_date',
    scopedSlots: { customRender: 'begin_date' }
  },
  {
    title: '结束日期',
    dataIndex: 'end_date',
    scopedSlots: { customRender: 'end_date' }
  },
  {
    title: '是否启用',
    dataIndex: 'is_enabled',
    scopedSlots: { customRender: 'is_enabled' }
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
  name: 'CouponList',
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
    this._getCouponList()
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
      this._getCouponList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getCouponList()
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
      this._getCouponList()
    },
    /**
     * 跳转添加优惠券页面
     */
    toAddPage() {
      this.$router.push({ name: 'CouponAdd' })
    },
    /**
     * 跳转编辑优惠券页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'CouponEdit', params: { id: id } })
    },
    /**
     * 跳转生成优惠券码页面
     */
    toCodePage(id) {
      this.$router.push({ name: 'CouponCode', params: { id: id } })
    },
    /**
     * 删除优惠券
     */
    handleDelete() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteCoupon(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getCouponList()
            }
          })
        }
      })
    },
    _getCouponList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true

      getCouponList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
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
