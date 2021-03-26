import { getPermissionList } from '@/api/permission'
import { ERR_OK } from '@/api/config'

const permission = {
  state: {
    permissions: []
  },
  mutations: {
    SET_PERMISSIONS: (state, list) => {
      state.permissions = list
    }
  },
  actions: {
    /**
     * 获取权限列表
     * @param commit
     * @constructor
     */
    GetPermissions({ commit }) {
      return new Promise(resolve => {
        getPermissionList({}).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_PERMISSIONS', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default permission
