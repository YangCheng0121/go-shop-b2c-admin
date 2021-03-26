import { getSpecificationList } from '@/api/specification'
import { ERR_OK } from '@/api/config'

const specification = {
  state: {
    pageList: []
  },
  mutations: {
    SET_SPECIFICATION_LIST: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    GetSpecificationList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getSpecificationList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            const pageList = res.data
            commit('SET_SPECIFICATION_LIST', pageList)
            resolve()
          }
        })
      })
    }
  }
}

export default specification
