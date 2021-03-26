import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加会员
 * @param memberRank
 * @returns {*}
 */
export function addMember(memberRank) {
  const url = '/member/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      member: memberRank
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除会员
 * @returns {*}
 */
export function deleteMember(ids) {
  const url = '/member/delete'

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
 * 更新会员
 * @param memberRank
 * @returns {*}
 */
export function updateMember(memberRank) {
  const url = '/member/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      member: memberRank
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取会员
 */
export function getMember(id) {
  const url = `/member/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取会员列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getMemberList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/member'

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
