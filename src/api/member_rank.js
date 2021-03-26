import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 添加会员等级
 * @param memberRank
 * @returns {*}
 */
export function addMemberRank(memberRank) {
  const url = '/member_rank/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      member_rank: memberRank
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除会员等级
 * @returns {*}
 */
export function deleteMemberRank(ids) {
  const url = '/member_rank/delete'

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
 * 更新会员等级
 * @param memberRank
 * @returns {*}
 */
export function updateMemberRank(memberRank) {
  const url = '/member_rank/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      member_rank: memberRank
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取会员等级
 */
export function getMemberRank(id) {
  const url = `/member_rank/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取会员等级数量
 */
export function getMemberRankCount() {
  const url = '/member_rank/count'

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取会员等级列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<*>}
 */
export function getMemberRankList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/member_rank'

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
