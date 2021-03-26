import { getShippingMethodList, getShippingMethodCount } from '@/api/shipping_method'
import { ERR_OK } from '@/api/config'

const shippingMethod = {
  state: {
    pageList: {},
    currentShippingMethod: null
  },
  mutations: {
    SET_SHIPPING_METHODS: (state, pageList) => {
      state.pageList = pageList
    },
    SET_CURRENT_SHIPPING_METHOD: (state, method) => {
      state.currentShippingMethod = method
    }
  },
  actions: {
    /**
     * 获取配送方式
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetShippingMethods({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getShippingMethodList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_SHIPPING_METHODS', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取所有配送方式
     * @param dispatch
     * @constructor
     */
    GetAllShippingMethods({ dispatch }) {
      getShippingMethodCount().then((res) => {
        if (res.err_code === ERR_OK) {
          const pageNumber = 1
          const pageSize = res.data
          dispatch('GetShippingMethods', { pageNumber, pageSize })
        }
      })
    },
    /**
     * 设置当前配送方式
     * @param commit
     * @param method
     * @constructor
     */
    SetCurrentShippingMethod({ commit }, method) {
      return new Promise(resolve => {
        commit('SET_CURRENT_SHIPPING_METHOD', method)
        resolve()
      })
    }
  }
}

export default shippingMethod
