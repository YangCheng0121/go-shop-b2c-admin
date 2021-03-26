const isProd = process.env.NODE_ENV === 'production'

let BASE_URL
let IMAGE_PREFIX
if (isProd) {
  BASE_URL = '' // 生产地址
  IMAGE_PREFIX = '' // 生产地址
} else {
  BASE_URL = 'http://localhost:8888/api/admin'
  IMAGE_PREFIX = 'http://localhost:8888'
}

export {
  BASE_URL,
  IMAGE_PREFIX
}
