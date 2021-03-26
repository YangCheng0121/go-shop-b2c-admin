import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加预存款记录
 * @param pointLog
 * @returns {*}
 */
export function addDepositLog(pointLog) {
  const url = '/deposit_log/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      deposit_log: pointLog
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取预存款记录
 */
export function getDepositLog(id) {
  const url = `/deposit_log/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取预存款记录列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getDepositLogList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/deposit_log'

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
