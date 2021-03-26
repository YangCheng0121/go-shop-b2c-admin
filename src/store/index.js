import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

import asyncRouter from './modules/async-router'

import permission from './modules/permission'
import product from './modules/product'
import productCategory from './modules/product_category'
import promotion from './modules/promotion'
import brand from './modules/brand'
import tag from './modules/tag'
import setting from './modules/setting'
import parameter from './modules/parameter'
import attribute from './modules/attribute'
import specification from './modules/specification'
import sku from './modules/sku'
import order from './modules/order'
import area from './modules/area'
import user from './modules/user'
import deliveryCorp from './modules/delivery_corp'
import shippingMethod from './modules/shipping_method'
import upload from './modules/upload'
import role from './modules/role'
import paymentMethod from './modules/payment_method'
import memberRank from './modules/member_rank'
import member from './modules/member'
import coupon from './modules/coupon'
import ad from './modules/ad'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    asyncRouter,
    permission,
    product,
    productCategory,
    promotion,
    brand,
    tag,
    setting,
    parameter,
    attribute,
    specification,
    sku,
    order,
    area,
    user,
    deliveryCorp,
    shippingMethod,
    paymentMethod,
    upload,
    role,
    memberRank,
    member,
    coupon,
    ad
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
