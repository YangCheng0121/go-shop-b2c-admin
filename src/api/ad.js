import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加广告位
 * @param ad
 * @returns {*}
 */
export function addAd(ad) {
  const url = '/ad/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      ad: ad
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除广告位
 * @returns {*}
 */
export function deleteAd(ids) {
  const url = '/ad/delete'

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
 * 更新广告位
 * @param ad
 * @returns {*}
 */
export function updateAd(ad) {
  const url = '/ad/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      ad: ad
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取广告位
 */
export function getAd(id) {
  const url = `/ad/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取广告位置列表
 * @returns {Promise<*>}
 */
export function getAdPositionList() {
  const url = '/ad/ad_position'

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取广告位列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getAdList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/ad'

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
