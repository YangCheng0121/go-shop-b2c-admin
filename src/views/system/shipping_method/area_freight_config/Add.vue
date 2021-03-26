<template>
  <a-spin :spinning="spinning">
    <box class="padding-10px">
      <a-form
        v-bind="formLayout"
        :form="form"
        slot="content">
        <a-form-item label="配送方式" v-if="currentShippingMethod">
          {{ currentShippingMethod.name }}
        </a-form-item>
        <a-form-item label="地区" required>
          <a-form
            layout="inline"
            :form="areaForm">
            <a-form-item>
              <a-select
                v-decorator="[
                  'province_id',
                  { rules: [{ required: true, message: '请选择省份!' }] },
                ]"
                style="width: 120px"
                @change="handleProvinceChange">
                <a-select-option value="">
                  请选择...
                </a-select-option>
                <a-select-option
                  v-for="(province,index) in provinceList"
                  :value="province.id"
                  :key="index">
                  {{ province.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-select
                style="width: 120px"
                v-decorator="[
                  'area_id',
                  { rules: [{ required: true, message: '请选择城市!' }] },
                ]">
                <a-select-option v-for="(city,index) in cityList" :value="city.id" :key="index">
                  {{ city.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-form-item>
        <a-form-item label="首重价格">
          <a-input
            v-decorator="[
              'first_price',
              { rules: [{ required: true, message: '请输入首重价格!' }] },
            ]"
            placeholder="请输入首重价格"
            type="number"/>
        </a-form-item>
        <a-form-item label="续重价格">
          <a-input
            v-decorator="[
              'continue_price',
              { rules: [{ required: true, message: '请输入续重价格!' }] },
            ]"
            placeholder="请输入续重价格"
            type="number"/>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <confirm-back @confirm="handleSubmit"/>
        </a-form-item>
      </a-form>
    </box>
  </a-spin>
</template>

<script type="es6">
import { Box, ConfirmBack } from '@/components'
import { areaMixin } from '@/mixins'
import { mapGetters } from 'vuex'
import { addAreaFreightConfig } from '@/api/area_freight_config'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Box,
    ConfirmBack
  },
  mixins: [areaMixin],
  name: 'AreaFreightConfigAdd',
  computed: {
    ...mapGetters([
      'currentShippingMethod'
    ])
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'ShippingConfigurationAdd' }),
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
      spinning: false
    }
  },
  mounted() {
    if (!this.currentShippingMethod) {
      this.$router.back()
      return
    }

    this.$store.dispatch('GetAreas', {}).then(() => {
      this.setProvinceData()
      this.setCityData()
      this.$nextTick(() => {
        this.setAreaFromFieldsValue({
          province_id: '',
          area_id: ''
        })
      })
    })
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      this.areaForm.validateFields((err, areaFormValues) => {
        if (!err) {
          this.form.validateFields((err, values) => {
            if (!err) {
              const formValues = Object.assign({}, areaFormValues, values)
              formValues.shipping_method_id = this.currentShippingMethod.id
              formValues.first_price = Number(formValues.first_price)
              formValues.continue_price = Number(formValues.continue_price)
              this._addAreaFreightConfig(formValues)
            }
          })
        }
      })
    },
    /**
     * 添加地区运费配置
     * @param areaFreightConfig
     * @private
     */
    _addAreaFreightConfig(areaFreightConfig) {
      addAreaFreightConfig(JSON.stringify(areaFreightConfig)).then((res) => {
        if (res.err_code === ERR_OK) {
          this.$router.back()
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
