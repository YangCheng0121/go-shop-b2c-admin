import { getParameterList } from '@/api/parameter'
import { ERR_OK } from '@/api/config'

const parameter = {
  state: {
    pageList: []
  },
  mutations: {
    SET_PRODUCT_PARAMETER_PAGE_LIST: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    GetParameterList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getParameterList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            const pageList = res.data
            commit('SET_PRODUCT_PARAMETER_PAGE_LIST', pageList)
            resolve()
          }
        })
      })
    }
  }
}

export default parameter
