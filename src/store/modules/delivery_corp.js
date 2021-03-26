import { getDeliveryCorpCount, getDeliveryCorpList } from '@/api/delivery_corp'
import { ERR_OK } from '@/api/config'

const deliveryCorp = {
  state: {
    pageList: {}
  },
  mutations: {
    SET_ORDER_DELIVERY_CORPS: (state, deliveryCorps) => {
      state.pageList = deliveryCorps
    }
  },
  actions: {
    /**
     * 获取 物流公司
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetDeliveryCorps({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getDeliveryCorpList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_ORDER_DELIVERY_CORPS', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取所有物流公司
     * @param commit
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetAllDeliveryCorp({ commit }) {
      return new Promise(resolve => {
        getDeliveryCorpCount().then((res) => {
          if (res.err_code === ERR_OK) {
            const pageNumber = 1
            const pageSize = res.data
            getDeliveryCorpList({ pageNumber, pageSize }).then((res) => {
              if (res.err_code === ERR_OK) {
                commit('SET_ORDER_DELIVERY_CORPS', res.data)
                resolve()
              }
            })
          }
        })
      })
    }
  }
}

export default deliveryCorp
