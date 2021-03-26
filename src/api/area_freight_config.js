import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加地区运费配置
 * @param areaFreightConfig
 * @returns {*}
 */
export function addAreaFreightConfig(areaFreightConfig) {
  const url = '/area_freight_config/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      areaFreightConfig: areaFreightConfig
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除地区运费配置
 * @returns {*}
 */
export function deleteAreaFreightConfig(ids) {
  const url = '/area_freight_config/delete'

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
 * 更新地区运费配置
 * @param areaFreightConfig
 * @returns {*}
 */
export function updateAreaFreightConfig(areaFreightConfig) {
  const url = '/area_freight_config/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      areaFreightConfig: areaFreightConfig
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取地区运费配置
 * @returns {*}
 * @param id
 */
export function getAreaFreightConfig(id) {
  const url = `/area_freight_config/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取地区运费配置数量
 * @param query
 * @returns {*}
 */
export function getAreaFreightConfigCount(query) {
  const url = '/area_freight_config/count'

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
 * 获取地区运费配置列表
 * @returns {*}
 */
export function getAreaFreightConfigList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/area_freight_config'

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
