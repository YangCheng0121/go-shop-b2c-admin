import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 更新消息配置
 * @param messageConfig
 * @returns {*}
 */
export function updateMessageConfig(messageConfig) {
  const url = '/message_config/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      message_config: messageConfig
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取消息配置
 */
export function getMessageConfig(id) {
  const url = `/message_config/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取消息配置列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getMessageConfigList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/message_config'

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
