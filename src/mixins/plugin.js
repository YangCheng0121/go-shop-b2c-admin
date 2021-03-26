import { Box, Reload } from '@/components'
import { ERR_OK } from '@/api/config'
import { getPluginConfigList, updatePluginConfig } from '@/api/plugin_config'
import { APP_RELOAD } from '@/store/mutation-types'

const pluginMixin = {
  components: {
    Box,
    Reload
  },
  data() {
    return {
      pages: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    /**
     * 跳转编辑页面
     */
    toEditPage(name, id) {
      this.$router.push({ name: name, params: { id: id } })
    },
    /**
     * 获取支付插件
     * @private
     */
    _getPluginConfigList(type) {
      const query = {
        Type: type
      }
      const pageNumber = this.pages.page_number
      const pageSize = this.pages.page_size
      const sortby = 'Orders'
      const order = 'asc'

      this.loading = true
      getPluginConfigList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          if (data && data.list) {
            data.list.forEach((item) => {
              if (item.attributes) {
                item.attributes = JSON.parse(item.attributes)
              }
            })
          }
          this.pages = data
          this.loading = false
        }
      })
    },
    /**
     * 启用或卸载插件
     */
    handleEnablePluginConfig(pluginConfig) {
      const text = pluginConfig.is_enabled ? '卸载' : '启用'
      this.$confirm({
        title: '提示',
        content: `您确定要${text}吗?`,
        okText: '确定',

        onOk: () => {
          pluginConfig.is_enabled = pluginConfig.is_enabled ? 0 : 1
          pluginConfig.attributes = JSON.stringify(pluginConfig.attributes)
          updatePluginConfig(JSON.stringify(pluginConfig)).then((res) => {
            if (res.err_code === ERR_OK) {
              this.$store.commit(APP_RELOAD)
            }
          })
        },
        onCancel() {
        }
      })
    }
  }
}

export default pluginMixin
