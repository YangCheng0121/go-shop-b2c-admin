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
      <span slot="options" slot-scope="options">
        <span v-for="(o,index) in options" :key="index">{{ o }} </span>
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
import { deleteAttribute } from '@/api/attribute'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '绑定分类',
    dataIndex: 'product_category.name'
  },
  {
    title: '可选项',
    dataIndex: 'options',
    scopedSlots: { customRender: 'options' },
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
  name: 'ProductAttribute',
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
      pageList: 'attributePageList'
    })
  },
  watch: {
    pageList(newPageList) {
      this.pages = newPageList
    }
  },
  created() {
    this._getAttributeList()
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: 'ProductAttributeAdd' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'ProductAttributeEdit', params: { id: id } })
    },
    /**
     * 删除处理
     */
    handleDelete() {
      this.$confirm({
        title: '您确定要删除吗?',
        okType: 'danger',
        onOk: () => {
          this._deleteAttribute()
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
      this._getAttributeList()
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getAttributeList()
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
      this._getAttributeList()
    },
    /**
     * 获取商品属性
     * @private
     */
    _getAttributeList() {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      this.$store.dispatch('GetAttributePageList', { query, sortby, order, pageNumber, pageSize }).then((res) => {
        this.loading = false
      })
    },
    /**
     * 删除标签
     * @private
     */
    _deleteAttribute() {
      const ids = this.selectedRowKeys.join(',')
      deleteAttribute(ids).then((res) => {
        if (res.err_code === ERR_OK) {
          this.selectedRowKeys = []
          this._getAttributeList()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
