import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 删除咨询
 * @returns {*}
 */
export function deleteConsultation(ids) {
  const url = '/consultation/delete'

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
 * 更新咨询
 * @param consultation
 * @returns {*}
 */
export function updateConsultation(consultation) {
  const url = '/consultation/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      consultation: consultation
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 上架、下架咨询
 * @returns {Promise<*>}
 */
export function updateConsultationsIsShow(consultations) {
  const url = '/consultation/toggle/is_show'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      consultations: consultations
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取咨询
 */
export function getConsultation(id) {
  const url = `/consultation/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取咨询列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getConsultationList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/consultation'

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
