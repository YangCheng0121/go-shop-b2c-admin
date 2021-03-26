import axios from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 通过订单获取发货信息
 * @param orderId
 * @returns {Promise<*>}
 */
export function getShippingByOrder(orderId) {
  const url = '/shipping/order'

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
 * 获取发货信息
 * @param sn
 * @returns {*}
 */
export function getShipping(sn) {
  const url = `/shipping/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取发货列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getShippingList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/shipping'

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
