<template>
  <box>
    <!--Header-->
    <a-button-group slot="left" size="small">
      <a-button icon="plus" @click="handleAdd">添加</a-button>
      <a-button icon="close" :disabled="isCanDelete" @click="handleDelete">删除</a-button>
      <reload/>
      <a-dropdown :trigger="['click']">
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
          参数组
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
      :columns="columns"
      :data-source="pages.list"
      :pagination="false"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :scroll="{x: 'max-content' }"
      :loading="loading"
      row-key="id"
      slot="content">
      <span slot="parameter" slot-scope="parameter">
        <span v-for="p in parameter" :key="p.id">{{ p.name }} </span>
      </span>
      <span slot="action" slot-scope="record">
        <a @click="handleEdit(record.id)">[编辑]</a>
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
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { mapGetters } from 'vuex'
import { deleteParameter } from '@/api/parameter'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '参数组',
    dataIndex: 'name'
  },
  {
    title: '绑定分类',
    dataIndex: 'product_category.name'
  },
  {
    title: '参数名称',
    dataIndex: 'parameter',
    scopedSlots: { customRender: 'parameter' },
    ellipsis: true
  },
  {
    title: '排序',
    dataIndex: 'orders'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const query = {
  Name: null
}

export default {
  components: {
    Box,
    Reload
  },
  name: 'ProductParameter',
  data() {
    return {
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0,
        list: []
      },
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      form: {
        selectOption: 'Name', // 搜索框Select
        query: query
      },
      loading: false
    }
  },
  computed: {
    /**
     * 是否删除
     */
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    },
    ...mapGetters({
      pageList: 'parameterPageList'
    })
  },
  watch: {
    pageList(newPageList) {
      this.pages = newPageList
    }
  },
  created() {
    this._getParameterList()
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: 'ProductParameterAdd' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'ProductParameterEdit', params: { id: id } })
    },
    /**
     * 删除处理
     */
    handleDelete() {
      this.$confirm({
        title: '您确定要删除吗?',

        okType: 'danger',

        onOk: () => {
          this._deleteParameter()
        }
      })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getParameterList()
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getParameterList()
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
      this._getParameterList()
    },
    /**
     * 获取商品参数列表
     * @private
     */
    _getParameterList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'Orders'
      const order = 'asc' // 顺序
      this.loading = true
      this.$store.dispatch('GetParameterList', { query, sortby, order, pageNumber, pageSize }).then(() => {
        this.loading = false
      })
    },
    /**
     * 删除商品参数
     * @private
     */
    _deleteParameter() {
      const ids = this.selectedRowKeys.join(',')
      deleteParameter(ids).then((res) => {
        if (res.err_code === ERR_OK) {
          this._getParameterList()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
