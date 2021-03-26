import axios from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 获取到货通知列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getProductNotifyList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/product_notify'

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
