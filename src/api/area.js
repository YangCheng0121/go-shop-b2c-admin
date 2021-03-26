import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加地区
 * @param area
 * @returns {*}
 */
export function addArea(area) {
  const url = '/area/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      area: area
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除区域
 * @param ids
 * @returns {*}
 */
export function deleteArea(ids) {
  const url = '/area/delete'

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
 * 更新区域信息
 * @param area
 * @returns {*}
 */
export function updateArea(area) {
  const url = '/area/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      area: area
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取一个区域信息
 * @param id
 * @returns {*}
 */
export function getArea(id) {
  const url = `/area/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取区域列表
 * @returns {*}
 */
export function getAreaList({ query }) {
  const url = '/area'

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
