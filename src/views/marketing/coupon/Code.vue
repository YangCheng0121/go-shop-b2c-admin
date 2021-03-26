<template>
  <box class="padding-10px">
    <a-form slot="content" v-bind="formLayout" :form="form">
      <a-form-item label="名称">
        <a-col v-bind="formItemLayout">
          <span>{{ coupon.name }}</span>
        </a-col>
      </a-form-item>
      <a-form-item label="使用起始日期">
        <a-col v-bind="formItemLayout">
          <span v-if="coupon.begin_date">{{ coupon.begin_date | Moment }}</span>
          <span v-else>-</span>
        </a-col>
      </a-form-item>
      <a-form-item label="使用结束日期">
        <a-col v-bind="formItemLayout">
          <span v-if="coupon.end_date">{{ coupon.end_date | Moment }}</span>
          <span v-else>-</span>
        </a-col>
      </a-form-item>
      <a-form-item label="已生成数量">
        <a-col v-bind="formItemLayout">
          <span>{{ totalCoupon }}</span>
        </a-col>
      </a-form-item>
      <a-form-item label="已使用数量">
        <a-col v-bind="formItemLayout">
          <span>{{ usedCoupon }}</span>
        </a-col>
      </a-form-item>
      <a-form-item label="数量">
        <a-col v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'quantity',
              { rules: [{ required: true, message: '请输入数量!' }] },
            ]"
            type="number"
            :min="0"
            placeholder="请输入数量"/>
        </a-col>
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-col v-bind="formItemLayout">
          <confirm-back @confirm="handleSubmit"/>
        </a-col>
      </a-form-item>
    </a-form>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import { mapGetters } from 'vuex'
import { getCouponCodeCount, generateCouponCode } from '@/api/coupon'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack
  },
  name: 'CouponCode',
  computed: {
    ...mapGetters([
      'coupon'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'CouponCode' }),
      formLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      },
      formItemLayout: {
        span: 14,
        md: 24,
        lg: 24,
        xl: 14
      },
      totalCoupon: 0,
      usedCoupon: 0
    }
  },
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('GetCoupon', id).then(() => {
      let query = {
        CouponId: id
      }
      this._getCouponCodeCount(query).then((data) => {
        this.totalCoupon = data
      })
      query = {
        CouponId: id,
        IsUsed: 1
      }
      this._getCouponCodeCount(query).then((data) => {
        this.usedCoupon = data
      })
    })
  },
  methods: {
    /**
     * 获取优惠码数量
     * @param query
     * @returns {Promise<unknown>}
     * @private
     */
    _getCouponCodeCount(query) {
      return new Promise(resolve => {
        getCouponCodeCount(query).then((res) => {
          if (res.err_code === ERR_OK) {
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const coupon = {
            id: this.coupon.id,
            prefix: this.coupon.prefix
          }
          const quantity = values.quantity
          this._generateCouponCode(coupon, quantity)
        }
      })
    },
    /**
     * 生成优惠码
     * @param coupon
     * @param quantity
     * @private
     */
    _generateCouponCode(coupon, quantity) {
      generateCouponCode(JSON.stringify(coupon), quantity).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
