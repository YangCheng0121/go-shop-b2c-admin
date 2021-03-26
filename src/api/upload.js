import axios, { HEADERS } from './config'

/**
 * 上传图片
 * @returns {Promise<never>}
 * @param file
 */
export function uploadImage(file) {
  const url = '/upload'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.FromData),
    data: file
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
