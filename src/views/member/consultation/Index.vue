<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="close" :disabled="isCanUpOrDownOrDelete" @click="handleDelete">删除</a-button>
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
        default-value="Content__icontans"
        size="small"
        style="width: 70px"
        @change="handleSelectChange">
        <a-select-option value="Content__icontans">
          内容
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
        <span slot="product_name" slot-scope="product_name">
          <a>{{ product_name }}</a>
        </span>
        <span slot="is_show" slot-scope="is_show">
          <a v-if="is_show">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" style="color: red" v-else/>
        </span>
        <span slot="for_consultation" slot-scope="for_consultation">
          <a v-if="for_consultation">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" style="color: red" v-else/>
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
          <a @click="toReplyPage(record.id)">[回复]</a>
          <a-divider type="vertical" />
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
import { deleteConsultation, getConsultationList } from '@/api/consultation'

const columns = [
  {
    title: '商品',
    dataIndex: 'product_name',
    scopedSlots: { customRender: 'product_name' }
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '会员',
    dataIndex: 'username'
  },
  {
    title: '是否显示',
    dataIndex: 'is_show',
    scopedSlots: { customRender: 'is_show' }
  },
  {
    title: '已回复',
    dataIndex: 'for_consultation',
    scopedSlots: { customRender: 'for_consultation' }
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
  Content__icontans: null,
  Score: null
} // 查询条件

export default {
  components: {
    Box,
    Reload
  },
  name: 'ConsultationList',
  computed: {
    isCanUpOrDownOrDelete() {
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
        selectOption: 'Content__icontains', // 搜索框Select
        query
      }
    }
  },
  created() {
    this._getConsultationList()
  },
  methods: {
    /**
     * 删除咨询
     */
    handleDelete() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteConsultation(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getConsultationList()
            }
          })
        }
      })
    },
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
      this._getConsultationList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getConsultationList()
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Content: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getConsultationList()
    },
    /**
     * 跳转咨询编辑页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'ConsultationEdit', params: { id: id } })
    },
    /**
     * 跳转回复咨询页面
     * @param id
     */
    toReplyPage(id) {
      this.$router.push({ name: 'ConsultationReply', params: { id: id } })
    },
    _getConsultationList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true

      getConsultationList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.pages = res.data
          this.selectedRowKeys = []
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
