<template>
  <box class="padding-10px">
    <div slot="content">
      <a-spin :spinning="spinning">
        <a-tabs type="card">
          <a-tab-pane key="Basic" tab="基本信息">
            <shipping-info :shipping="shipping"/>
          </a-tab-pane>
          <a-tab-pane key="ShippingItems" tab="发货项">
            <shipping-items :items="shipping.items"/>
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
import ShippingInfo from './components/ShippingInfo'
import ShippingItems from './components/ShippingItems'
import { getShipping } from '@/api/shipping'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ShippingInfo,
    ShippingItems
  },
  name: 'ShippingLook',
  data() {
    return {
      shipping: {},
      spinning: false
    }
  },
  created() {
    this._getShipping()
  },
  methods: {
    back() {
      this.$router.back()
    },
    /**
     * 获取发货信息
     * @private
     */
    _getShipping() {
      const sn = this.$route.params.sn
      this.spinning = true
      getShipping(sn).then((res) => {
        if (res.err_code === ERR_OK) {
          this.shipping = res.data
          this.spinning = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
