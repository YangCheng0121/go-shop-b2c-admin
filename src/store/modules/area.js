import { getAreaList } from '@/api/area'
import { ERR_OK } from '@/api/config'

const area = {
  state: {
    areas: [],
    currentArea: null,
    parentArea: null
  },
  mutations: {
    SET_AREAS: (state, areas) => {
      state.areas = areas
    },
    SET_CURRENT_AREA: (state, currentArea) => {
      state.currentArea = currentArea
    },
    SET_PARENT_AREA: (state, parentArea) => {
      state.parentArea = parentArea
    }
  },
  actions: {
    /**
     * 获取区域
     * @param commit
     * @param query
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetAllArea({ commit }, { query }) {
      return new Promise(resolve => {
        getAreaList({ query }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_AREAS', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 设置当前区域
     * @param commit
     * @param currentArea
     * @constructor
     */
    SetCurrentArea({ commit }, currentArea) {
      commit('SET_CURRENT_AREA', currentArea)
    },
    /**
     * 获取上级区域
     * @param commit
     * @param parentArea
     * @constructor
     */
    SetParentArea({ commit }, parentArea) {
      return new Promise(resolve => {
        commit('SET_PARENT_AREA', parentArea)
      })
    }
  }
}

export default area
