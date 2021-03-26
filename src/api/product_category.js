import axios, { HEADERS } from '@/api/config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 新增商品分类
 * @param name
 * @param parentId
 * @param orders
 * @param attrs
 * @param isTop
 * @returns {Promise<unknown>}
 */
export function addProductCategory({ name, parentId, orders, promotions, image }, attrs) {
  const url = '/product_category/add'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      name: name,
      parentId: parentId,
      orders: orders,
      promotions: promotions,
      isTop: attrs.is_top,
      isMarketable: attrs.is_marketable,
      isShow: attrs.is_show,
      image: image
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteProductCategory(id) {
  const url = '/product_category/delete'

  return axios({
    url: url,
    method: 'DELETE',
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 更新商品分类
 * @param id
 * @param name
 * @param parentId
 * @param orders
 * @param promotions
 * @param image
 * @param attrs
 * @returns {Promise<unknown>}
 */
export function updateProductCategory({ id, name, parentId, orders, promotions, image }, attrs) {
  const url = '/product_category/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      id: id,
      name: name,
      parentId: parentId,
      orders: orders,
      promotions: promotions,
      isTop: attrs.is_top,
      isMarketable: attrs.is_marketable,
      isShow: attrs.is_show,
      image: image
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品分类
 * @param id
 * @returns {Promise<unknown>}
 */
export function getProductCategory(id) {
  const url = `/product_category/${id}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商品分类
 * @returns {Promise<unknown>}
 * @param query
 * @param sortBy
 * @param order
 */
export function getProductCategoryList({ query, sortBy, order }) {
  const url = '/product_category'

  return axios({
    url: url,
    method: 'GET',
    params: {
      query: getObjectKeyValueToString(query),
      sortby: sortBy,
      order: order
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
