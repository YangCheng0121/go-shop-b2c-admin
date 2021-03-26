import axios from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 通过订单获取收款信息
 * @param orderId
 * @returns {Promise<*>}
 */
export function getPaymentByOrder(orderId) {
  const url = '/payment/order'

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
 * 获取支付信息
 * @param sn
 * @returns {*}
 */
export function getPayment(sn) {
  const url = `/payment/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取支付列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getPaymentList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/payment'

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
