import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加插件
 * @returns {*}
 * @param pluginConfig
 */
export function addPluginConfig(pluginConfig) {
  const url = '/plugin_config/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      plugin_config: pluginConfig
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除插件
 * @returns {*}
 */
export function deletePluginConfig(ids) {
  const url = '/plugin_config/delete'

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
 * 更新插件
 * @returns {*}
 * @param pluginConfig
 */
export function updatePluginConfig(pluginConfig) {
  const url = '/plugin_config/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      plugin_config: pluginConfig
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取插件
 * @param id
 * @returns {*}
 */
export function getPluginConfig(id) {
  const url = `/plugin_config/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取插件数量
 * @param query
 * @returns {*}
 */
export function getPluginConfigCount(query) {
  const url = '/plugin_config/count'
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
 * 获取插件
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getPluginConfigList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/plugin_config'

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
