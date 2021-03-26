import { getPaymentMethodCount, getPaymentMethodList } from '@/api/payment_method'
import { ERR_OK } from '@/api/config'

const payment = {
  state: {
    pageList: {}
  },
  mutations: {
    SET_PAYMENT_METHODS: (state, list) => {
      state.pageList = list
    }
  },
  actions: {
    /**
     * 获取订单支付方法
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetPaymentMethods({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getPaymentMethodList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_PAYMENT_METHODS', res.data)
            resolve(res.data)
          }
        })
      })
    },
    GetAllPaymentMethod({ commit }) {
      return new Promise(resolve => {
        getPaymentMethodCount().then((res) => {
          if (res.err_code === ERR_OK) {
            const pageNumber = 1
            const pageSize = res.data
            getPaymentMethodList({ pageNumber, pageSize }).then((res) => {
              if (res.err_code === ERR_OK) {
                commit('SET_PAYMENT_METHODS', res.data)
                resolve()
              }
            })
          }
        })
      })
    }
  }
}

export default payment
