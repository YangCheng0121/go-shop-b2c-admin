<template>
  <box>
    <a-button-group size="small" slot="left">
      <reload/>
    </a-button-group>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="pages.list"
        :scroll="{x: 'max-content' }"
        :pagination="false"
        :loading="loading"
        row-key="id">
        <span slot="is_mail_enabled" slot-scope="is_mail_enabled">
          <a v-if="is_mail_enabled">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" v-else style="color:red;"/>
        </span>
        <span slot="is_sms_enabled" slot-scope="is_sms_enabled">
          <a v-if="is_sms_enabled">
            <a-icon type="check"/>
          </a>
          <a-icon type="close" v-else style="color:red;"/>
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
          <a @click="toEditPage(record.id)">[编辑]</a>
        </span>
      </a-table>
    </div>
  </box>
</template>

<script type="es6">
import { Box, Reload } from '@/components'
import { ERR_OK } from '@/api/config'
import { getMessageConfigList } from '@/api/message_config'

const columns = [
  {
    title: '类型',
    dataIndex: 'type_name'
  },
  {
    title: '是否启用邮件',
    dataIndex: 'is_mail_enabled',
    scopedSlots: { customRender: 'is_mail_enabled' }
  },
  {
    title: '是否启用短信',
    dataIndex: 'is_sms_enabled',
    scopedSlots: { customRender: 'is_sms_enabled' }
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
  name: 'MessageConfigList',
  computed: {
    isCanDelete() {
      return Boolean(!this.selectedRowKeys.length)
    }
  },
  data() {
    return {
      columns: columns,
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this._getMessageConfigList()
  },
  methods: {
    /**
     * 分页回调
     */
    handlePaginationChange(val) {
      this.pages.page_number = val
      this._getMessageConfigList()
    },
    /**
     * 跳转消息配置页面
     */
    toEditPage(id) {
      this.$router.push({ name: 'MessageConfigEdit', params: { id: id } })
    },
    _getMessageConfigList() {
      const query = {}
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'CreationDate'
      const order = 'desc' // 倒序
      this.loading = true

      getMessageConfigList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          this.pages = res.data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
