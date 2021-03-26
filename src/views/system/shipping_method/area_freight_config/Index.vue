<template>
  <box>
    <a-button-group size="small" slot="left">
      <a-button icon="plus" @click="toAddPage">添加</a-button>
      <a-button icon="close" :disabled="isCanDelete" @click="_deleteAreaFreightConfig">删除</a-button>
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
    <a-table
      :columns="columns"
      :data-source="pages.list"
      :scroll="{x: 'max-content' }"
      :pagination="false"
      :loading="loading"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      row-key="id"
      slot="content">
      <span slot="first_price" slot-scope="first_price">
        {{ first_price | Amount }}
      </span>
      <span slot="continue_price" slot-scope="continue_price">
        {{ continue_price | Amount }}
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
import { deleteAreaFreightConfig, getAreaFreightConfigList } from '@/api/area_freight_config'
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '地区',
    dataIndex: 'area_full_name'
  },
  {
    title: '首重价格',
    dataIndex: 'first_price',
    scopedSlots: { customRender: 'first_price' }
  },
  {
    title: '续重价格',
    dataIndex: 'continue_price',
    scopedSlots: { customRender: 'continue_price' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    Box,
    Reload
  },
  name: 'Shipping',
  computed: {
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    },
    ...mapGetters([
      'currentShippingMethod'
    ])
  },
  data() {
    return {
      columns,
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
    if (!this.currentShippingMethod) {
      this.$router.back()
      return
    }
    this._getAreaFreightConfigList()
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
      this._getAreaFreightConfigList()
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getAreaFreightConfigList()
    },
    /**
     * 跳转添加运费配置页面
     */
    toAddPage() {
      this.$router.push({ name: 'AreaFreightConfigAdd' })
    },
    /**
     * 跳转编辑页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'AreaFreightConfigEdit', params: { id: id } })
    },
    /**
     * 获取地区运费配置列表
     * @private
     */
    _getAreaFreightConfigList() {
      const query = {
        ShippingMethodId: this.currentShippingMethod.id
      }
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序

      this.loading = true
      this.$route.meta.title = '运费配置列表(' + this.currentShippingMethod.name + ')'
      getAreaFreightConfigList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.pages = res.data
          this.loading = false
        }
      })
    },
    /**
     * 删除地区运费配置
     * @private
     */
    _deleteAreaFreightConfig() {
      this.$confirm({
        title: '提示',
        content: '您确定删除吗?',
        okText: '确定',

        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteAreaFreightConfig(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getAreaFreightConfigList()
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
