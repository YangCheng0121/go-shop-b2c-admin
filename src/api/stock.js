import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 入库
 * @param inQuantity
 * @param sn
 * @param memo
 * @returns {*}
 */
export function inStock({ inQuantity, sn, memo }) {
  const url = '/stock/in'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      in_quantity: inQuantity,
      sn: sn,
      memo: memo
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 出库
 * @param inQuantity
 * @param sn
 * @param memo
 * @returns {*}
 */
export function outStock({ outQuantity, sn, memo }) {
  const url = '/stock/out'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      out_quantity: outQuantity,
      sn: sn,
      memo: memo
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取库存记录列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getStockLogList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/stock/log'

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
