import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 订单退款审核
 * @param sn
 * @param review
 * @returns {Promise<unknown>}
 */
export function reviewRefundOrder(sn, review) {
  const url = '/refunds/review'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      sn: sn,
      review: review
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 通过订单获取退款信息
 * @param orderId
 * @returns {Promise<*>}
 */
export function getRefundsByOrder(orderId) {
  const url = '/refunds/order'

  return axios({
    url: url,
    method: 'GET',
    params: {
      order_id: orderId,
      sortby: 'CreationDate',
      order: 'desc'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取退款信息
 * @param sn
 * @returns {*}
 */
export function getRefunds(sn) {
  const url = `/refunds/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取退款列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getRefundsList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/refunds'

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
