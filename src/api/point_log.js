import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加积分记录
 * @param pointLog
 * @returns {*}
 */
export function addPointLog(pointLog) {
  const url = '/point_log/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      point_log: pointLog
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取积分记录
 */
export function getPointLog(id) {
  const url = `/point_log/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取积分记录列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getPointLogList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/point_log'

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
