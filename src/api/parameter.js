import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加商品参数
 * @param productCategoryId
 * @param group
 * @param orders
 * @param names
 * @returns {*}
 */
export function addParameter({ productCategoryId, group, orders, names }) {
  const url = '/parameter/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      group: group,
      productCategoryId: productCategoryId,
      orders: orders,
      names: names
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除商品参数
 * @param ids
 * @returns {Promise<unknown>}
 */
export function deleteParameter(ids) {
  const url = '/parameter/delete'

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
 * 更新商品参数
 * @param id
 * @param productCategoryId
 * @param group
 * @param orders
 * @param names
 * @returns {Promise<unknown>}
 */
export function updateParameter({ id, productCategoryId, group, orders, names }) {
  const url = '/parameter/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: {
      id: id,
      productCategoryId: productCategoryId,
      group: group,
      orders: orders,
      names: names
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品参数
 * @param id
 * @returns {Promise<unknown>}
 */
export function getParameter(id) {
  const url = `/parameter/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品参数列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getParameterList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/parameter'

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
