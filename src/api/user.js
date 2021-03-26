import axios, { HEADERS } from './config'

/**
 * 登录
 * @param account
 * @param password
 * @returns {Promise<*>}
 */
export function login({ username, password }) {
  const url = '/user/login'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      username: username,
      password: password
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 注册
 * @param account
 * @param password1
 * @param password2
 * @returns {Promise<*>}
 */
export function register({ username, password1, password2 }) {
  const url = '/user/register'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      account: username,
      password1: password1,
      password2: password2
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
