const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  userInfo: state => state.user.info,
  addRouters: state => state.asyncRouter.addRouters,
  multiTab: state => state.app.multiTab,
  // 路由是否激活
  isRouterAlive: state => state.app.isRouterAlive,
  // 商品列表
  productPageList: state => state.product.pageList,
  // 赠品
  giftList: state => {
    return state.product.pageList ? state.product.pageList.list : []
  },
  // 商品类型
  productTypes: state => state.product.types,
  // 商品参数
  productParameters: state => state.product.parameters,
  // 商品属性
  productAttributes: state => state.product.attributes,
  // 商品规格
  productSpecifications: state => state.product.specifications,
  // 是否选择规格
  isSelectSpecification: state => state.product.isSelectSpecification,
  // 商品属性列表
  productAttrs: state => state.product.attrs,
  // 促销列表
  promotionPageList: state => state.promotion.pageList,
  // 促销
  promotion: state => state.promotion.promotion,
  // 品牌列表
  brandPageList: state => state.brand.pageList,
  // 标签列表
  tagPageList: state => state.tag.pageList,
  // 商品参数列表
  parameterPageList: state => state.parameter.pageList,
  // 商品属性列表
  attributePageList: state => state.attribute.pageList,
  // 规格管理列表
  specificationPageList: state => state.specification.pageList,
  // SKU sn
  skuSn: state => state.sku.sn,
  // 支付方式列表
  paymentMethods: state => state.paymentMethod.pageList.list,
  // 物流中心列表
  deliveryCorps: state => state.deliveryCorp.pageList.list,
  // 地区
  areas: state => state.area.areas,
  // 当前地区
  currentArea: state => state.area.currentArea,
  // 上级地区
  parentArea: state => state.area.parentArea,
  // 配送方式列表
  shippingMethods: state => state.shippingMethod.pageList.list,
  // 当前配送方式
  currentShippingMethod: state => state.shippingMethod.currentShippingMethod,
  // 权限列表
  permissions: state => state.permission.permissions,
  // 角色列表
  roles: state => state.role.list,
  // 角色
  role: state => state.role.role,
  // 等级会员列表
  memberRankPageList: state => state.memberRank.pageList,
  // 会员
  member: state => state.member.member,
  // 优惠券列表
  couponPageList: state => state.coupon.pageList,
  // 优惠券
  coupon: state => state.coupon.coupon,
  // 广告位置列表
  adPositionList: state => state.ad.adPositionList
}

export default getters
