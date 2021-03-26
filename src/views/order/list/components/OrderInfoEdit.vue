<template>
  <a-spin :spinning="spinning">
    <a-form
      v-bind="formLayout"
      v-if="order"
      :form="form">
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="编号">
            <span>{{ order.sn }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="创建日期">
            <span>{{ order.creation_date | Moment }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="类型">
            <span>{{ orderTypes[order.type_name] }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="状态">
            {{ order.status_name }}
            <span class="silver" v-if="order.expire">(过期时间: {{ order.expire | Moment }})</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="会员">
            <span>{{ order.member }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="会员等级">
            {{ order.member_rank }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="价格">
            <span>{{ order.price | Amount }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="兑换积分">
            {{ order.exchange_point }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="订单金额">
            <span>{{ order.amount | Amount }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="已付金额">
            {{ order.amount_paid | Amount }}
            <span class="silver">
              (应付金额: {{ (order.amount - order.amount_paid) | Amount }})
            </span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="重量">
            <span>{{ order.weight }}</span>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="数量">
            {{ order.quantity }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="参与促销">
            {{ order.promotion_name | Empty }}
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="促销折扣">
            ￥{{ order.promotion_discount | Amount }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="使用优惠券">
            {{ order.coupon_name | Empty }}
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="优惠券折扣">
            ￥{{ order.coupon_discount | Amount }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="支付手续费">
            {{ order.fee | Amount }}
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="运费">
            <a-input v-decorator="['freight']" type="number"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="调整金额">
            <a-input v-decorator="['offset_amount']" type="number"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="赠送积分">
            <a-input v-decorator="['reward_point']" type="number"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="支付方式">
            <a-select v-decorator="['payment_method_id']">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="method in paymentMethods" :key="method.id" :value="method.id">
                {{ method.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="配送方式">
            <a-select v-decorator="['shipping_method_id']">
              <a-select-option value="">
                请选择...
              </a-select-option>
              <a-select-option v-for="delivery in deliveryCorps" :key="delivery.id" :value="delivery.id">
                {{ delivery.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="收货人">
            <a-input v-decorator="['consignee']"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="地区">
            <select-area v-model="selectArea" ref="SelectArea"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="地址">
            <a-input v-decorator="['address']"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="邮政">
            <a-input v-decorator="['zip_code']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="电话">
            <a-input v-decorator="['phone']" type="number"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="附言">
            <a-input v-decorator="['memo']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="抬头">
            <a-input v-decorator="['invoice_title']" :disabled="!isLookUp"/>
            <a-checkbox class="look-up" v-model="isLookUp"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout">
          <a-form-item label="税金">
            <a-input v-decorator="['tax']" :disabled="!isLookUp"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout">
          <a-form-item label="税号">
            <a-input v-decorator="['invoice_content']" :disabled="!isLookUp"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script type="es6">
import { SelectArea } from '@/components'
import { mapGetters } from 'vuex'

export default {
  components: {
    SelectArea
  },
  name: 'OrderInfo',
  computed: {
    ...mapGetters([
      'orderTypes',
      'paymentMethods',
      'deliveryCorps'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'OrderInfo' }),
      formLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 10, md: 18, lg: 18, xl: 10 }
      },
      colLayout: {
        span: 12
      },
      spinning: false,
      order: null,
      // 是否抬头
      isLookUp: false,
      selectArea: null
    }
  },
  mounted() {
    this._getOrder().then(() => {
      this.$nextTick(() => {
        this.setFormFieldsValue({
          freight: this.order.freight,
          offset_amount: this.order.offset_amount,
          reward_point: this.order.reward_point,
          payment_method_id: this.order.payment_method_id,
          shipping_method_id: this.order.shipping_method_id,
          consignee: this.order.consignee,
          address: this.order.address,
          zip_code: this.order.zip_code,
          phone: this.order.phone,
          memo: this.order.memo,
          invoice_title: this.order.invoice_title,
          invoice_content: this.order.invoice_content,
          tax: this.order.tax ? this.order.tax : null
        })
        // 是否抬头
        if (this.order.invoice_title) {
          this.isLookUp = true
        }
      })
    })
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 获取订单
     * @private
     */
    async _getOrder() {
      const sn = this.$route.params.sn
      this.spinning = true

      await this.$store.dispatch('GetAllPaymentMethod')
      await this.$store.dispatch('GetAllDeliveryCorp')

      await this.$store.dispatch('GetOrder', sn).then((data) => {
        this.order = data
        this.selectArea = data.area_id
        this.spinning = false
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((_, orderValues) => {
          this.$refs.SelectArea.handleSubmit().then(({ province, city, area }) => {
            resolve({
              address: orderValues.address,
              consignee: orderValues.consignee,
              freight: parseFloat(orderValues.freight),
              invoice_content: orderValues.invoice_content,
              invoice_title: orderValues.invoice_title,
              memo: orderValues.memo,
              offset_amount: parseFloat(orderValues.offset_amount),
              area_id: area ? area.id : city.id,
              area_name: area ? area.full_name : city.full_name,
              payment_method_id: orderValues.payment_method_id,
              phone: orderValues.phone,
              reward_point: parseFloat(orderValues.reward_point),
              shipping_method_id: orderValues.shipping_method_id,
              tax: parseFloat(orderValues.tax),
              zip_code: orderValues.zip_code,
              id: this.order.id
            })
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.look-up {
  position: absolute;
  right: -20px;
}
</style>
