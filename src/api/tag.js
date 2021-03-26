import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加标签
 * @param name
 * @param icon
 * @param memo
 * @param orders
 * @returns {Promise<unknown>}
 * @constructor
 */
export function addTag({ name, icon, memo, orders }) {
  const url = '/tag/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      name: name,
      icon: icon,
      memo: memo,
      orders: orders
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 更新标签
 * @param id
 * @param name
 * @param icon
 * @param memo
 * @param orders
 * @returns {*}
 */
export function updateTag({ id, name, icon, memo, orders }) {
  const url = '/tag/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      id: id,
      name: name,
      icon: icon,
      memo: memo,
      orders: orders
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取标签信息
 * @param id
 * @returns {Promise<unknown>}
 */
export function getTag(id) {
  const url = `/tag/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除标签
 * @param ids
 * @returns {*}
 */
export function deleteTag(ids) {
  const url = '/tag/delete'

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
 * 获取标签列表
 * @returns {Promise<unknown>}
 */
export function getTagList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/tag'

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

/**
 * 获取标签列表总数
 * @param query
 * @returns {Promise<unknown>}
 */
export function getTagCount(query) {
  const url = '/tag/count'

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
