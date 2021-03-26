import Vue from 'vue'
import { clearUser } from '@/cache'
import { resetRouter } from '@/router'

const user = {
  state: {
    role: {}
  },
  mutations: {
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },
  actions: {
    Logout() {
      return new Promise(resolve => {
        clearUser()
        Vue.$cookies.remove('admin_login')
        resetRouter()
        resolve()
      })
    }
  }
}

export default user
