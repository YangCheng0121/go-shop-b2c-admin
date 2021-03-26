<template>
  <a-spin :spinning="spinning">
    <div v-if="order">
      <div class="buttons-wrap">
        <a-button
          v-for="(button,index) in buttons"
          :key="index"
          :disabled="button.disable"
          @click="button.fn"
          class="button">
          {{ button.title }}
        </a-button>
      </div>
      <a-form
        v-bind="formLayout"
        :form="form">
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="编号">
              <span>{{ order.sn }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="创建日期">
              <span>{{ order.creation_date | Moment }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="类型">
              <span>{{ orderTypes[order.type_name] }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="状态">
              {{ order.status_name }}
              <span class="silver" v-if="order.expire">(过期时间: {{ order.expire | Moment }})</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="会员">
              <span>{{ order.member }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="会员等级">
              {{ order.member_rank }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="价格:">
              <span>{{ order.price | Amount }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="兑换积分">
              {{ order.exchange_point }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="订单金额">
              <span>{{ order.amount | Amount }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="已付金额">
              {{ order.amount_paid | Amount }}
              <span class="silver">
                (应付金额: {{ (order.amount - order.amount_paid) | Amount }})
              </span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="重量">
              <span>{{ order.weight }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="数量">
              {{ order.quantity }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="参与促销">
              {{ order.promotion_name ? order.promotion_name : '-' }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="促销折扣">
              {{ order.promotion_discount | Amount }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="使用优惠券">
              {{ order.coupon_name }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="优惠券折扣">
              {{ order.coupon_discount | Amount }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="支付手续费">
              {{ order.fee | Amount }}
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="运费">
              <span>{{ order.freight | Amount }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="调整金额">
              <span>{{ order.offset_amount | Amount }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="赠送积分">
              <span>{{ order.reward_point }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="支付方式">
              <span>{{ order.payment_method_name }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="配送方式">
              <span>{{ order.shipping_method_name }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收货人">
              <span>{{ order.consignee }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地区:">
              <span>{{ order.area_name }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地址">
              <span>{{ order.address }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="邮政">
              <span>{{ order.zip_code }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="电话">
              <span>{{ order.phone }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="附言">
              <span>{{ order.memo }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="抬头">
              <span>{{ order.invoice_title }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="税金">
              <span>{{ order.tax }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="税号">
              <span>{{ order.invoice_content }}</span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--Modal-->
    <receive-payment
      v-if="order"
      ref="ReceivePayment"
      @receivePayment="_getOrder"/>
    <ship v-if="order && order.status === orderStatus.pendingShipment" ref="Ship" @shipped="_getOrder"/>
    <returns v-if="order" ref="Returns" @returns="_getOrder"/>
    <refunds v-if="order" ref="Refunds" @refunds="_getOrder"/>
  </a-spin>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
import { completeOrder, failOrder, reviewOrder } from '@/api/order'
import { ERR_OK } from '@/api/config'
import ReceivePayment from './modals/ReceivePayment'
import Ship from './modals/Ship'
import Returns from './modals/Returns'
import Refunds from './modals/Refunds'

export default {
  components: {
    ReceivePayment,
    Ship,
    Returns,
    Refunds
  },
  name: 'OrderInfo',
  computed: {
    ...mapGetters([
      'order',
      'orderTypes',
      'orderStatus'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'OrderInfo' }),
      formLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 10, md: 18, lg: 18, xl: 10 }
      },
      formItemLayout: {
        span: 12
      },
      spinning: false,
      buttons: [
        {
          title: '审核',
          key: 'pendingReview',
          disable: true,
          fn: () => {
            this._reviewOrder(true)
          }
        },
        {
          title: '拒绝',
          key: 'pendingReview',
          disable: false,
          fn: () => {
            this._reviewOrder(false)
          }
        },
        {
          title: '收款',
          key: '',
          disable: false,
          fn: () => {
            this.showReceivePaymentModal()
          }
        },
        {
          title: '发货',
          key: 'pendingShipment',
          disable: true,
          fn: () => {
            this.showShipModal()
          }
        },
        {
          title: '退款',
          key: 'refunds',
          disable: true,
          fn: () => {
            this.showRefundsModal()
          }
        },
        {
          title: '退货',
          key: 'returns',
          disable: true,
          fn: () => {
            this.showReturnsModal()
          }
        },
        {
          title: '完成',
          key: 'shipped',
          disable: true,
          fn: () => {
            this._completeOrder()
          }
        },
        {
          title: '失败',
          key: 'fail',
          disable: true,
          fn: () => {
            this._failOrder()
          }
        }
      ]
    }
  },
  mounted() {
    this._getOrder()
  },
  methods: {
    /**
     * 获取订单
     * @private
     */
    _getOrder() {
      this.spinning = true
      const sn = this.$route.params.sn
      this.$store.dispatch('GetOrder', sn).then(() => {
        this.$nextTick(() => {
          this.spinning = false
          this.setButtons()
          this.$store.dispatch('GetAllPaymentMethod')
        })
      })
    },
    /**
     * 设置订单的按钮组
     */
    setButtons() {
      switch (this.order.status) {
        case this.orderStatus.pendingReview :
          this.setButton(['pendingReview', 'refunds'])
          break
        case this.orderStatus.pendingShipment:
          this.setButton(['pendingShipment', 'refunds'])
          break
        case this.orderStatus.shipped:
          this.setButton(['returns', 'refunds'])
          break
        case this.orderStatus.refunding:
          this.setButton(['refunding'])
          break
        case this.orderStatus.failed:
          this.setButton(['returns', 'refunds'])
          break
        case this.orderStatus.completed:
          this.setButton(['returns', 'refunds'])
          break
      }
    },
    setButton(keys) {
      /**
       * 重置 buttons
       */
      this.buttons.forEach((item) => {
        if (item.key) {
          item.disable = true
        }
      })

      keys.forEach((key) => {
        this.buttons.forEach((item) => {
          if (item.key === key) {
            item.disable = false
          }
        })
      })
    },
    /**
     * 审核订单
     * @private
     */
    _reviewOrder(review) {
      const text = review ? '通过' : '拒绝'
      this.$confirm({
        title: '提示',
        content: `订单是否${text}审核?`,
        okText: '确定',

        onOk: () => {
          const orderId = this.order.id
          const isReview = review ? 1 : 0
          reviewOrder({ isReview, orderId }).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getOrder()
            }
          })
        }
      })
    },
    /**
     * 显示收款表单
     */
    showReceivePaymentModal() {
      this.$refs.ReceivePayment.showModal()
    },
    /**
     * 显示发货表单
     */
    showShipModal() {
      this.$refs.Ship.showModal()
    },
    /**
     * 显示退货单
     */
    showReturnsModal() {
      this.$refs.Returns.showModal()
    },
    /**
     * 显示退款单
     */
    showRefundsModal() {
      this.$refs.Refunds.showModal()
    },
    /**
     * 失败订单
     * @private
     */
    _failOrder() {
      this.$confirm({
        title: '提示',
        content: `订单是否失败?`,
        okText: '确定',

        onOk: () => {
          const orderId = this.order.id
          failOrder(orderId).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getOrder()
            }
          })
        }
      })
    },
    /**
     * 完成订单
     * @private
     */
    _completeOrder() {
      this.$confirm({
        title: '提示',
        content: `订单是否完成?`,
        okText: '确定',

        onOk: () => {
          const orderId = this.order.id
          completeOrder(orderId).then((res) => {
            if (res.err_code === ERR_OK) {
              this._getOrder()
            } else {
              this.$message.error(res.data)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

.buttons-wrap {
  margin-bottom: 16px;

  .button {
    margin: 0 5px;
  }
}

.look-up {
  position: absolute;
  right: -20px;
}

.select-option {
  width: 120px;
}
</style>
