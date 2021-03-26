<template>
  <box>
    <a-table
      :columns="columns"
      :data-source="returns"
      :pagination="false"
      :loading="loading"
      row-key="id"
      slot="content">
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
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'
import { getReturnsByOrder } from '@/api/returns'

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
    title: '发货人',
    dataIndex: 'shipper'
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
  name: 'ReturnInfo',
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  data() {
    return {
      returns: [],
      columns,
      loading: false
    }
  },
  created() {
    this._getReturnsByOrder()
  },
  methods: {
    /**
     * 获取订单退款信息
     * @private
     */
    _getReturnsByOrder() {
      const orderId = this.order.id
      this.loading = true
      getReturnsByOrder(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          this.returns = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
