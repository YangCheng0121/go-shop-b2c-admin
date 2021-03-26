import { getAdPositionList } from '@/api/ad'
import { ERR_OK } from '@/api/config'

const ad = {
  state: {
    adPositionList: []
  },
  mutations: {
    SET_AD_POSITION_LIST: (state, adPositionList) => {
      state.adPositionList = adPositionList
    }
  },
  actions: {
    /**
     * 获取所有广告位置
     * @param commit
     * @constructor
     */
    GetAllAdPosition({ commit }) {
      return new Promise(resolve => {
        getAdPositionList().then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_AD_POSITION_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default ad
