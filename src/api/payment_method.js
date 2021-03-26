import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加支付方式
 * @returns {*}
 * @param paymentMethod
 */
export function addPaymentMethod(paymentMethod) {
  const url = '/payment_method/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      payment_method: paymentMethod
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除支付方式
 * @returns {*}
 */
export function deletePaymentMethod(ids) {
  const url = '/payment_method/delete'

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
 * 更新支付方式
 * @returns {*}
 * @param paymentMethod
 */
export function updatePaymentMethod(paymentMethod) {
  const url = '/payment_method/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      payment_method: paymentMethod
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取支付方式
 * @param id
 * @returns {*}
 */
export function getPaymentMethod(id) {
  const url = `/payment_method/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取支付方法数量
 * @param query
 * @returns {*}
 */
export function getPaymentMethodCount(query) {
  const url = '/payment_method/count'
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
 * 获取支付方法列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getPaymentMethodList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/payment_method'

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
