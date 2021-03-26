import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加品牌
 * @param name
 * @param logo
 * @param brandUrl
 * @param type
 * @param orders
 * @param introduction
 * @returns {*}
 */
export function addBrand({ name, logo, brandUrl, type, orders, introduction }) {
  const url = '/brand/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      name: name,
      url: brandUrl,
      type: type,
      logo: logo,
      orders: orders,
      introduction: introduction
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除品牌
 * @param ids
 * @returns {*}
 */
export function deleteBrand(ids) {
  const url = '/brand/delete'

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
 * 更新品牌
 * @param id
 * @param name
 * @param type
 * @param logo
 * @param brandUrl
 * @param orders
 * @param introduction
 * @returns {*}
 */
export function updateBrand({ id, name, logo, brandUrl, type, orders, introduction }) {
  const url = '/brand/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: {
      id: id,
      name: name,
      url: brandUrl,
      type: type,
      logo: logo,
      orders: orders,
      introduction: introduction
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取品牌
 * @param id
 * @returns {Promise<unknown>}
 */
export function getBrand(id) {
  const url = `/brand/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取品牌数量
 * @returns {*}
 */
export function getBrandCount(query) {
  const url = '/brand/count'

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
 * 获取品牌
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {*}
 */
export function getBrandList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/brand'

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
