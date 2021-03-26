import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加角色
 * @param role
 * @returns {*}
 */
export function addRole(role) {
  const url = '/role/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      role: role
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除角色
 * @returns {*}
 */
export function deleteRole(ids) {
  const url = '/role/delete'

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
 * 更新角色
 * @param role
 * @returns {*}
 */
export function updateRole(role) {
  const url = '/role/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      role: role
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取角色
 * @param id
 * @returns {*}
 */
export function getRole(id) {
  const url = `/role/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取角色数量
 * @param query
 * @returns {*}
 */
export function getRoleCount(query) {
  const url = '/role/count'

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
 * 获取角色管理列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getRoleList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/role'

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
