<template>
  <a-modal
    title="发货"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
    :width="1000">
    <a-spin :spinning="spinning">
      <a-form
        :form="form"
        v-bind="formLayout">
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
            <a-form-item label="配送方式">
              <a-select
                v-decorator="[
                  'shipping_method_id',
                  { rules: [{ required: true, message: '请选择配送方式!' }] },
                ]">
                <a-select-option value="">
                  请选择...
                </a-select-option>
                <a-select-option
                  v-for="(item,index) in shippingMethods"
                  :key="index"
                  :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="物流公司">
              <a-select
                v-decorator="[
                  'delivery_corp_id',
                  { rules: [{ required: true, message: '请选择物流公司!' }] },
                ]">
                <a-select-option value="">
                  请选择...
                </a-select-option>
                <a-select-option
                  v-for="(item,index) in deliveryCorps"
                  :key="index"
                  :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="运单号">
              <a-input v-decorator="['tracking_no']" placeholder="请输入运单号"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="物流费用">
              <a-input v-decorator="['freight']" placeholder="请输入物流费用" type="number" :min="0"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="收货人">
              <a-input
                v-decorator="[
                  'consignee',
                  { rules: [{ required: true, message: '请输入收货人!' }] },
                ]"
                placeholder="请输入收货人"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="邮编">
              <a-input
                v-decorator="[
                  'zip_code',
                ]"
                placeholder="请输入邮编"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地区">
              <a-form
                layout="inline"
                :form="areaForm">
                <a-form-item>
                  <a-select v-model="province" style="min-width: 120px" @change="handleProvince">
                    <a-select-option v-for="(item, index) in provinceList" :key="index" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item>
                  <a-select v-model="city" style="min-width: 120px" @change="handleCity">
                    <a-select-option value="">
                      请选择...
                    </a-select-option>
                    <a-select-option v-for="(item, index) in cityList" :key="index" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item v-if="city">
                  <a-select
                    v-decorator="[
                      'area',
                      { rules: [{ required: true, message: '请选择地区!' }] },
                    ]"
                    style="min-width: 120px"
                    @change="handleArea">
                    <a-select-option value="">
                      请选择...
                    </a-select-option>
                    <a-select-option v-for="(item, index) in areaList" :key="index" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="地址">
              <a-input
                v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入地址!' }] },
                ]"
                placeholder="请输入地址"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="formItemLayout">
            <a-form-item label="电话">
              <a-input
                v-decorator="[
                  'phone',
                  { rules: [{ required: true, message: '请输入收货人!' }] },
                ]"
                type="number"
                :min="0"
                placeholder="请输入收货人"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemLayout">
            <a-form-item label="备注">
              <a-input
                v-decorator="['memo']"
                placeholder="请输入备注"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-table
          :columns="columns"
          :data-source="shippingItems"
          :pagination="false"
          row-key="id">
          <span slot="ship_quantity" slot-scope="ship_quantity,record">
            <a-input
              type="number"
              :min="0"
              :value="ship_quantity"
              @change="e => handleChange(e.target.value, record.id, 'ship_quantity')"/>
          </span>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
import { getOrderItems, ship } from '@/api/order'
import { ERR_OK } from '@/api/config'

const columns = [
  {
    title: '商品编号',
    dataIndex: 'sn'
  },
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '是否需要物流',
    dataIndex: 'is_delivery'
  },
  {
    title: '商品库存',
    dataIndex: 'sku.stock'
  },
  {
    title: '购买数',
    dataIndex: 'quantity'
  },
  {
    title: '已发货数',
    dataIndex: 'shipped_quantity'
  },
  {
    title: '发货数',
    dataIndex: 'ship_quantity',
    scopedSlots: { customRender: 'ship_quantity' }
  }
]

