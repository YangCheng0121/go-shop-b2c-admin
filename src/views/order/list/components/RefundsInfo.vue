<template>
  <box>
    <a-table
      :columns="columns"
      :data-source="refunds"
      :pagination="false"
      :loading="loading"
      row-key="id"
      slot="content">
      <span slot="fee" slot-scope="fee">
        {{ fee | Amount }}
      </span>
      <span slot="amount" slot-scope="amount">
        {{ amount | Amount }}
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
import { getRefundsByOrder } from '@/api/refunds'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '方式',
    dataIndex: 'method_name'
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method'
  },
  {
    title: '退款金额',
    dataIndex: 'amount',
    scopedSlots: { customRender: 'amount' }
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
  name: 'RefundInfo',
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  data() {
    return {
      refunds: [],
      columns,
      loading: false
    }
  },
  created() {
    this._getRefundsByOrder()
  },
  methods: {
    /**
     * 获取订单退款信息
     * @private
     */
    _getRefundsByOrder() {
      const orderId = this.order.id
      this.loading = true
      getRefundsByOrder(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          this.refunds = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
