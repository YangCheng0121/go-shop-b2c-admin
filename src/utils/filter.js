import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import store from '@/store'

moment.locale('zh-cn')

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  // 将整数部分逢三一断
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('Moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('Amount', function(amount) {
  const currencySign = store.getters.setting.currencySign
  return currencySign && currencySign + parseFloat(amount).toFixed(2)
})

Vue.filter('Empty', function(data) {
  return data || '-'
})
