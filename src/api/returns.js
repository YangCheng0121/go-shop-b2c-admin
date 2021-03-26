import axios from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 通过订单获取发货信息
 * @param orderId
 * @Returns {Promise<*>}
 */
export function getReturnsByOrder(orderId) {
  const url = '/returns/order'

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
 * @Returns {*}
 */
export function getReturns(sn) {
  const url = `/returns/${sn}`

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
 * @Returns {Promise<unknown>}
 */
export function getReturnsList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/returns'

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
