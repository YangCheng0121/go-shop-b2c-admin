<template>
  <box>
    <a-table
      :columns="columns"
      :data-source="products"
      :pagination="false"
      :loading="loading"
      row-key="id"
      slot="content">
      <span slot="price" slot-scope="price">
        {{ price | Amount }}
      </span>
      <span slot="total" slot-scope="total">
        {{ total | Amount }}
      </span>
    </a-table>
  </box>
</template>

<script type="es6">
import { Box } from '@/components'
import { getOrderProducts } from '@/api/order'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '价格',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '数量',
    dataIndex: 'quantity'
  },
  {
    title: '小计',
    dataIndex: 'total',
    scopedSlots: { customRender: 'total' }
  }
]

export default {
  components: {
    Box
  },
  name: 'ProductInfo',
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  data() {
    return {
      products: [],
      columns,
      loading: false
    }
  },
  created() {
    this._getOrderProducts()
  },
  methods: {
    /**
     * 获取订单商品信息
     * @private
     */
    _getOrderProducts() {
      const orderId = this.order.id
      this.loading = true
      getOrderProducts(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          data.forEach((item) => {
            item['total'] = item.price * item.quantity
          })
          this.products = data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
