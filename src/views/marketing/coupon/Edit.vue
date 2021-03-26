<template>
  <box class="padding-10px">
    <div slot="content">
      <a-spin :spinning="spinning">
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
      </a-spin>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import Basic from './components/Edit/Basic'
import Introduction from './components/Edit/Introduction'
import { updateCoupon } from '@/api/coupon'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Introduction,
    ConfirmBack
  },
  name: 'CouponEdit',
  data() {
    return {
      colLayout: {
        span: 3
      },
      spinning: false
    }
  },
  created() {
    this._getCoupon()
  },
  methods: {
    /**
     * 获取优惠券
     * @private
     */
    _getCoupon() {
      const id = this.$route.params.id
      this.spinning = true
      this.$store.dispatch('GetCoupon', id).then((data) => {
        this.$nextTick(() => {
          const setting = []
          if (data['is_enabled']) {
            setting.push('is_enabled')
          }
          if (data['is_exchange']) {
            setting.push('is_exchange')
          }
          this.$refs.Basic.setFormFieldsValue({
            name: data.name,
            prefix: data.prefix,
            condition: data.condition,
            begin_date: data.begin_date,
            end_date: data.end_date,
            maximum_price: data.maximum_price,
            maximum_quantity: data.maximum_quantity,
            minimum_price: data.minimum_price,
            minimum_quantity: data.minimum_quantity,
            point: data.point,
            price_expression: data.price_expression,
            setting: setting,
            value: data.value
          })
          this.$refs.Introduction.setFormFieldsValue({
            introduction: data.introduction
          })
          this.spinning = false
        })
      })
    },
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const introductionParam = await this.$refs.Introduction.handleSubmit()

      const coupon = Object.assign({}, basicParam, introductionParam)
      this._updateCoupon(coupon)
    },
    /**
     * 更新优惠券
     * @param coupon
     * @private
     */
    _updateCoupon(coupon) {
      this.spinning = true
      updateCoupon(JSON.stringify(coupon)).then((res) => {
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
