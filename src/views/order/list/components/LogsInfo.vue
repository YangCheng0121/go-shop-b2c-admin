<template>
  <box>
    <a-table
      :columns="columns"
      :data-source="logs"
      :pagination="false"
      :loading="loading"
      slot="content"
      row-key="id">
      <span slot="content" slot-scope="content">
        {{ content ? content : '-' }}
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
import { getOrderLogs } from '@/api/order'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: '类型',
    dataIndex: 'type_name'
  },
  {
    title: '详情',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' }
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
  name: 'LogInfo',
  computed: {
    ...mapGetters([
      'order'
    ])
  },
  data() {
    return {
      logs: [],
      columns,
      loading: false
    }
  },
  created() {
    this._getOrderLogs()
  },
  methods: {
    /**
     * 获取订单记录
     * @private
     */
    _getOrderLogs() {
      const orderId = this.order.id
      this.loading = true
      getOrderLogs(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          this.logs = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
