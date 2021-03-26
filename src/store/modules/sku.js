const sku = {
  state: {
    sn: null
  },
  mutations: {
    SET_SKU_SN: (state, sn) => {
      state.sn = sn
    }
  },
  actions: {
    SetSkuSn({ commit }, sn) {
      commit('SET_SKU_SN', sn)
    }
  }
}

export default sku
