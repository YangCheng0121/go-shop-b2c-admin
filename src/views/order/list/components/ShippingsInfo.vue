<template>
  <box>
    <a-table
      :columns="columns"
      :data-source="shippings"
      :pagination="false"
      slot="content"
      row-key="id">
      <span slot="is_delivery" slot-scope="is_delivery">
        {{ is_delivery ? '是' : '否' }}
      </span>
      <span slot="creation_date" slot-scope="creation_date">
        <a-tooltip>
          <template slot="title">
            {{ creation_date | Moment }}
          </template>
          {{ creation_date | Moment('YYYY-MM-DD') }}
        </a-tooltip>
      </span>
    </a-table>
  </box>
</template>

<script type="es6">
import { Box } from '@/components'
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'
import { getShippingByOrder } from '@/api/shipping'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '配送方式',
    dataIndex: 'shipping_method'
  },
  {
    title: '物流公司',
    dataIndex: 'delivery_corp'
  },
  {
    title: '运单号',
    dataIndex: 'tracking_no'
  },
  {
    title: '收货人',
    dataIndex: 'consignee'
  },
  {
    title: '是否需要物流',
    dataIndex: 'is_delivery',
    scopedSlots: { customRender: 'is_delivery' }
  },
  {
    title: '创建日期',
    dataIndex: 'creation_date',
    scopedSlots: { customRender: 'creation_date' }
  }
]

export default {
  components: {
    Box
  },
  name: 'ShipInfo',
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  data() {
    return {
      shippings: [],
      columns,
      loading: false
    }
  },
  created() {
    this._getShippingByOrder()
  },
  methods: {
    /**
     * 获取发货信息
     * @private
     */
    _getShippingByOrder() {
      const orderId = this.order.id
      this.loading = true
      getShippingByOrder(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          this.shippings = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
