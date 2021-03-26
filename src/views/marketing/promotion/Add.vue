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
import Basic from './components/Add/Basic'
import Introduction from './components/Add/Introduction'
import { addPromotion } from '@/api/promotion'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    Basic,
    Introduction,
    ConfirmBack
  },
  name: 'PromotionAdd',
  data() {
    return {
      colLayout: {
        span: 3
      },
      promotion: {},
      isSelect: true,
      spinning: false
    }
  },
  created() {
    this.$store.dispatch('GetAllMemberRank')
    this.$store.dispatch('GetAllCoupon')
    this.$store.dispatch('GetAllGifts')
  },
  methods: {
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const introductionParam = await this.$refs.Introduction.handleSubmit()

      const promotion = Object.assign({}, basicParam, introductionParam)
      this._addPromotion(promotion)
    },
    /**
     * 添加促销
     * @param promotion
     * @private
     */
    _addPromotion(promotion) {
      this.spinning = true
      addPromotion(JSON.stringify(promotion)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.spinning = false
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
