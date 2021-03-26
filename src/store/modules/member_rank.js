/**
 * 会员等级
 */
import { getMemberRankCount, getMemberRankList } from '@/api/member_rank'
import { ERR_OK } from '@/api/config'

const memberRank = {
  state: {
    pageList: {}
  },
  mutations: {
    SET_MEMBER_RANK_PAGE_LIST: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    /**
     * 获取所有会员等级列表
     * @param commit
     * @returns {Promise<unknown>}
     */
    GetAllMemberRank({ commit }) {
      return new Promise(resolve => {
        getMemberRankCount().then((res) => {
          if (res.err_code === ERR_OK) {
            const pageNumber = 1
            const pageSize = res.data
            getMemberRankList({ pageNumber, pageSize }).then((res) => {
              if (res.err_code === ERR_OK) {
                commit('SET_MEMBER_RANK_PAGE_LIST', res.data)
                resolve(res.data)
              }
            })
          }
        })
      })
    },
    /**
     * 获取会员等级列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetMemberRankList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getMemberRankList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_MEMBER_RANK_PAGE_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default memberRank
