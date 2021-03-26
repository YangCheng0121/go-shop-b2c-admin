<template>
  <box class="padding-10px">
    <div slot="content">
      <a-spin :spinning="spinning">
        <a-tabs type="card">
          <a-tab-pane key="Basic" tab="基本信息">
            <returns-info :shipping="returns"/>
          </a-tab-pane>
          <a-tab-pane key="ReturnsItems" tab="退货项">
            <returns-items :items="returns.items"/>
          </a-tab-pane>
        </a-tabs>
        <a-row class="padding-top-10px padding-bottom-10px">
          <a-col :span="2"/>
          <a-col>
            <a-button @click="back">返回</a-button>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </box>
</template>

<script type="es6">
import { Box } from '@/components'
import ReturnsInfo from './components/ReturnsInfo'
import ReturnsItems from './components/ReturnsItems'
import { getReturns } from '@/api/returns'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ReturnsInfo,
    ReturnsItems
  },
  name: 'ReturnsLook',
  data() {
    return {
      returns: {},
      spinning: false
    }
  },
  created() {
    this._getReturns()
  },
  methods: {
    back() {
      this.$router.back()
    },
    /**
     * 获取退货信息
     * @private
     */
    _getReturns() {
      const sn = this.$route.params.sn
      this.spinning = true
      getReturns(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          this.returns = res.data
          this.spinning = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
