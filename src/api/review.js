import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 删除评论
 * @returns {*}
 */
export function deleteReview(ids) {
  const url = '/review/delete'

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
 * 更新评论
 * @param review
 * @returns {*}
 */
export function updateReview(review) {
  const url = '/review/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      review: review
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 上架、下架评论
 * @returns {Promise<*>}
 */
export function updateReviewsIsShow(reviews) {
  const url = '/review/toggle/is_show'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      reviews: reviews
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取评论
 */
export function getReview(id) {
  const url = `/review/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取评论数量
 */
export function getReviewCount() {
  const url = '/review/count'

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取评论列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getReviewList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/review'

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
