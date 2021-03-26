<template>
  <box class="padding-10px">
    <div slot="content">
      <a-spin :spinning="spinning">
        <a-tabs type="card">
          <a-tab-pane key="Basic" tab="基本信息">
            <basic ref="Basic" forceRender/>
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
import { updatePromotion } from '@/api/promotion'
import { ERR_OK } from '@/api/config'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Box,
    Basic,
    Introduction,
    ConfirmBack
  },
  name: 'PromotionEdit',
  computed: {
    ...mapGetters([
      'productPageList'
    ])
  },
  data() {
    return {
      colLayout: {
        span: 3
      },
      spinning: false
    }
  },
  created() {
    this.spinning = true
    this.$store.dispatch('GetAllMemberRank').then(() => {
      this.$store.dispatch('GetAllCoupon').then(() => {
        this.$store.dispatch('GetAllGifts').then(() => {
          this._getPromotion()
        })
      })
    })
  },
  methods: {
    /**
     * 提交表单
     */
    async handleSubmit() {
      const basicParam = await this.$refs.Basic.handleSubmit()
      const introductionParam = await this.$refs.Introduction.handleSubmit()

      const promotion = Object.assign({}, basicParam, introductionParam)
      this._updatePromotion(promotion)
    },
    /**
     * 获取促销
     * @private
     */
    _getPromotion() {
      const id = this.$route.params.id
      this.$store.dispatch('GetPromotion', id).then((data) => {
        const setting = []
        if (data['is_coupon_allowed']) {
          setting.push('is_coupon_allowed')
        }
        if (data['is_free_shipping']) {
          setting.push('is_free_shipping')
        }

        let gifts = []
        if (data.gifts) {
          gifts = data.gifts.map((item) => {
            return item.id
          })
        }

        this.$nextTick(() => {
          this.$refs.Basic.setFormFieldsValue({
            name: data.name,
            title: data.title,
            begin_date: data.begin_date ? moment(data.begin_date, 'YYYY-MM-DD HH:mm:ss') : null,
            end_date: data.end_date ? moment(data.end_date, 'YYYY-MM-DD HH:mm:ss') : null,
            maximum_price: data.maximum_price,
            maximum_quantity: data.maximum_quantity,
            minimum_price: data.minimum_price,
            minimum_quantity: data.minimum_quantity,
            price_expression: data.price_expression,
            point_expression: data.point_expression,
            orders: data.orders,
            member_ranks: data.member_ranks,
            coupons: data.coupons,
            setting: setting,
            gifts: gifts
          })
          this.$refs.Introduction.setFormFieldsValue({
            introduction: data.introduction
          })
          this.spinning = false
        })
      })
    },
    /**
     * 更新促销
     * @param promotion
     * @private
     */
    _updatePromotion(promotion) {
      this.spinning = true
      updatePromotion(JSON.stringify(promotion)).then((res) => {
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
