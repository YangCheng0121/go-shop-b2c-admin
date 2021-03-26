import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加商品属性
 * @param name
 * @param productCategoryId
 * @param orders
 * @param options
 * @returns {*}
 */
export function addAttribute({ name, productCategoryId, orders, options }) {
  const url = '/attribute/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      name: name,
      productCategoryId: productCategoryId,
      orders: orders,
      options: options
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除商品属性
 * @param ids
 * @returns {*}
 */
export function deleteAttribute(ids) {
  const url = '/attribute/delete'

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
 * 更新商品属性
 * @param id
 * @param name
 * @param productCategoryId
 * @param orders
 * @param options
 * @param propertyIndex
 * @returns {*}
 */
export function updateAttribute({ id, name, productCategoryId, orders, options, propertyIndex }) {
  const url = '/attribute/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: {
      id: id,
      name: name,
      productCategoryId: productCategoryId,
      orders: orders,
      options: options,
      property_index: propertyIndex
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品属性
 * @param id
 * @returns {Promise<unknown>}
 */
export function getAttribute(id) {
  const url = `/attribute/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品属性列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getAttributeList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/attribute'

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