export default {
  name: 'Ship',
  computed: {
    ...mapGetters([
      'order',
      'deliveryCorps',
      'shippingMethods',
      'areas'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'Ship' }),
      areaForm: this.$form.createForm(this, { name: 'Areas' }),
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
      visible: false,
      spinning: false,
      shippingItems: [],
      areaList: [], // 区列表
      cityList: [], // 城市列表
      provinceList: [], // 省列表
      area: null, // 当前区域
      city: null, // 当前城市
      province: null // 当前省份
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setFormFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 设置表单 Filed Value
     */
    setAreaFormFieldsValue(form) {
      this.areaForm.setFieldsValue(form)
    },
    /**
     * 显示 Modal
     */
    showModal() {
      this.visible = true
      this.spinning = true
      this.$store.dispatch('GetAllShippingMethods').then(() => {
        this.$store.dispatch('GetAllDeliveryCorp').then(() => {
          this.$store.dispatch('GetAllArea', {}).then(() => {
            this.setAreas(this.order.area_id)
            this.setCitys(this.order.area_id)
            this.setProvinces(this.order.area_id)
            this.$nextTick(() => {
              this.setFormFieldsValue({
                shipping_method_id: this.order.shipping_method_id || '',
                delivery_corp_id: this.order.delivery_corp_id || '',
                consignee: this.order.consignee,
                zip_code: this.order.zip_code,
                address: this.order.address,
                phone: this.order.phone,
                memo: this.order.memo
              })
              this.setAreaFormFieldsValue({
                area: this.order.area_id
              })
              this.spinning = false
            })
          })
        })
      })
      this._getOrderItems()
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
          this.areaForm.validateFields((err, areaValues) => {
            if (!err) {
              if (this.isCanShip()) {
                const orderId = this.order.id
                const shippingMethodId = values.shipping_method_id
                const deliveryCorpId = values.delivery_corp_id
                const trackingNo = values.tracking_no
                const freight = values.freight
                const consignee = values.consignee
                const area = this.areas.find((item) => {
                  return item.id === areaValues.area
                })
                const address = values.address
                const zipCode = values.zip_code
                const phone = values.phone
                const memo = values.memo
                const shippingItems = this.shippingItems.map((item) => {
                  return {
                    sn: item.sn,
                    name: item.name,
                    quantity: item.ship_quantity
                  }
                })
                this._ship({
                  orderId,
                  shippingMethodId,
                  deliveryCorpId,
                  trackingNo,
                  freight,
                  consignee,
                  area: area.full_name,
                  address,
                  zipCode,
                  phone,
                  memo,
                  shippingItems
                })
              }
            }
          })
        }
      })
    },
    /**
     * 发货数不能大于 购买数 - 已发货数
     */
    isCanShip() {
      let bol = true
      this.shippingItems.forEach((item) => {
        const quantity = item.quantity - item.shipped_quantity
        if (item.ship_quantity > quantity) {
          bol = false
          this.$message.error('发货数不能大于 购买数 - 已发货数')
        }
      })
      return bol
    },
    /**
     * Modal 取消
     */
    handleCancel() {
      this.hideModal()
    },
    /**
     * 发货数值改变时
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
     * 设置 区列表
     */
    setAreas(areaId) {
      const area = this.areas.find((item) => {
        return item.id === areaId
      })
      const parentId = area.parent_id
      this.areaList = this.areas.filter((item) => {
        return item.parent_id === parentId
      })
    },
    /**
     * 设置 城市列表
     */
    setCitys(areaId) {
      const area = this.areas.find((item) => {
        return item.id === areaId
      })
      const parentId = area.parent_id
      const city = this.areas.find((item) => {
        return item.id === parentId
      })
      this.cityList = this.areas.filter((item) => {
        return item.parent_id === city.parent_id
      })
      this.city = city.id
    },
    /**
     * 设置 省份列表
     */
    setProvinces(areaId) {
      const area = this.areas.find((item) => {
        return item.id === areaId
      })
      const parentId = area.parent_id
      const city = this.areas.find((item) => {
        return item.id === parentId
      })
      const province = this.areas.find((item) => {
        return item.id === city.parent_id
      })
      this.provinceList = this.areas.filter((item) => {
        return item.parent_id === province.parent_id
      })
      this.province = province.id
    },
    /**
     * 省份值改变时处理
     */
    handleProvince(value) {
      const cityList = this.areas.filter((item) => {
        return item.parent_id === value
      })
      this.city = ''
      this.cityList = cityList
    },
    /**
     * 城市值改变时处理
     */
    handleCity(value) {
      this.areaList = this.areas.filter((item) => {
        return item.parent_id === value
      })
      this.$nextTick(() => {
        this.setAreaFormFieldsValue({
          area: ''
        })
      })
    },
    /**
     * 区域值改变时处理
     */
    handleArea(value) {
      this.setAreaFormFieldsValue({
        area: value
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
            item.ship_quantity = item.quantity - item.shipped_quantity
          })
          this.shippingItems = data
        }
      })
    },
    /**
     * 发货
     * @param orderId
     * @param shippingMethodId
     * @param deliveryCorpId
     * @param trackingNo
     * @param freight
     * @param consignee
     * @param area
     * @param address
     * @param zipCode
     * @param phone
     * @param memo
     * @param shippingItems
     * @private
     */
    _ship({
            orderId,
            shippingMethodId,
            deliveryCorpId,
            trackingNo,
            freight,
            consignee,
            area,
            address,
            zipCode,
            phone,
            memo,
            shippingItems
          }) {
      this.spinning = true
      ship({
        orderId,
        shippingMethodId,
        deliveryCorpId,
        trackingNo,
        freight,
        consignee,
        area,
        address,
        zipCode,
        phone,
        memo,
        shippingItems: JSON.stringify(shippingItems)
      }).then((res) => {
        this.spinning = false
        if (res.err_code === ERR_OK) {
          this.$emit('shipped')
          this.hideModal()
        } else {
          this.$message.error(res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
