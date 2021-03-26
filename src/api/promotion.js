import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加促销
 * @param promotion
 * @returns {*}
 */
export function addPromotion(promotion) {
  const url = '/promotion/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      promotion: promotion
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除促销
 * @returns {*}
 */
export function deletePromotion(ids) {
  const url = '/promotion/delete'

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
 * 更新促销
 * @param promotion
 * @returns {*}
 */
export function updatePromotion(promotion) {
  const url = '/promotion/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      promotion: promotion
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取促销
 */
export function getPromotion(id) {
  const url = `/promotion/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取促销数量
 * @param query
 */
export function getPromotionCount(query) {
  const url = '/promotion/count'

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
 * 获取促销列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getPromotionList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/promotion'

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
