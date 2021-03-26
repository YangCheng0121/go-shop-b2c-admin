import { getBrandList, getBrandCount } from '@/api/brand'
import { ERR_OK } from '@/api/config'
import { IMAGE_PREFIX } from '@/config/axios.config.js'

const brand = {
  state: {
    pageList: {}
  },
  mutations: {
    SET_BRAND_PAGES: (state, pageList) => {
      state.pageList = pageList
    }
  },
  actions: {
    /**
     * 获取品牌列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetBrandPageList({ commit }, { query, sortby, order, pageNumber, pageSize }) {
      getBrandList({ query, sortby, order, pageNumber, pageSize }).then((res) => {
        if (res.err_code === ERR_OK) {
          const pageList = res.data
          if (pageList && pageList.list) {
            pageList.list.forEach((brand) => {
              brand.logo = IMAGE_PREFIX + brand.logo
            })
            commit('SET_BRAND_PAGES', pageList)
          }
        }
      })
    },
    /**
     * 获取所有的标签列表
     * @param dispatch
     * @param commit
     * @param query
     * @constructor
     */
    GetAllBrandPageList({ dispatch, commit }, query) {
      getBrandCount(query).then((res) => {
        if (res.err_code === ERR_OK) {
          const pageNumber = 1
          const pageSize = res.data
          const sortby = 'CreationDate'
          const order = 'desc' // 倒序
          dispatch('GetBrandPageList', { query, sortby, order, pageNumber, pageSize })
        }
      })
    }
  }
}

export default brand
