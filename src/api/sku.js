import axios from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 获取 SKU
 * @param sn
 * @returns {Promise<unknown>}
 */
export function getSku(sn) {
  const url = `/sku/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取 SKU 列表
 * @param query
 * @returns {*}
 */
export function getSkuList(query) {
  const url = '/sku'

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
