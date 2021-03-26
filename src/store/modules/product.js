import {
  getProductAttributes,
  getProductCount,
  getProductList,
  getProductParameters,
  getProductSpecification
} from '@/api/product'
import { ERR_OK } from '@/api/config'

const product = {
  state: {
    pageList: {},
    // 对应后端返回字段
    attrs: [
      { key: 'is_marketable', label: '是否上架' },
      { key: 'is_top', label: '是否置顶' },
      { key: 'is_list', label: '是否列出' }
    ],
    // 商品参数
    parameters: [],
    // 商品属性
    attributes: [],
    // 商品规格
    specifications: [],
    // 是否选择规格
    isSelectSpecification: false,
    types: [
      {
        value: 'general',
        label: '普通商品'
      },
      {
        value: 'exchange',
        label: '兑换商品'
      },
      {
        value: 'gift',
        label: '赠品'
      }
    ]
  },
  mutations: {
    SET_PRODUCT_PARAMETERS(state, parameters) {
      state.parameters = parameters
    },
    SET_PRODUCT_ATTRIBUTES(state, attributes) {
      state.attributes = attributes
    },
    SET_PRODUCT_SPECIFICATION(state, specifications) {
      state.specifications = specifications
    },
    SET_IS_SELECT_SPECIFICATION(state, bol) {
      state.isSelectSpecification = bol
    },
    SET_PRODUCT_LIST(state, pageList) {
      state.pageList = pageList
    }
  },
  actions: {
    /**
     * 获取商品参数
     * @param commit
     * @param productCategoryId
     * @constructor
     */
    async GetProductParameters({ commit }, productCategoryId) {
      await getProductParameters(productCategoryId).then((res) => {
        if (res.err_code === ERR_OK) {
          commit('SET_PRODUCT_PARAMETERS', res.data)
        }
      })
    },
    /**
     * 获取商品参数
     * @param commit
     * @param productCategoryId
     * @constructor
     */
    async GetProductAttributes({ commit }, productCategoryId) {
      await getProductAttributes(productCategoryId).then((res) => {
        if (res.err_code === ERR_OK) {
          commit('SET_PRODUCT_ATTRIBUTES', res.data)
        }
      })
    },
    /**
     * 获取商品规格
     * @param commit
     * @param productCategoryId
     * @constructor
     */
    async GetProductSpecifications({ commit }, productCategoryId) {
      await getProductSpecification(productCategoryId).then((res) => {
        if (res.err_code === ERR_OK) {
          commit('SET_PRODUCT_SPECIFICATION', res.data)
        }
      })
    },
    /**
     * 设置是否选择规格
     * @param commit
     * @param bol
     * @constructor
     */
    SetIsSelectSpecification({ commit }, bol) {
      commit('SET_IS_SELECT_SPECIFICATION', bol)
    },
    /**
     * 获取商品的 参数、属性、规格
     * @param dispatch
     * @param categoryId
     * @constructor
     */
    async GetProductParametersAndAttributesAndSpecifications({ dispatch }, categoryId) {
      await dispatch('GetProductParameters', categoryId)
      await dispatch('GetProductAttributes', categoryId)
      await dispatch('GetProductSpecifications', categoryId)
    },
    /**
     * 获取商品列表
     * @param commit
     * @param query
     * @param sortby
     * @param order
     * @param pageNumber
     * @param pageSize
     * @param tag
     * @constructor
     */
    GetProductList({ commit }, { query, sortby, order, pageNumber, pageSize, tag }) {
      return new Promise(resolve => {
        getProductList({ query, sortby, order, pageNumber, pageSize, tag }).then((res) => {
          if (res.err_code === ERR_OK) {
            commit('SET_PRODUCT_LIST', res.data)
            resolve(res.data)
          }
        })
      })
    },
    /**
     * 获取所有赠品
     */
    GetAllGifts({ dispatch }) {
      return new Promise(resolve => {
        const query = { IsGift: 1 }
        getProductCount(query).then((res) => {
          if (res.err_code === ERR_OK) {
            const query = { IsGift: 1 }
            const pageNumber = 1
            const pageSize = res.data
            const sortby = 'CreationDate'
            const order = 'desc' // 倒序
            dispatch('GetProductList', { query, sortby, order, pageNumber, pageSize })
            resolve()
          }
        })
      })
    }
  }
}

export default product
