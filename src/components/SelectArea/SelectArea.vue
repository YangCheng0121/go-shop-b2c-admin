<template>
  <a-form
    layout="inline"
    :form="form">
    <a-form-item>
      <a-select
        v-decorator="['province_id']"
        style="width: 120px"
        placeholder="请选择省份"
        @change="handleProvinceChange">
        <a-select-option
          v-for="province in provinceList"
          :value="province.id"
          :key="province.id">
          {{ province.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-show="secondCity">
      <a-select
        style="width: 120px"
        v-decorator="['city_id']"
        @change="handleCityChange">
        <a-select-option
          v-for="city in cityKeyValues[secondCity]"
          :value="city.id"
          :key="city.id">
          {{ city.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-show="isShowAreaList">
      <a-select
        style="width: 120px"
        v-decorator="['area_id']">
        <a-select-option v-for="area in areaKeyValues[thirdArea]" :value="area.id" :key="area.id">
          {{ area.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script type="es6">
import { mapGetters } from 'vuex'

export default {
  name: 'SelectArea',
  computed: {
    isShowAreaList() {
      if (this.areaKeyValues[this.thirdArea]) {
        return true
      }
      return false
    },
    ...mapGetters([
      'areas'
    ])
  },
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      provinceList: [], // 省份列表
      cityKeyValues: {}, // 城市键值对
      cityList: [], // 城市列表
      areaKeyValues: {}, // 区域键值对
      areaList: [], // 区域列表
      form: this.$form.createForm(this, { name: 'Area' }),
      secondCity: '',
      thirdArea: ''
    }
  },
  async created() {
    await this.$store.dispatch('GetAllArea', {}).then(() => {
      this.setProvinceData()
      this.setCityData()
      this.setAreaData()
      this.initProvinceCityArea(this.value)
    })
  },
  methods: {
    /**
     * 初始化省份、城市、区域
     */
    initProvinceCityArea(areaId) {
      const area = this.getAreaById(areaId)
      let city
      if (area) {
        city = this.getCityByArea(area.parent_id)
      } else {
        city = this.getCityByArea(areaId)
      }
      const province = this.getProvinceByCity(city.id)
      this.secondCity = city.parent_id
      this.thirdArea = city.id
      this.setFromFieldsValue({
        province_id: province.id,
        city_id: city.id,
        area_id: areaId
      })
    },
    /**
     * 设置表单 Filed Value
     */
    setFromFieldsValue(form) {
      this.form.setFieldsValue(form)
    },
    /**
     * 省份值改变时处理
     * @param value
     */
    handleProvinceChange(value) {
      this.secondCity = value
      this.thirdArea = null
      this.cityKeyValues[value].unshift({
        id: '',
        name: '请选择...'
      })
      this.setFromFieldsValue({
        province_id: this.getProvinceByCity().id,
        city_id: '',
        area_id: ''
      })
      this.$emit('input', value)
    },
    /**
     * 城市值改变时处理
     * @param value
     */
    handleCityChange(value) {
      this.thirdArea = value
      if (this.areaKeyValues[value]) {
        this.areaKeyValues[value].unshift({
          id: '',
          name: '请选择...'
        })
        this.setFromFieldsValue({
          city_id: this.getCityByArea(value).id,
          area_id: ''
        })
        this.$emit('input', value)
      }
    },
    /**
     * 区域值改变时处理
     * @param value
     */
    handleAreaChange(value) {
      if (this.areaKeyValues[value]) {
        this.setFromFieldsValue({
          area_id: this.getAreaById(value)
        })
        this.$emit('input', value)
      }
    },
    /**
     * 通过 Id 获取省份
     */
    getProvinceByCity(id) {
      const city = this.cityList.find((item) => {
        return item.id === id
      })
      let province
      if (city) {
        province = this.provinceList.find((item) => {
          return item.id === city.parent_id
        })
      }
      return province || ''
    },
    /**
     * 通过 Id 获取城市
     */
    getCityByArea(id) {
      const city = this.cityList.find((item) => {
        return item.id === id
      })
      return city || ''
    },
    /**
     * 通过 Id 获取区域
     */
    getAreaById(id) {
      const area = this.areaList.find((item) => {
        return item.id === id
      })
      return area || ''
    },
    /**
     * 设置省份
     */
    setProvinceData() {
      this.provinceList = this.areas.filter((item) => {
        return item.tree_path === ','
      })
    },
    /**
     * 设置城市
     */
    setCityData() {
      this.cityList = this.areas.filter((item) => {
        const treePath = item.tree_path.split('').filter(value => value === ',')
        if (treePath.length === 2) {
          return item
        }
      })

      this.provinceList.forEach((province) => {
        this.cityList.forEach((city) => {
          if (province.id === city.parent_id) {
            this.cityKeyValues[province.id] = this.cityKeyValues[province.id] ? this.cityKeyValues[province.id] : []
            this.cityKeyValues[province.id].push(city)
          }
        })
      })
    },
    /**
     * 设置地区
     */
    setAreaData() {
      this.areaList = this.areas.filter((item) => {
        const treePath = item.tree_path.split('').filter(value => value === ',')
        if (treePath.length === 3) {
          return item
        }
      })

      this.cityList.forEach((city) => {
        this.areaList.forEach((area) => {
          if (city.id === area.parent_id) {
            this.areaKeyValues[city.id] = this.areaKeyValues[city.id] ? this.areaKeyValues[city.id] : []
            this.areaKeyValues[city.id].push(area)
          }
        })
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      return new Promise(resolve => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const area = this.getAreaById(values.area_id)
            let city
            if (area) {
              city = this.getCityByArea(area.parent_id)
            } else {
              city = this.getCityByArea(values.city_id)
            }
            const province = this.getProvinceByCity(city.id)
            resolve({ province, city, area })
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
