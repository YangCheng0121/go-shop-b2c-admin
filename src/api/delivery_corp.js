import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加物流公司
 * @returns {*}
 * @param deliveryCorp
 */
export function addDeliveryCorp(deliveryCorp) {
  const url = '/delivery_corp/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      delivery_corp: deliveryCorp
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除物流公司
 * @returns {*}
 */
export function deleteDeliveryCorp(ids) {
  const url = '/delivery_corp/delete'

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
 * 更新物流公司
 * @returns {*}
 * @param deliveryCorp
 */
export function updateDeliveryCorp(deliveryCorp) {
  const url = '/delivery_corp/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      delivery_corp: deliveryCorp
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取物流公司
 * @param id
 * @returns {*}
 */
export function getDeliveryCorp(id) {
  const url = `/delivery_corp/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取物流公司数量
 * @param query
 * @returns {*}
 */
export function getDeliveryCorpCount(query) {
  const url = '/delivery_corp/count'
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
 * 获取物流公司
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getDeliveryCorpList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/delivery_corp'

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
