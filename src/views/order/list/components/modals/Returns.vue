<template>
  <a-modal
    title="退货"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
    :width="1000">
    <a-spin :spinning="spinning">
      <a-form
        v-if="shipping"
        v-bind="formLayout"
        :form="form">
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="编号">
              <span>{{ shipping.sn }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="创建日期">
              <span>{{ shipping.creation_date | Moment }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="配送方式">
              <span>{{ shipping.shipping_method }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="物流公司">
              <span>{{ shipping.delivery_corp }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="运单号">
              <span>{{ shipping.tracking_no }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="物流费用">
              <span>{{ shipping.freight | Amount }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="发货人">
              <span>{{ shipping.create_by }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="电话">
              <span>{{ shipping.phone }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地区">
              <span>{{ shipping.area }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地址">
              <span>{{ shipping.address }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="邮编">
              <span>{{ shipping.zip_code }}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="订单">
              <span>{{ shipping.order_sn }}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="备注">
              <a-input
                v-decorator="['memo']"
                placeholder="请输入备注"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :data-source="shippingItems"
        :pagination="false"
        row-key="id">
        <span slot="returns_quantity" slot-scope="returns_quantity,record">
          <a-input
            type="number"
            :min="0"
            :value="returns_quantity"
            @change="e => handleChange(e.target.value, record.id, 'returns_quantity')"/>
        </span>
      </a-table>
    </a-spin>
  </a-modal>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
import { getOrderItems, returnsOrder } from '@/api/order'
import { ERR_OK } from '@/api/config'
import { getShippingByOrder } from '@/api/shipping'

const columns = [
  {
    title: '编号',
    dataIndex: 'sn'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '数量',
    dataIndex: 'quantity'
  },
  {
    title: '已发货数',
    dataIndex: 'shipped_quantity'
  },
  {
    title: '已退货数',
    dataIndex: 'return_quantity'
  },
  {
    title: '退货数',
    dataIndex: 'returns_quantity',
    scopedSlots: { customRender: 'returns_quantity' }
  }
]

export default {
  name: 'Returns',
  computed: {
    ...mapGetters([
      'order',
      'orderTypes'
    ])
  },
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this, { name: 'Returns' }),
      formLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      },
      formItemLayout: {
        span: 12
      },
      columns,
      shipping: null,
      shippingItems: [],
      spinning: false
    }
  },
  created() {
    this._getShippingByOrder()
    this._getOrderItems()
  },
  methods: {
    /**
     * 显示 Modal
     */
    showModal() {
      this.visible = true
    },
    /**
     * 隐藏 Modal
     */
    hideModal() {
      this.visible = false
    },
    /**
     * Modal 确认
     */
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isCanReturns()) {
            const returns = Object.assign({}, this.shipping, {
              id: '',
              memo: values.memo
            })

            const returnsItems = []
            this.shippingItems.forEach((item) => {
              returnsItems.push({
                name: item.name,
                sn: item.sn,
                quantity: Number(item.returns_quantity)
              })
            })
            this._returnsOrder(JSON.stringify(returns), JSON.stringify(returnsItems))
          }
        }
      })
    },
    /**
     * 发货数不能大于 购买数 - 已发货数
     */
    isCanReturns() {
      let bol = true
      this.shippingItems.forEach((item) => {
        const quantity = item.shipped_quantity - item.return_quantity
        if (quantity < Number(item.returns_quantity)) {
          bol = false
          this.$message.error('退货数不能大于 已发货数 - 已退货数')
        }
      })
      return bol
    },
    /**
     * Modal 确认
     */
    handleCancel() {
      this.hideModal()
    },
    /**
     * 退货数值改变时
     * @param value
     * @param id
     * @param column
     */
    handleChange(value, id, column) {
      const newData = [...this.shippingItems]
      const target = newData.filter(item => id === item.id)[0]
      if (target) {
        target[column] = value
        this.shippingItems = newData
      }
    },
    /**
     * 获取发货单
     * @private
     */
    _getShippingByOrder() {
      const orderId = this.order.id
      this.spinning = true
      getShippingByOrder(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          this.shipping = res.data
        }
      })
    },
    /**
     * 获取订单项
     * @private
     */
    _getOrderItems() {
      const orderId = this.order.id
      getOrderItems(orderId).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          data.forEach((item) => {
            item.returns_quantity = item.quantity - item.shipped_quantity
          })
          this.shippingItems = data
          this.spinning = false
        }
      })
    },
    /**
     * 退货
     * @param returns
     * @param returnsItems
     * @private
     */
    _returnsOrder(returns, returnsItems) {
      returnsOrder(returns, returnsItems).then((res) => {
        if (res.err_code === ERR_OK) {
          this.hideModal()
          this.$emit('returns')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
