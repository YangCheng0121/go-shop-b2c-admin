import { getOrder } from '@/api/order'
import { ERR_OK } from '@/api/config'
import * as types from '../mutation-types'

const order = {
  state: {
    types: {
      general: '普通订单'
    },
    status: {
      // 等待付款 0
      pendingPayment: 0,
      // 等待审核 1
      pendingReview: 1,
      // 等待发货 2
      pendingShipment: 2,
      // 已发货 3
      shipped: 3,
      // 已收货 4
      received: 4,
      // 已完成 5
      completed: 5,
      // 已失败 6
      failed: 6,
      // 已取消 7
      canceled: 7,
      // 已拒绝 8
      denied: 8,
      // 已退货
      returns: 9,
      // 未完成 10
      unfinished: 10,
      // 退款中 11
      refunding: 11,
      // 退款完成 11
      refunded: 12
    },
    currentOrder: null
  },
  getters: {
    // 当前订单
    order: state => state.currentOrder,
    // 订单类型
    orderTypes: state => state.types,
    // 订单状态
    orderStatus: state => state.status
  },
  mutations: {
    [types.SET_ORDER]: (state, order) => {
      state.currentOrder = order
    }
  },
  actions: {
    /**
     * 获取订单
     * @param commit
     * @param sn
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetOrder({ commit }, sn) {
      return new Promise(resolve => {
        getOrder(sn).then((res) => {
          if (res.err_code === ERR_OK) {
            commit(types.SET_ORDER, res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default order
