<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        :form="form"
        v-bind="formLayout"
        slot="content">
        <a-form-item label="名称">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入名称!' }] },
            ]"
            placeholder="请输入名称"/>
        </a-form-item>
        <a-form-item label="默认物流公司">
          <a-select
            v-decorator="[
              'default_delivery_corp_id',
              { rules: [{ required: true, message: '请选择默认物流公司!' }] },
            ]">
            <a-select-option v-for="delivery in deliveryCorps" :key="delivery.id" :value="delivery.id">
              {{ delivery.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="首重量">
          <a-input
            v-decorator="[
              'first_weight',
              { rules: [{ required: true, message: '请输入首重量!' }] },
            ]"
            placeholder="请输入首重量"
            type="number"/>
        </a-form-item>
        <a-form-item label="续重量">
          <a-input
            v-decorator="[
              'continue_weight',
              { rules: [{ required: true, message: '请输入续重量!' }] },
            ]"
            placeholder="请输入续重量"
            type="number"/>
        </a-form-item>
        <a-form-item label="默认首重价格">
          <a-input
            v-decorator="[
              'first_price',
              { rules: [{ required: true, message: '请输入默认首重价格!' }] },
            ]"
            placeholder="请输入默认首重价格"
            type="number"/>
        </a-form-item>
        <a-form-item label="默认续重价格">
          <a-input
            v-decorator="[
              'continue_price',
              { rules: [{ required: true, message: '请输入默认续重价格!' }] },
            ]"
            placeholder="请输入默认续重价格"
            type="number"/>
        </a-form-item>
        <a-form-item label="图标">
          <div class="icon">
            <a-input
              v-decorator="['icon']"
              placeholder="请上传icon"/>
            <div class="icon-right">
              <upload-button @upload="_uploadImage"/>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="支持支付方式">
          <a-checkbox-group v-decorator="['payment_shipping_methods']">
            <a-checkbox v-for="method in paymentMethods.list" :key="method.id" :value="method.id">
              {{ method.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="介绍">
          <a-input v-decorator="['description']"/>
        </a-form-item>
        <a-form-item label="排序">
          <a-input v-decorator="['orders']" type="number" :min="0"/>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack, UploadButton } from '@/components'
import { mapGetters } from 'vuex'
import { getShippingMethod, updateShippingMethod } from '@/api/shipping_method'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack,
    UploadButton
  },
  name: 'ShippingEdit',
  computed: {
    ...mapGetters([
      'deliveryCorps',
      'paymentMethods'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ShippingEdit' }),
      formLayout: {
        labelCol: {
          span: 3,
          sm: 6,
          md: 6,
          xl: 3
        },
        wrapperCol: {
          span: 6,
          sm: 10,
          md: 10,
          xl: 6
        }
      },
      spinning: false,
      shippingMethod: null
    }
  },
  mounted() {
    this.$store.dispatch('GetAllDeliveryCorp').then(() => {
      this.$store.dispatch('GetAllPaymentMethod').then(() => {
        this._getShippingMethod()
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
     * 获取配送方式信息
     * @private
     */
    _getShippingMethod() {
      const id = this.$route.params.id
      getShippingMethod(id).then((res) => {
        if (res.err_code === ERR_OK) {
          const data = res.data
          this.shippingMethod = data
          this.$nextTick(() => {
            this.setFormFieldsValue({
              name: data.name,
              default_delivery_corp_id: data.default_delivery_corp_id,
              first_weight: data.first_weight,
              continue_weight: data.continue_weight,
              first_price: data.first_price,
              continue_price: data.continue_price,
              icon: data.icon,
              payment_shipping_methods: data.payment_shipping_methods,
              description: data.description,
              orders: data.orders
            })
          })
        }
      })
    },
    /**
     * 上传 icon
     * @param fileList
     * @private
     */
    _uploadImage(fileList) {
      this.setFormFieldsValue({
        icon: fileList[0].source
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      this.spinning = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const shippingMethod = values
          shippingMethod.id = this.shippingMethod.id
          shippingMethod.orders = Number(shippingMethod.orders)
          updateShippingMethod(JSON.stringify(shippingMethod)).then((res) => {
            this.spinning = false
            if (res.err_code === ERR_OK) {
              this.$router.back()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.icon {
  position: relative;

  .icon-right {
    position: absolute;
    right: -130px;
    bottom: 0;
  }
}
</style>
