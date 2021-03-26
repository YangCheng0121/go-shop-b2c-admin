<template>
  <box class="padding-10px">
    <div slot="content">
      <a-spin :spinning="spinning">
        <a-form
          v-bind="formLayout"
          :form="form">
          <a-form-item label="名称">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '请输入名称!' }] },
                ]"
                placeholder="请输入名称"/>
            </a-col>
          </a-form-item>
          <a-form-item label="联系人">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="[
                  'contact',
                  { rules: [{ required: true, message: '请输入联系人!' }] },
                ]"
                placeholder="请输入联系人"/>
            </a-col>
          </a-form-item>
          <a-form-item label="地区" required>
            <select-area v-model="selectArea" ref="SelectArea"/>
          </a-form-item>
          <a-form-item label="地址">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入地址!' }] },
                ]"
                placeholder="请输入地址"/>
            </a-col>
          </a-form-item>
          <a-form-item label="邮编">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="['zip_code']"
                placeholder="请输入邮编"/>
            </a-col>
          </a-form-item>
          <a-form-item label="电话">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="['mobile']"
                placeholder="请输入电话"/>
            </a-col>
          </a-form-item>
          <a-form-item label="手机">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="['phone']"
                placeholder="请输入手机"/>
            </a-col>
          </a-form-item>
          <a-form-item label="是否默认">
            <a-col v-bind="formItemLayout">
              <a-checkbox-group v-decorator="['is_default']">
                <a-checkbox :value="1"/>
              </a-checkbox-group>
            </a-col>
          </a-form-item>
          <a-form-item label="备注">
            <a-col v-bind="formItemLayout">
              <a-input
                v-decorator="['memo']"
                placeholder="请输入备注"/>
            </a-col>
          </a-form-item>
          <a-form-item label=" " :colon="false">
            <a-col v-bind="formItemLayout">
              <confirm-back @confirm="handleSubmit"/>
            </a-col>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </box>
</template>

<script type="es6">
import { Box, ConfirmBack, SelectArea } from '@/components'
import { addDeliveryCenter } from '@/api/delivery_center'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack,
    SelectArea
  },
  name: 'DeliveryCenterAdd',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'DeliveryCenterAdd' }),
      spinning: false,
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
      selectArea: null
    }
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$refs.SelectArea.handleSubmit().then(({ province, city, area }) => {
            const name = values.name
            const contact = values.contact
            const mobile = values.mobile
            const phone = values.phone
            const zipCode = values.zip_code
            const address = values.address
            const isDefault = values.is_default ? Number(values.is_default[0]) : null
            const memo = values.memo
            const areaId = area ? area.id : city.id
            const areaName = area ? area.full_name : city.full_name

            this._addDeliveryCenter({
              name,
              contact,
              mobile,
              phone,
              areaId,
              areaName,
              zipCode,
              address,
              isDefault,
              memo
            })
          })
        }
      })
    },
    _addDeliveryCenter({ name, contact, mobile, phone, areaId, areaName, zipCode, address, isDefault, memo }) {
      const deliveryCorp = {
        name: name,
        contact: contact,
        mobile: mobile,
        phone: phone,
        area_id: areaId,
        area_name: areaName,
        zip_code: zipCode,
        address: address,
        is_default: isDefault,
        memo: memo
      }
      this.spinning = true
      addDeliveryCenter(JSON.stringify(deliveryCorp)).then((res) => {
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
