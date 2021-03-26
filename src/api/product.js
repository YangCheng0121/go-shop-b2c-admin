import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加商品
 * @param params
 * @returns {*}
 */
export function addProduct(params) {
  const url = '/product/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除商品
 * @param ids
 * @returns {Promise<unknown>}
 */
export function deleteProduct(ids) {
  const url = '/product/delete'

  return axios({
    url: url,
    method: 'DELETE',
    params: {
      ids: ids
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 更新商品
 * @param params
 * @returns {*}
 */
export function updateProduct(params) {
  const url = '/product/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 商品 上架/下架
 * @param ids
 * @param isMarketable
 * @returns {Promise<unknown>}
 */
export function toggleMarketableProduct({ ids, isMarketable }) {
  const url = '/product/update/marketable'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      ids: ids,
      isMarketable: isMarketable
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品信息
 * @param sn
 * @returns {Promise<unknown>}
 */
export function getProduct(sn) {
  const url = `/product/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品数量
 * @param query
 */
export function getProductCount(query) {
  const url = '/product/count'

  return axios({
    url: url,
    method: 'GET',
    params: {
      query: getObjectKeyValueToString(query)
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getProductList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/product'

  return axios({
    url: url,
    method: 'GET',
    params: {
      query: getObjectKeyValueToString(query),
      sortby: sortby,
      order: order,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品参数
 * @param productCategoryId
 * @returns {Promise<unknown>}
 */
export function getProductParameters(productCategoryId) {
  const url = '/product/parameters'

  return axios({
    url: url,
    method: 'GET',
    params: {
      productCategoryId: productCategoryId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品参数
 * @param productCategoryId
 * @returns {Promise<unknown>}
 */
export function getProductAttributes(productCategoryId) {
  const url = '/product/attributes'

  return axios({
    url: url,
    method: 'GET',
    params: {
      productCategoryId: productCategoryId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品规格
 * @param productCategoryId
 * @returns {Promise<unknown>}
 */
export function getProductSpecification(productCategoryId) {
  const url = '/product/specifications'

  return axios({
    url: url,
    method: 'GET',
    params: {
      productCategoryId: productCategoryId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
