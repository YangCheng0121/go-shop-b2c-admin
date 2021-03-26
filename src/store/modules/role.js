import { getRole, getRoleCount, getRoleList } from '@/api/role'
import { ERR_OK } from '@/api/config'

const role = {
  state: {
    pageList: {},
    list: [],
    role: {}
  },
  mutations: {
    SET_ROLE_LIST: (state, pageList) => {
      state.pageList = pageList
    },
    SET_ALL_ROLE: (state, list) => {
      state.list = list
    },
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },
  actions: {
    /**
     * 获取角色
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetRole({ commit }, id) {
      return new Promise(resolve => {
          getRole(id).then((res) => {
            if (res.err_code === ERR_OK) {
              commit('SET_ROLE', res.data)
              resolve(res.data)
            }
          })
      })
    },
    /**
     * 获取角色列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @constructor
     */
    GetRoleList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      return new Promise(resolve => {
        getRoleList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_ROLE_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取所有角色
     * @param commit
     * @param dispatch
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetAllRole({ dispatch, commit }) {
      return new Promise(resolve => {
        getRoleCount().then((res) => {
          if (res.err_code === ERR_OK) {
            const pageNumber = 1
            const pageSize = res.data
            dispatch('GetRoleList', { pageNumber, pageSize }).then((data) => {
              commit('SET_ALL_ROLE', data.list)
              resolve(data.list)
            })
          }
        })
      })
    },
    /**
     * 设置 role
     * @param commit
     * @param role
     * @constructor
     */
    SetRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLE', role)
        resolve()
      })
    }
  }
}

export default role
