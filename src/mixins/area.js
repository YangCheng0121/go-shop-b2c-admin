import { mapGetters } from 'vuex'

const areaMixin = {
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
  data() {
    return {
      provinceList: [], // 省份列表
      cityKeyValues: {}, // 城市键值对
      cityList: [], // 城市列表
      areaKeyValues: {}, // 区域键值对
      areaList: [], // 区域列表
      areaForm: this.$form.createForm(this, { name: 'Area' }),
      secondCity: '',
      thirdArea: ''
    }
  },
  methods: {
    /**
     * 设置表单 Filed Value
     */
    setAreaFromFieldsValue(form) {
      this.areaForm.setFieldsValue(form)
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
      this.setAreaFromFieldsValue({
        province_id: this.getProvinceByCity().id,
        city_id: '',
        area_id: ''
      })
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
        this.setAreaFromFieldsValue({
          city_id: this.getCityByArea(value).id,
          area_id: ''
        })
      }
    },
    /**
     * 区域值改变时处理
     * @param value
     */
    handleAreaChange(value) {
      if (this.areaKeyValues[value]) {
        this.setAreaFromFieldsValue({
          area_id: this.getAreaById(value)
        })
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
    }
  }
}

export default areaMixin
