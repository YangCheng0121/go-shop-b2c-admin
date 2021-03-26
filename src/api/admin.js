import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加管理员
 * @param username
 * @param password1
 * @param password2
 * @param email
 * @param isEnabled
 * @param department
 * @param nickname
 * @returns {*}
 */
export function addAdmin({ username, password1, password2, email, isEnabled, department, nickname }) {
  const url = '/admin/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      username: username,
      password1: password1,
      password2: password2,
      email: email,
      is_enabled: isEnabled,
      department: department,
      nickname: nickname
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除管理员
 * @returns {*}
 */
export function deleteAdmin(ids) {
  const url = '/admin/delete'

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
 * 更新管理员
 * @param id
 * @param username
 * @param password1
 * @param password2
 * @param email
 * @param isEnabled
 * @param department
 * @param nickname
 * @param roles
 * @returns {*}
 */
export function updateAdmin({ id, username, password1, password2, email, isEnabled, department, nickname, roles }) {
  const url = '/admin/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      id: id,
      username: username,
      password1: password1,
      password2: password2,
      email: email,
      is_enabled: isEnabled,
      department: department,
      nickname: nickname,
      roles: roles
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取管理员
 * @param id
 * @returns {*}
 */
export function getAdmin(id) {
  const url = `/admin/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取管理员列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getAdminList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/admin'

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
