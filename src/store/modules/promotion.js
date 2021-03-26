/**
 * 促销
 */
import { getPromotion, getPromotionCount, getPromotionList } from '@/api/promotion'
import { ERR_OK } from '@/api/config'

const promotion = {
  state: {
    pageList: {},
    promotion: {}
  },
  mutations: {
    SET_PROMOTION_PAGE_LIST: (state, pageList) => {
      state.pageList = pageList
    },
    SET_PROMOTION: (state, promotion) => {
      state.promotion = promotion
    }
  },
  actions: {
    /**
     * 获取所有促销列表
     * @param commit
     * @returns {Promise<unknown>}
     */
    GetAllPromotionList({ commit }) {
      getPromotionCount().then((res) => {
        if (res.err_code === ERR_OK && res.data) {
          const pageNumber = 1
          const pageSize = res.data
          getPromotionList({ pageNumber, pageSize }).then((res) => {
            if (res.err_code === ERR_OK) {
              commit('SET_PROMOTION_PAGE_LIST', res.data)
            }
          })
        }
      })
    },
    /**
     * 获取促销列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetPromotionList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getPromotionList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_PROMOTION_PAGE_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取促销
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetPromotion({ commit }, id) {
      return new Promise(resolve => {
        getPromotion(id).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_PROMOTION', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default promotion
