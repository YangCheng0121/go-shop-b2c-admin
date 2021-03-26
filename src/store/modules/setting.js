import { updateSetting, getSettingList } from '@/api/setting'
import { ERR_OK } from '@/api/config'

const setting = {
  state: {
    list: []
  },
  getters: {
    // 系统设置
    setting: state => {
      const settingList = state.list
      const obj = {}
      settingList.forEach((item) => {
        obj[item.name] = item.value
      })
      return obj
    }
  },
  mutations: {
    SET_SETTING: (state, list) => {
      state.list = list
    }
  },
  actions: {
    /**
     * 获取系统设置
     * @param commit
     * @constructor
     */
    GetSettingList({ commit }) {
      return new Promise(resolve => {
        getSettingList().then((res) => {
          if (res.err_code === ERR_OK) {
            const data = res.data
            commit('SET_SETTING', data)
            resolve()
          }
        })
      })
    },
    /**
     * 更新系统设置
     * @param commit
     * @param setting
     * @constructor
     */
    UpdateSetting({ commit }, setting) {
      const body = JSON.stringify(setting)
      return new Promise(resolve => {
        updateSetting(body).then((res) => {
          if (res.err_code === ERR_OK) {
            resolve()
          }
        })
      })
    }
  }
}

export default setting
