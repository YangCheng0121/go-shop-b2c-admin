import axios, { HEADERS } from './config'

/**
 * 更新系统设置
 * @param body
 * @returns {*}
 */
export function updateSetting(body) {
  const url = '/setting/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      body: body
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取系统设置
 * @returns {*}
 */
export function getSettingList() {
  const url = '/setting'

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
