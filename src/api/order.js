import axios, { HEADERS } from './config'
import { getObjectKeyValueToString } from '@/utils/util'

/**
 * 删除订单
 * @param ids
 * @returns {Promise<*>}
 */
export function deleteOrder(ids) {
  const url = '/order/delete'

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
 * 更新订单
 * @returns {Promise<*>}
 */
export function updateOrder(order) {
  const url = '/order/update'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      order: order
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 审核订单
 * @param sn
 * @param isReview
 * @returns {Promise<*>}
 */
export function reviewOrder({ orderId, isReview }) {
  const url = '/order/review'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      order_id: orderId,
      is_review: isReview
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 订单收款
 * @param orderId
 * @param bank
 * @param account
 * @param amount
 * @param payer
 * @param method
 * @param paymentMethod
 * @param memo
 * @returns {Promise<*>}
 */
export function receivePayment({ orderId, bank, account, amount, payer, method, paymentMethod, memo }) {
  const url = '/order/receive_payment'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      order_id: orderId,
      bank: bank,
      account: account,
      amount: amount,
      payer: payer,
      method: method,
      paymentMethod: paymentMethod,
      memo: memo
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 发货
 * @param orderId
 * @param shippingMethodId
 * @param deliveryCorpId
 * @param trackingNo
 * @param freight
 * @param consignee
 * @param area
 * @param address
 * @param zipCode
 * @param phone
 * @param memo
 * @param shippingItems
 * @returns {*}
 */
export function ship({ orderId, shippingMethodId, deliveryCorpId, trackingNo, freight, consignee, area, address, zipCode, phone, memo, shippingItems }) {
  const url = '/order/ship'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      order_id: orderId,
      shipping_method_id: shippingMethodId,
      delivery_corp_id: deliveryCorpId,
      tracking_no: trackingNo,
      freight: freight,
      consignee: consignee,
      area: area,
      address: address,
      zip_code: zipCode,
      phone: phone,
      memo: memo,
      shipping_items: shippingItems
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 退款
 * @param orderId
 * @param bank
 * @param account
 * @param amount
 * @param payer
 * @param method
 * @param paymentMethod
 * @param memo
 * @returns {*}
 */
export function refundsOrder({ orderId, bank, account, amount, payer, method, paymentMethod, memo }) {
  const url = '/order/refunds'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      order_id: orderId,
      bank: bank,
      account: account,
      amount: amount,
      payer: payer,
      method: method,
      paymentMethod: paymentMethod,
      memo: memo
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 退货
 * @param returns
 * @param returnsItems
 * @returns {*}
 */
export function returnsOrder(returns, returnsItems) {
  const url = '/order/returns'

  return axios({
    url: url,
    method: 'POST',
    headers: Object.assign({}, HEADERS.POST),
    data: {
      returns: returns,
      returns_items: returnsItems
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 失败订单
 * @param orderId
 * @returns {*}
 */
export function failOrder(orderId) {
  const url = '/order/fail'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      order_id: orderId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 完成订单
 * @param orderId
 * @returns {*}
 */
export function completeOrder(orderId) {
  const url = '/order/complete'

  return axios({
    url: url,
    method: 'PUT',
    headers: Object.assign({}, HEADERS.PUT),
    data: {
      order_id: orderId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取订单商品信息
 * @param orderId
 * @returns {Promise<*>}
 */
export function getOrderProducts(orderId) {
  const url = '/order/products'

  return axios({
    url: url,
    method: 'GET',
    params: {
      order_id: orderId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取订单记录
 * @param orderId
 * @returns {Promise<*>}
 */
export function getOrderLogs(orderId) {
  const url = '/order/logs'

  return axios({
    url: url,
    method: 'GET',
    params: {
      order_id: orderId,
      sortby: 'CreationDate',
      order: 'desc'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取订单项
 * @param orderId
 * @returns {*}
 */
export function getOrderItems(orderId) {
  const url = '/order/items'

  return axios({
    url: url,
    method: 'GET',
    params: {
      order_id: orderId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取订单
 * @param sn
 * @returns {Promise<*>}
 */
export function getOrder(sn) {
  const url = `/order/${sn}`

  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取订单列表
 * @param query
 * @param sortby
 * @param order
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<unknown>}
 */
export function getOrderList({ query, sortby, order, pageNumber, pageSize }) {
  const url = '/order'

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
