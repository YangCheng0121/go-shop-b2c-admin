import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加规格
 * @param name
 * @param productCategoryId
 * @param orders
 * @param options
 * @returns {*}
 */
export function addSpecification({ name, productCategoryId, orders, options }) {
  const url = '/specification/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      name: name,
      productCategoryId: productCategoryId,
      orders: orders,
      options: options
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除规格
 * @param ids
 * @returns {*}
 */
export function deleteSpecification(ids) {
  const url = '/specification/delete'

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
 * 更新规格
 * @param id
 * @param name
 * @param productCategoryId
 * @param orders
 * @param options
 * @returns {*}
 */
export function updateSpecification({ id, name, productCategoryId, orders, options }) {
  const url = '/specification/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      id: id,
      name: name,
      productCategoryId: productCategoryId,
      orders: orders,
      options: options
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取规格
 * @param id
 * @returns {Promise<unknown>}
 */
export function getSpecification(id) {
  const url = `/specification/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取规格管理列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getSpecificationList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/specification'

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
