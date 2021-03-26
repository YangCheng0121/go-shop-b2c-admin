/**
 * 优惠券
 */
import { getCoupon, getCouponCount, getCouponList } from '@/api/coupon'
import { ERR_OK } from '@/api/config'

const memberRank = {
  state: {
    pageList: {},
    coupon: {}
  },
  mutations: {
    SET_COUPON_PAGE_LIST: (state, pageList) => {
      state.pageList = pageList
    },
    SET_COUPON: (state, coupon) => {
      state.coupon = coupon
    }
  },
  actions: {
    /**
     * 获取优惠券
     * @param commit
     * @param id
     * @constructor
     */
    GetCoupon({ commit }, id) {
      return new Promise(resolve => {
        getCoupon(id).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_COUPON', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取所有优惠券列表
     * @param commit
     * @returns {Promise<unknown>}
     */
    GetAllCoupon({ commit }) {
      return new Promise(resolve => {
        getCouponCount().then((res) => {
          if (res.err_code === ERR_OK) {
            const pageNumber = 1
            const pageSize = res.data
            getCouponList({ pageNumber, pageSize }).then((res) => {
              if (res.err_code === ERR_OK) {
                commit('SET_COUPON_PAGE_LIST', res.data)
                resolve(res.data)
              }
            })
          }
        })
      })
    },
    /**
     * 获取优惠券列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetCouponList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getCouponList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_COUPON_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default memberRank
