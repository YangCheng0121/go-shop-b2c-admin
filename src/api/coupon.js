import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加优惠券
 * @param coupon
 * @returns {*}
 */
export function addCoupon(coupon) {
  const url = '/coupon/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      coupon: coupon
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除优惠券
 * @returns {*}
 */
export function deleteCoupon(ids) {
  const url = '/coupon/delete'

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
 * 更新优惠券
 * @param coupon
 * @returns {*}
 */
export function updateCoupon(coupon) {
  const url = '/coupon/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      coupon: coupon
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取优惠券
 */
export function getCoupon(id) {
  const url = `/coupon/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取优惠券数量
 * @param query
 */
export function getCouponCount(query) {
  const url = '/coupon/count'

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
 * 生成优惠码
 * @param coupon
 * @param quantity
 * @returns {*}
 */
export function generateCouponCode(coupon, quantity) {
  const url = '/coupon/code/generate'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      coupon: coupon,
      quantity: quantity
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取优惠码数量
 * @param query
 */
export function getCouponCodeCount(query) {
  const url = '/coupon/code/count'

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
 * 获取优惠券列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getCouponList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/coupon'

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
