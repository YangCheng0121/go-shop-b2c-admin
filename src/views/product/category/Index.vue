<template>
  <table-layout>
    <!--Header-->
    <a-button-group slot="left" size="small">
      <a-button icon="plus" @click="handleAdd">添加</a-button>
      <reload/>
    </a-button-group>
    <a-table
      slot="content"
      :columns="columns"
      :data-source="treeDataProductCategoryList"
      :pagination="false"
      :scroll="{x: 'max-content' }"
      :expandedRowKeys="expandedRowKeys"
      @expand="open"
      :loading="loading"
      defaultExpandAllRows
      row-key="id">
      <span slot="action" slot-scope="id">
        <a @click="handleEdit(id)">[编辑]</a>
        <a-divider type="vertical"/>
        <a @click="handleDelete(id)">[删除]</a>
      </span>
    </a-table>
  </table-layout>
</template>

<script type="es6">
import { Reload } from '@/components'
import TableLayout from '@/components/Box/Box'
import { deleteProductCategory } from '@/api/product_category'
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '排序',
    dataIndex: 'orders'
  },
  {
    title: '操作',
    dataIndex: 'id',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    TableLayout,
    Reload
  },
  name: 'ProductCategory',
  computed: {
    ...mapGetters([
      'treeDataProductCategoryList',
      'productCategoryList'
    ])
  },
  watch: {
    treeDataProductCategoryList(newList) {
      newList.forEach((item) => {
        this.expandedRowKeys.push(item.id)
        if (item.children && item.children.length) {
          item.children.forEach((child) => {
            this.expandedRowKeys.push(child.id)
          })
        }
      })
    }
  },
  data() {
    return {
      columns,
      loading: false,
      expandedRowKeys: []
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('GetProductCategoryList').then(() => {
      this.loading = false
    })
  },
  methods: {
    open(expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id)
      } else {
        const index = this.expandedRowKeys.findIndex((value) => {
          return value === record.id
        })
        this.expandedRowKeys.splice(index, 1)
      }
    },
    /**
     * 添加回调处理
     */
    handleAdd() {
      this.$router.push({ name: 'ProductCategoryAdd' })
    },
    /**
     * 编辑回调处理
     */
    handleEdit(id) {
      this.$router.push({
        name: 'ProductCategoryEdit', params: { id: id }
      })
    },
    /**
     * 删除回调处理
     */
    handleDelete(id) {
      this.$confirm({
        title: '您确定要删除吗?',
        okType: 'danger',
        onOk: () => {
          this._deleteProductCategory(id)
        }
      })
    },
    /**
     * 删除分类
     * @param id
     * @private
     */
    _deleteProductCategory(id) {
      deleteProductCategory(id).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$store.dispatch('GetProductCategoryList')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
