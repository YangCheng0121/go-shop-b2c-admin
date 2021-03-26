import { ERR_OK } from '@/api/config'
import { getTagList, getTagCount } from '@/api/tag'

const tag = {
  state: {
    pageList: []
  },
  mutations: {
    SET_TAG_LIST: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    /**
     * 获取标签列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetTagList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getTagList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            const tagList = res.data
            commit('SET_TAG_LIST', tagList)
            resolve()
          }
        })
      })
    },
    /**
     * 获取所有的标签列表
     * @param dispatch
     * @param commit
     * @param query
     * @constructor
     */
    GetAllTagPageList({ dispatch, commit }, query) {
      getTagCount(query).then((res) => {
        if (res.err_code) {
          const pageNumber = 1
          const pageSize = res.data
          const sortby = 'CreationDate'
          const order = 'desc' // 倒序
          dispatch('GetTagList', { query, sortby, order, pageNumber, pageSize })
        }
      })
    }
  }
}

export default tag
