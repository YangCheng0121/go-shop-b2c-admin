import axios from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 获取权限列表
 * @param query
 * @param sortby
 * @param order
 * @returns {Promise<unknown>}
 */
export function getPermissionList({ query, sortby, order }) {
  const url = '/permission'

  return axios({
    url: url,
    method: 'GET',
    params: {
      query: getObjectKeyValueToString(query),
      sortby: sortby,
      order: order
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
