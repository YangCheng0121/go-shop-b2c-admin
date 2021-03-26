<template>
  <box>
    <!--Header-->
    <a-button-group size="small" slot="left">
      <a-button icon="plus" @click="handleAdd">添加</a-button>
      <a-button icon="close" :disabled="isCanUpOrDownOrDelete" @click="handleDelete">删除</a-button>
      <reload/>
      <a-button icon="up" :disabled="isCanUpOrDownOrDelete" @click="handleMarketable(1)">上架</a-button>
      <a-button icon="down" :disabled="isCanUpOrDownOrDelete" @click="handleMarketable(0)">下架</a-button>
      <a-dropdown :trigger="['click']">
        <a-menu slot="overlay" @click="handleFilterClick">
          <a-menu-item key="IsMarketable:1">已上架</a-menu-item>
          <a-menu-item key="IsMarketable:0">未上架</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="IsList:1">已列出</a-menu-item>
          <a-menu-item key="IsList:0">未列出</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="IsTop:1">已置顶</a-menu-item>
          <a-menu-item key="IsTop:0">未置顶</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="Stock__gt:0">有货</a-menu-item>
          <a-menu-item key="Stock:0">缺货</a-menu-item>
        </a-menu>
        <a-button>
          商品筛选
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
      <a-button @click="showModal">更多选项</a-button>
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
        default-value="Sn"
        size="small"
        style="width: 70px"
        @change="handleSelectChange">
        <a-select-option value="Sn">
          编号
        </a-select-option>
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
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="pages.list"
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :scroll="{x: 'max-content' }"
        :loading="loading"
        row-key="id">
        <span slot="sn" slot-scope="sn,record">
          <span :class="{'red': record.is_stock_alert || record.is_out_of_stock }">{{ sn }}</span>
        </span>
        <span slot="name" slot-scope="name,record">
          {{ name }}
          <span
            v-if="record.promotions"
            class="promotion">
            {{ record.promotions[0].name }}
          </span>
          <span v-if="record.type === 'gift'" class="red">*</span>
        </span>
        <span slot="price" slot-scope="price">
          {{ price | Amount }}
        </span>
        <span slot="icon" slot-scope="bol">
          <a v-if="bol">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" v-else style="color: red"/>
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
          <a @click="handleEdit(record.sn)">[编辑]</a>
        </span>
      </a-table>
      <!--Modal-->
      <a-modal
        title="更多选项"
        width="600px"
        v-model="visible"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
          :form="moreForm"
          v-bind="moreFormLayout">
          <a-form-item label="商品分类">
            <input-dropdown
              v-decorator="[
                'productCategory',
                {
                  valuePropName: 'productCategory'
                }
              ]"
              default-value="请选择..."
              :dropdown-data="productCategoryList"/>
          </a-form-item>
          <a-form-item label="类型">
            <a-select
              v-decorator="[
                'type' ,
                {
                  valuePropName: 'type'
                }
              ]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="(type,index) in productTypes" :key="index" :value="type.value">
                {{ type.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="品牌">
            <a-select
              v-decorator="[
                'brand',
                {
                  valuePropName: 'brand'
                }
              ]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="brand in brandPageList.list" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="商品标签">
            <a-select
              v-decorator="[
                'tag',
                {
                  valuePropName: 'tag'
                }]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="tag in tagPageList.list" :key="tag.id" :value="tag.id">
                {{ tag.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="促销">
            <a-select
              v-decorator="[
                'promotion',
                {
                  valuePropName: 'promotion'
                }
              ]"
              default-value="">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="promotion in promotionPageList" :key="promotion.id" :value="promotion.id">
                {{ promotion.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
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
import { Box, InputDropdown, Reload } from '@/components'
import { ERR_OK } from '@/api/config'
import { deleteProduct, toggleMarketableProduct } from '@/api/product'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn',
    width: '190px',
    scopedSlots: { customRender: 'sn' }
  },
  {
    title: '名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '商品分类',
    dataIndex: 'product_category_name'
  },
  {
    title: '销售价',
    dataIndex: 'skus[0].price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '是否上架',
    dataIndex: 'is_marketable',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '是否列出',
    dataIndex: 'is_list',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '创建日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: '160px'
  }
]

const query = {
  Sn: null,
  Name: null
} // 查询条件

export default {
  components: {
    Box,
    InputDropdown,
    Reload
  },
  name: 'ProductList',
  computed: {
    /**
     * 是否上架 | 下架 | 删除
     */
    isCanUpOrDownOrDelete() {
      return Boolean(!this.selectedRowKeys.length)
    },
    productCategoryList() {
      const treeDataProductCategoryList = this.treeDataProductCategoryList.slice()
      treeDataProductCategoryList.unshift({
        id: '',
        name: '请选择...'
      })
      return treeDataProductCategoryList
    },
    ...mapGetters([
      'treeDataProductCategoryList',
      'brandPageList',
      'tagPageList',
      'promotionPageList',
      'productTypes'
    ])
  },
  data() {
    return {
      columns: columns,
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0,
        list: []
      },
      moreForm: this.$form.createForm(this, { name: 'moreForm' }),
      // 选中时的keys
      selectedRowKeys: [], // Check here to configure the default column
      visible: false, // 更多选项 modal visible
      // 搜索表单的搜索条件
      form: {
        selectOption: 'Sn', // 搜索框Select
        query
      },
      // 更多选项表单布局
      moreFormLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 17,
          offset: 1
        }
      },
      loading: false
    }
  },
  created() {
    this._getProductList()
    this.$store.dispatch('GetProductCategoryList')
    this.$store.dispatch('GetAllBrandPageList')
    this.$store.dispatch('GetAllTagPageList')
    this.$store.dispatch('GetAllPromotionList')
  },
  methods: {
    /**
     * 添加商品
     */
    handleAdd() {
      this.$router.push({ name: 'ProductAdd' })
    },
    /**
     * 删除商品
     */
    handleDelete() {
      this.$confirm({
        title: '提示',
        content: '您确定要删除吗?',
        onOk: () => {
          const ids = this.selectedRowKeys.join(',')
          deleteProduct(ids).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getProductList()
            }
          })
        }
      })
    },
    /**
     * 上架/下架
     */
    handleMarketable(isMarketable) {
      this.$confirm({
        title: '提示',
        content: `您确定要${isMarketable ? '上架' : '下架'}吗?`,
        onOk: () => {
          const params = {
            ids: this.selectedRowKeys.join(','),
            isMarketable: isMarketable
          }
          toggleMarketableProduct(params).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getProductList()
            }
          })
        }
      })
    },
    /**
     * 编辑商品
     */
    handleEdit(sn) {
      this.$router.push({ name: 'ProductEdit', params: { sn: sn } })
    },
    /**
     * 页码回调
     */
    handlePageSizeClick({ key }) {
      this.pages.page_size = Number(key)
      this._getProductList()
    },
    /**
     * 点击商品筛选菜单回调
     */
    handleFilterClick({ key }) {
      const splitKey = key.split(':')
      this.form.query = Object.assign({}, query, {
        [splitKey[0]]: splitKey[1]
      })
      this._getProductList()
    },
    /**
     * 选择表格项处理
     */
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 显示更多选项Modal
     */
    showModal() {
      this.visible = true
    },
    /**
     * 更多选项Modal确认回调
     */
    handleOk() {
      this.moreForm.validateFields((err, values) => {
        if (!err) {
          this.form.query = {
            ProductCategoryId: values.productCategory && values.productCategory.id,
            Type: values.type && values.type,
            BrandId: values.brand && values.brand,
            Tag: values.tag && values.tag,
            Promotions: values.promotion && values.promotion
          }
          this.pages.page_number = 1
          this._getProductList()
          this.visible = false
        }
      })
    },
    /**
     * 更多选项Modal取消回调
     */
    handleCancel() {
      this.visible = false
    },
    /**
     * Select 切换时回调
     */
    handleSelectChange(value) {
      this.form.query = {
        Sn: null,
        Name: null
      }
      this.form.selectOption = value
    },
    /**
     * 点击搜索或按下回车键时的回调
     */
    handleSearch(keyword) {
      this.form.query[this.form.selectOption] = keyword
      this._getProductList()
    },
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getProductList()
    },
    /**
     * 获取商品列表
     * @private
     */
    _getProductList(tag) {
      const query = this.form.query
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true
      this.$store.dispatch('GetProductList', { query, sortby, order, pageNumber, pageSize, tag }).then((data) => {
        data.list = data.list || []
        data.list.forEach((item) => {
          if (item.skus) {
            let isOutOfStock = true
            let isStockAlert = true
            item.skus.forEach((sku) => {
              if (sku.stock > 0) {
                isOutOfStock = false
                isStockAlert = false
              }
            })
            if (isOutOfStock) {
              item['is_out_of_stock'] = 1
            }
            if (isStockAlert) {
              item['is_stock_alert'] = 1
            }
          }
        })
        this.pages = data
        this.selectedRowKeys = []
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">

.promotion {
  color: #cccccc;
}
</style>
