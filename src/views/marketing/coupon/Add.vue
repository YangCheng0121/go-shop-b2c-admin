<template>
  <box class="padding-10px">
    <div slot="content">
      <a-tabs type="card">
        <a-tab-pane key="Basic" tab="基本信息">
          <basic ref="Basic"/>
        </a-tab-pane>
        <a-tab-pane key="Introduction" tab="介绍" forceRender>
          <introduction ref="Introduction"/>
        </a-tab-pane>
      </a-tabs>
      <a-row>
        <a-col v-bind="colLayout"></a-col>
        <a-col>
          <confirm-back @confirm="handleSubmit"/>
        </a-col>
      </a-row>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import Basic from './components/Edit/Basic'
import Introduction from './components/Edit/Introduction'
import { addCoupon } from '@/api/coupon'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Introduction,
    ConfirmBack
  },
  name: 'CouponAdd',
  data() {
    return {
      colLayout: {
        span: 3
      }
    }
  },
  methods: {
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const introductionParam = await this.$refs.Introduction.handleSubmit()

      const coupon = Object.assign({}, basicParam, introductionParam)
      this._addCoupon(coupon)
    },
    /**
     * 添加优惠券
     * @param coupon
     * @private
     */
    _addCoupon(coupon) {
      this.spinning = true
      addCoupon(JSON.stringify(coupon)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        } else {
          this.$message.error(res.data)
        }
        this.spinning = false
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
