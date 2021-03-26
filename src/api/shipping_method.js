import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加配送方式
 * @param shippingMethod
 * @returns {*}
 */
export function addShippingMethod(shippingMethod) {
  const url = '/shipping_method/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      shipping_method: shippingMethod
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除配送方式
 * @returns {*}
 */
export function deleteShippingMethod(ids) {
  const url = '/shipping_method/delete'

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
 * 更新配送方式
 * @param shippingMethod
 * @returns {*}
 */
export function updateShippingMethod(shippingMethod) {
  const url = '/shipping_method/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      shipping_method: shippingMethod
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取配送方式信息
 */
export function getShippingMethod(id) {
  const url = `/shipping_method/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取配送方式数量
 */
export function getShippingMethodCount() {
  const url = '/shipping_method/count'

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取配送方式
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getShippingMethodList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/shipping_method'

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
