/**
 * 会员
 */
import { getMember } from '@/api/member'
import { ERR_OK } from '@/api/config'

const member = {
  state: {
    member: {}
  },
  mutations: {
    SET_MEMBER: (state, member) => {
      state.member = member
    }
  },
  actions: {
    /**
     * 获取会员
     * @param commit
     * @param id
     * @constructor
     */
    GetMember({ commit }, id) {
      return new Promise(resolve => {
        getMember(id).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_MEMBER', res.data)
            resolve(res.data)
          }
        })
      })
    }
  }
}

export default member
