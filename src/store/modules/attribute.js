import { getAttributeList } from '@/api/attribute'
import { ERR_OK } from '@/api/config'

const attribute = {
  state: {
    pageList: []
  },
  mutations: {
    SET_ATTRIBUTE_LIST: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    /**
     * 获取商品属性列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @constructor
     */
    GetAttributePageList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getAttributeList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            const pageList = res.data
            commit('SET_ATTRIBUTE_LIST', pageList)
            resolve()
          }
        })
      })
    }
  }
}

export default attribute
