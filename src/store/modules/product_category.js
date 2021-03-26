/**
 * 商品分类
 */
import { getProductCategoryList } from '@/api/product_category'
import { ERR_OK } from '@/api/config'
import { toTreeData } from '@/utils/util'

const productCategory = {
  state: {
    list: [],
    // 对应后端返回字段
    attrs: [
      { key: 'is_marketable', label: '是否上架' },
      { key: 'is_top', label: '是否置顶' },
      { key: 'is_show', label: '是否显示' }
    ],
    currentCategory: {}
  },
  getters: {
    // 商品分类列表
    productCategoryList: state => state.list,
    // 当前商品分类
    productCategory: state => state.currentCategory,
    treeDataProductCategoryList: state => {
      if (state.list && state.list.length) {
        return toTreeData(state.list.slice(), 'id')
      }
      return []
    },
    // 商品分类属性列表
    productCategoryAttrs: state => state.attrs
  },
  mutations: {
    SET_PRODUCT_CATEGORY_LIST: (state, list) => {
      state.list = list
    },
    SET_CURRENT_PRODUCT_CATEGORY: (state, category) => {
      state.currentCategory = category
    }
  },
  actions: {
    /**
     * 获取商品分类列表
     * @param commit
     * @param query
     * @param sortBy
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetProductCategoryList({ commit }, query) {
      return new Promise(resolve => {
        const sortBy = 'Orders'
        const order = 'asc'
        getProductCategoryList({ query, sortBy, order }).then((res) => {
          if (res.err_code === ERR_OK) {
            const categoryList = res.data
            commit('SET_PRODUCT_CATEGORY_LIST', categoryList)
            resolve(categoryList)
          }
        })
      })
    },
    /**
     * 获取当前分类
     * @param commit
     * @param category
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetCurrentProductCategory({ commit }, category) {
      commit('SET_CURRENT_PRODUCT_CATEGORY', category)
    }
  }
}

export default productCategory
