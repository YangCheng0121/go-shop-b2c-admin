import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加发货点
 * @returns {*}
 * @param deliverCenter
 */
export function addDeliveryCenter(deliverCenter) {
  const url = '/delivery_center/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      delivery_center: deliverCenter
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除发货点
 * @returns {*}
 */
export function deleteDeliveryCenter(ids) {
  const url = '/delivery_center/delete'

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
 * 更新发货点
 * @returns {*}
 * @param deliverCenter
 */
export function updateDeliveryCenter(deliverCenter) {
  const url = '/delivery_center/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      delivery_center: deliverCenter
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取发货点
 * @param id
 * @returns {*}
 */
export function getDeliveryCenter(id) {
  const url = `/delivery_center/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取发货点数量
 * @param query
 * @returns {*}
 */
export function getDeliveryCenterCount(query) {
  const url = '/delivery_center/count'
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
 * 获取发货点
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getDeliveryCenterList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/delivery_center'

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
