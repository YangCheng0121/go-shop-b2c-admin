<template>
  <box>
    <a-button-group size="small" slot="left">
      <reload/>
    </a-button-group>
    <a-table
      :columns="columns"
      :data-source="pages.list"
      :scroll="{x: 'max-content' }"
      :pagination="false"
      :loading="loading"
      row-key="id"
      slot="content">
      <span slot="version" slot-scope="version">
        {{ version ? version : '1.0' }}
      </span>
      <span slot="is_enabled" slot-scope="is_enabled">
        <a-icon type="check" v-if="is_enabled"/>
        <a-icon type="close" v-else/>
      </span>
      <span slot="action" slot-scope="_,record">
        <a v-if="!record.is_enabled" @click="handleEnablePluginConfig(record)">[启用]</a>
        <template v-else>
          <a @click="toEditPage('StoragePluginEdit',record.id)">[设置]</a>
          <a-divider type="vertical"/>
          <a @click="handleEnablePluginConfig(record)">[卸载]</a>
        </template>
      </span>
    </a-table>
  </box>
</template>

<script type="es6">
import { pluginMixin } from '@/mixins'

const columns = [
  {
    title: '名称',
    dataIndex: 'attributes.name'
  },
  {
    title: '版本',
    dataIndex: 'attributes.version',
    scopedSlots: { customRender: 'version' }
  },
  {
    title: '作者',
    dataIndex: 'create_by'
  },
  {
    title: '启用',
    dataIndex: 'is_enabled',
    scopedSlots: { customRender: 'is_enabled' }
  },
  {
    title: '排序',
    dataIndex: 'orders'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [pluginMixin],
  name: 'StoragePlugin',
  data() {
    return {
      columns
    }
  },
  created() {
    this._getPluginConfigList('storage')
  }
}
</script>

<style scoped lang="less">

</style>
