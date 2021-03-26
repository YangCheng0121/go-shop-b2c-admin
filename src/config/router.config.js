// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
    {
      path: '/',
      name: 'Index',
      component: BasicLayout,
      meta: { title: '首页' },
      redirect: '/dashboard',
      children: [
        // IndexGroup
        {
          path: '/dashboard',
          name: 'IndexGroup',
          redirect: '/dashboard/index',
          component: RouteView,
          meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse },
          hidden: true,
          children: [
            {
              path: '/dashboard/index',
              name: 'Dashboard',
              component: () => import('@/views/dashboard/Dashboard')
            }
          ]
        },
        // 商品管理
        {
          path: '/product',
          name: 'productGroup',
          component: RouteView,
          redirect: '/product/list',
          meta: {
            title: '商品管理',
            icon: 'appstore',
            permission: ['adminProduct', 'adminStock', 'adminProductCategory', 'adminProductTag', 'adminParameterGroup', 'adminAttribute', 'adminSpecification', 'adminBrand', 'adminProductNotify']
          },
          children: [
            // ProductList
            {
              path: '/product/list',
              name: 'adminProduct',
              component: PageView,
              meta: { title: '商品管理', permission: ['adminProduct'] },
              redirect: '/product/list/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/list/index',
                  name: 'ProductList',
                  component: () => import('@/views/product/list/Index'),
                  meta: { title: '列表', permission: ['adminProduct'] }
                },
                {
                  path: '/product/add',
                  name: 'ProductAdd',
                  component: () => import('@/views/product/list/Add'),
                  meta: { title: '添加商品', permission: ['adminProduct'] }
                },
                {
                  path: '/product/edit/:sn',
                  name: 'ProductEdit',
                  component: () => import('@/views/product/list/Edit'),
                  meta: { title: '编辑商品', permission: ['adminProduct'] }
                }
              ]
            },
            // Stock
            {
              path: '/product/stock',
              name: 'Stock',
              component: PageView,
              meta: { title: '库存管理', permission: ['adminStock'] },
              redirect: '/product/stock/log',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/stock/log',
                  name: 'StockLog',
                  component: () => import('@/views/product/stock/Index'),
                  meta: { title: '库存记录', permission: ['adminStock'] }
                },
                {
                  path: '/product/stock/in',
                  name: 'InStock',
                  component: () => import('@/views/product/stock/InStock'),
                  meta: { title: '入库', permission: ['adminStock'] }
                },
                {
                  path: '/product/stock/out',
                  name: 'OutStock',
                  component: () => import('@/views/product/stock/OutStock'),
                  meta: { title: '出库', permission: ['adminStock'] }
                }
              ]
            },
            // ProductCategory
            {
              path: '/product/category',
              name: 'ProductCategory',
              component: PageView,
              meta: { title: '商品分类', permission: ['adminProductCategory'] },
              redirect: '/product/category/list',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/category/list',
                  name: 'ProductCategoryList',
                  component: () => import('@/views/product/category/Index'),
                  meta: { title: '列表', permission: ['adminProductCategory'] }
                },
                {
                  path: '/product/category/add',
                  name: 'ProductCategoryAdd',
                  component: () => import('@/views/product/category/Add'),
                  meta: { title: '添加分类', permission: ['adminProductCategory'] }
                },
                {
                  path: '/product/category/edit/:id',
                  name: 'ProductCategoryEdit',
                  component: () => import('@/views/product/category/Edit'),
                  meta: { title: '编辑分类', permission: ['adminProductCategory'] }
                }
              ]
            },
            // ProductTag
            {
              path: '/product/tag',
              name: 'ProductTag',
              component: PageView,
              meta: { title: '商品标签', permission: ['adminProductTag'] },
              redirect: '/product/tag/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/tag/index',
                  name: 'ProductTagIndex',
                  component: () => import('@/views/product/tag/Index'),
                  meta: { title: '列表', permission: ['adminProductTag'] }
                },
                {
                  path: '/product/tag/add',
                  name: 'ProductTagAdd',
                  component: () => import('@/views/product/tag/Add'),
                  meta: { title: '添加标签', permission: ['adminProductTag'] }
                },
                {
                  path: '/product/tag/edit/:id',
                  name: 'ProductTagEdit',
                  component: () => import('@/views/product/tag/Edit'),
                  meta: { title: '编辑标签', permission: ['adminProductTag'] }
                }
              ]
            },
            // ProductParameter
            {
              path: '/product/parameter',
              name: 'ProductParameter',
              component: PageView,
              meta: { title: '商品参数', permission: ['adminParameterGroup'] },
              redirect: '/product/parameter/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/parameter/index',
                  name: 'ProductParameterIndex',
                  component: () => import('@/views/product/parameter/Index'),
                  meta: { title: '列表', permission: ['adminParameterGroup'] }
                },
                {
                  path: '/product/parameter/add',
                  name: 'ProductParameterAdd',
                  component: () => import('@/views/product/parameter/Add'),
                  meta: { title: '添加参数', permission: ['adminParameterGroup'] }
                },
                {
                  path: '/product/parameter/edit/:id',
                  name: 'ProductParameterEdit',
                  component: () => import('@/views/product/parameter/Edit'),
                  meta: { title: '编辑参数', permission: ['adminParameterGroup'] }
                }
              ]
            },
            // ProductAttribute
            {
              path: '/product/attribute',
              name: 'ProductAttribute',
              component: PageView,
              meta: { title: '商品属性', permission: ['adminAttribute'] },
              redirect: '/product/attribute/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/attribute/index',
                  name: 'ProductAttributeIndex',
                  component: () => import('@/views/product/attribute/Index'),
                  meta: { title: '列表', permission: ['adminAttribute'] }
                },
                {
                  path: '/product/attribute/add',
                  name: 'ProductAttributeAdd',
                  component: () => import('@/views/product/attribute/Add'),
                  meta: { title: '添加商品', permission: ['adminAttribute'] }
                },
                {
                  path: '/product/attribute/edit/:id',
                  name: 'ProductAttributeEdit',
                  component: () => import('@/views/product/attribute/Edit'),
                  meta: { title: '编辑商品', permission: ['adminAttribute'] }
                }
              ]
            },
            // ProductSpecification
            {
              path: '/product/specification',
              name: 'ProductSpecification',
              component: PageView,
              meta: { title: '规格管理', permission: ['adminSpecification'] },
              redirect: '/product/specification/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/specification/index',
                  name: 'ProductSpecificationIndex',
                  component: () => import('@/views/product/specification/Index'),
                  meta: { title: '列表', permission: ['adminSpecification'] }
                },
                {
                  path: '/product/specification/add',
                  name: 'ProductSpecificationAdd',
                  component: () => import('@/views/product/specification/Add'),
                  meta: { title: '添加规格', permission: ['adminSpecification'] }
                },
                {
                  path: '/product/specification/edit/:id',
                  name: 'ProductSpecificationEdit',
                  component: () => import('@/views/product/specification/Edit'),
                  meta: { title: '编辑规格', permission: ['adminSpecification'] }
                }
              ]
            },
            // ProductBrand
            {
              path: '/product/brand',
              name: 'ProductBrand',
              component: PageView,
              meta: { title: '品牌管理', permission: ['adminBrand'] },
              redirect: '/product/brand/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/product/brand/index',
                  name: 'ProductBrandIndex',
                  component: () => import('@/views/product/brand/Index'),
                  meta: { title: '列表', permission: ['adminBrand'] }
                },
                {
                  path: '/product/brand/add',
                  name: 'ProductBrandAdd',
                  component: () => import('@/views/product/brand/Add'),
                  meta: { title: '添加品牌', permission: ['adminBrand'] }
                },
                {
                  path: '/product/brand/edit/:id',
                  name: 'ProductBrandEdit',
                  component: () => import('@/views/product/brand/Edit'),
                  meta: { title: '编辑品牌', permission: ['adminBrand'] }
                }
              ]
            },
            // ProductNotify
            {
              path: '/product/notify',
              name: 'ProductNotify',
              component: () => import('@/views/product/notify/notify'),
              meta: { title: '到货通知', permission: ['adminProductNotify'] }
            }
          ]
        },

        // 订单管理
        {
          path: '/order',
          name: 'OrderGroup',
          component: RouteView,
          redirect: '/order/list',
          meta: {
            title: '订单管理',
            icon: 'unordered-list',
            permission: ['adminOrder', 'adminPayment', 'adminRefunds', 'adminShipping', 'adminReturns', 'adminDeliveryCenter']
          },
          children: [
            // Order
            {
              path: '/order/list',
              name: 'OrderList',
              component: PageView,
              meta: { title: '订单管理', permission: ['adminOrder'] },
              redirect: '/order/list/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/list/index',
                  component: () => import('@/views/order/list/Index'),
                  meta: { title: '列表', permission: ['adminOrder'] }
                },
                {
                  path: '/order/look/:sn',
                  name: 'OrderLook',
                  component: () => import('@/views/order/list/Look'),
                  meta: { title: '查看订单', permission: ['adminOrder'] }
                },
                {
                  path: '/order/edit/:sn',
                  name: 'OrderEdit',
                  component: () => import('@/views/order/list/Edit'),
                  meta: { title: '编辑订单', permission: ['adminOrder'] }
                }
              ]
            },
            // Payment
            {
              path: '/order/payment',
              name: 'PaymentList',
              component: PageView,
              meta: { title: '订单支付', permission: ['adminPayment'] },
              redirect: '/order/payment/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/payment/index',
                  component: () => import('@/views/order/payment/Index'),
                  meta: { title: '列表', permission: ['adminPayment'] }
                },
                {
                  path: '/order/payment/look/:sn',
                  name: 'PaymentLook',
                  component: () => import('@/views/order/payment/Look'),
                  meta: { title: '查看订单支付', permission: ['adminPayment'] }
                }
              ]
            },
            // Refund
            {
              path: '/order/refunds',
              name: 'RefundList',
              component: PageView,
              meta: { title: '订单退款', permission: ['adminRefunds'] },
              redirect: '/order/refunds/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/refunds/index',
                  component: () => import('@/views/order/refunds/Index'),
                  meta: { title: '列表', permission: ['adminRefunds'] }
                },
                {
                  path: '/order/refunds/look/:sn',
                  name: 'RefundsLook',
                  component: () => import('@/views/order/refunds/Look'),
                  meta: { title: '查看订单退款', permission: ['adminRefunds'] }
                }
              ]
            },
            // Shipping
            {
              path: '/order/shipping',
              name: 'ShippingList',
              component: PageView,
              meta: { title: '订单发货', permission: ['adminShipping'] },
              redirect: '/order/shipping/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/shipping/index',
                  component: () => import('@/views/order/shipping/Index'),
                  meta: { title: '列表', permission: ['adminShipping'] }
                },
                {
                  path: '/order/ship/look/:sn',
                  name: 'ShippingLook',
                  component: () => import('@/views/order/shipping/Look'),
                  meta: { title: '查看订单发货', permission: ['adminShipping'] }
                }
              ]
            },
            // Returns
            {
              path: '/order/returns',
              name: 'ReturnsList',
              component: PageView,
              meta: { title: '订单退货', permission: ['adminReturns'] },
              redirect: '/order/returns/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/returns/index',
                  component: () => import('@/views/order/returns/Index'),
                  meta: { title: '列表', permission: ['adminReturns'] }
                },
                {
                  path: '/order/returns/look/:sn',
                  name: 'ReturnsLook',
                  component: () => import('@/views/order/returns/Look'),
                  meta: { title: '查看订单退货', permission: ['adminReturns'] }
                }
              ]
            },
            // DeliveryCenter
            {
              path: '/order/delivery_center',
              name: 'DeliveryCenterList',
              component: PageView,
              meta: { title: '发货点管理', permission: ['adminDeliveryCenter'] },
              redirect: '/order/delivery_center/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/order/delivery_center/index',
                  component: () => import('@/views/order/delivery_center/Index'),
                  meta: { title: '列表', permission: ['adminDeliveryCenter'] }
                },
                {
                  path: '/order/delivery_center/add',
                  name: 'DeliveryCenterAdd',
                  component: () => import('@/views/order/delivery_center/Add'),
                  meta: { title: '添加发货点', permission: ['adminDeliveryCenter'] }
                },
                {
                  path: '/order/delivery_center/edit/:id',
                  name: 'DeliveryCenterEdit',
                  component: () => import('@/views/order/delivery_center/Edit'),
                  meta: { title: '编辑发货点', permission: ['adminDeliveryCenter'] }
                }
              ]
            }
          ]
        },

        // 营销管理
        {
          path: '/marketing',
          name: 'MarketingGroup',
          component: RouteView,
          redirect: '/marketing/promotion',
          meta: { title: '营销管理', icon: 'form', permission: ['adminPromotion', 'adminCoupon'] },
          children: [
            // Promotion
            {
              path: '/marketing/promotion',
              name: 'PromotionList',
              component: PageView,
              meta: { title: '促销管理', permission: ['adminPromotion'] },
              redirect: '/marketing/promotion/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/marketing/promotion/index',
                  component: () => import('@/views/marketing/promotion/Index'),
                  meta: { title: '列表', permission: ['adminPromotion'] }
                },
                {
                  path: '/marketing/promotion/add',
                  name: 'PromotionAdd',
                  component: () => import('@/views/marketing/promotion/Add'),
                  meta: { title: '添加促销', permission: ['adminPromotion'] }
                },
                {
                  path: '/marketing/promotion/edit/:id',
                  name: 'PromotionEdit',
                  component: () => import('@/views/marketing/promotion/Edit'),
                  meta: { title: '编辑促销', permission: ['adminPromotion'] }
                }
              ]
            },
            // Coupon
            {
              path: '/marketing/coupon',
              name: 'CouponList',
              component: PageView,
              meta: { title: '优惠券管理', permission: ['adminCoupon'] },
              redirect: '/marketing/coupon/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/marketing/coupon/index',
                  component: () => import('@/views/marketing/coupon/Index'),
                  meta: { title: '列表', permission: ['adminCoupon'] }
                },
                {
                  path: '/marketing/coupon/add',
                  name: 'CouponAdd',
                  component: () => import('@/views/marketing/coupon/Add'),
                  meta: { title: '添加优惠券', permission: ['adminCoupon'] }
                },
                {
                  path: '/marketing/coupon/edit/:id',
                  name: 'CouponEdit',
                  component: () => import('@/views/marketing/coupon/Edit'),
                  meta: { title: '编辑优惠券', permission: ['adminCoupon'] }
                },
                {
                  path: '/marketing/coupon/code/:id',
                  name: 'CouponCode',
                  component: () => import('@/views/marketing/coupon/Code'),
                  meta: { title: '生成优惠码', permission: ['adminCoupon'] }
                }
              ]
            }
          ]
        },

        // 会员管理
        {
          path: '/member',
          name: 'MemberGroup',
          component: RouteView,
          redirect: '/member/rank',
          meta: {
            title: '会员管理',
            icon: 'user',
            permission: ['adminMember', 'adminMemberRank', 'adminPoint', 'adminDeposit', 'adminReview', 'adminConsultation', 'adminMessageConfig']
          },
          children: [
            // List
            {
              path: '/member/list',
              name: 'MemberList',
              component: PageView,
              meta: { title: '会员管理', permission: ['adminMember'] },
              redirect: '/member/list/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/list/index',
                  component: () => import('@/views/member/list/Index'),
                  meta: { title: '列表', permission: ['adminMember'] }
                },
                {
                  path: '/member/list/add',
                  name: 'MemberAdd',
                  component: () => import('@/views/member/list/Add'),
                  meta: { title: '添加会员', permission: ['adminMember'] }
                },
                {
                  path: '/member/list/edit/:id',
                  name: 'MemberEdit',
                  component: () => import('@/views/member/list/Edit'),
                  meta: { title: '编辑会员', permission: ['adminMember'] }
                }
              ]
            },
            // Rank
            {
              path: '/member/rank',
              name: 'rRankList',
              component: PageView,
              meta: { title: '会员等级', permission: ['adminMemberRank'] },
              redirect: '/member/rank/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/rank/index',
                  component: () => import('@/views/member/rank/Index'),
                  meta: { title: '列表', permission: ['adminMemberRank'] }
                },
                {
                  path: '/member/rank/add',
                  name: 'RankAdd',
                  component: () => import('@/views/member/rank/Add'),
                  meta: { title: '添加会员等级', permission: ['adminMemberRank'] }
                },
                {
                  path: '/member/rank/edit/:id',
                  name: 'RankEdit',
                  component: () => import('@/views/member/rank/Edit'),
                  meta: { title: '编辑会员等级', permission: ['adminMemberRank'] }
                }
              ]
            },
            // PointLog
            {
              path: '/member/point',
              name: 'MPointList',
              component: PageView,
              meta: { title: '积分管理', permission: ['adminPoint'] },
              redirect: '/member/point/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/point/index',
                  component: () => import('@/views/member/point_log/Index'),
                  meta: { title: '列表', permission: ['adminPoint'] }
                },
                {
                  path: '/member/point/add',
                  name: 'PointAdd',
                  component: () => import('@/views/member/point_log/Add'),
                  meta: { title: '积分调整', permission: ['adminPoint'] }
                }
              ]
            },
            // DepositLog
            {
              path: '/member/deposit_log',
              name: 'DepositLogList',
              component: PageView,
              meta: { title: '预存款', permission: ['adminDeposit'] },
              redirect: '/member/deposit_log/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/deposit_log/index',
                  component: () => import('@/views/member/deposit_log/Index'),
                  meta: { title: '列表', permission: ['adminDeposit'] }
                },
                {
                  path: '/member/deposit_log/add',
                  name: 'DepositLogAdd',
                  component: () => import('@/views/member/deposit_log/Add'),
                  meta: { title: '预存款调整', permission: ['adminDeposit'] }
                }
              ]
            },
            // Review
            {
              path: '/member/review',
              name: 'ReviewList',
              component: PageView,
              meta: { title: '评论管理', permission: ['adminReview'] },
              redirect: '/member/review/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/review/index',
                  component: () => import('@/views/member/review/Index'),
                  meta: { title: '列表', permission: ['adminReview'] }
                },
                {
                  path: '/member/review/edit/:id',
                  name: 'ReviewEdit',
                  component: () => import('@/views/member/review/Edit'),
                  meta: { title: '编辑评论', permission: ['adminReview'] }
                }
              ]
            },
            // Consultation
            {
              path: '/member/consultation',
              name: 'ConsultationList',
              component: PageView,
              meta: { title: '咨询管理', permission: ['adminConsultation'] },
              redirect: '/member/consultation/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/consultation/index',
                  component: () => import('@/views/member/consultation/Index'),
                  meta: { title: '列表', permission: ['adminConsultation'] }
                },
                {
                  path: '/member/consultation/edit/:id',
                  name: 'ConsultationEdit',
                  component: () => import('@/views/member/consultation/Edit'),
                  meta: { title: '编辑咨询', permission: ['adminConsultation'] }
                },
                {
                  path: '/member/consultation/reply/:id',
                  name: 'ConsultationReply',
                  component: () => import('@/views/member/consultation/Reply'),
                  meta: { title: '回复咨询', permission: ['adminConsultation'] }
                }
              ]
            },
            // MessageConfig
            {
              path: '/member/message_config',
              name: 'MessageConfigList',
              component: PageView,
              meta: { title: '消息配置', permission: ['adminMessageConfig'] },
              redirect: '/member/message_config/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/member/message_config/index',
                  component: () => import('@/views/member/message_config/Index'),
                  meta: { title: '列表', permission: ['adminMessageConfig'] }
                },
                {
                  path: '/member/message_config/edit/:id',
                  name: 'MessageConfigEdit',
                  component: () => import('@/views/member/message_config/Edit'),
                  meta: { title: '编辑消息配置', permission: ['adminMessageConfig'] }
                }
              ]
            }
          ]
        },

        // 内容管理
        {
          path: '/content',
          name: 'ContentGroup',
          component: RouteView,
          redirect: '/content/list',
          meta: { title: '内容管理', icon: 'hdd', permission: ['adminAd'] },
          children: [
            // Ad
            {
              path: '/content/ad',
              name: 'Ad',
              component: PageView,
              meta: { title: '广告管理', permission: ['adminAd'] },
              redirect: '/content/ad/index',
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/content/ad/index',
                  component: () => import('@/views/content/ad/Index'),
                  meta: { title: '列表', permission: ['adminAd'] }
                },
                {
                  path: '/content/list/add',
                  name: 'AdAdd',
                  component: () => import('@/views/content/ad/Add'),
                  meta: { title: '添加广告', permission: ['adminAd'] }
                },
                {
                  path: '/content/list/edit/:id',
                  name: 'AdEdit',
                  component: () => import('@/views/content/ad/Edit'),
                  meta: { title: '编辑广告', permission: ['adminAd'] }
                }
              ]
            }
          ]
        },

        // 系统
        {
          path: '/system',
          name: 'SystemGroup',
          component: RouteView,
          redirect: '/system/setting',
          meta: {
            title: '系统设置',
            icon: 'setting',
            permission: ['adminSetting', 'adminArea', 'adminPaymentMethod', 'adminShippingMethod', 'adminDeliveryCorp', 'adminPaymentPlugin', 'adminStoragePlugin', 'adminLoginPlugin', 'adminAdmin', 'adminRole']
          },
          children: [
            // 系统设置
            {
              path: '/system/setting',
              name: 'SystemSetting',
              component: () => import('@/views/system/setting/Index'),
              meta: { title: '系统设置', permission: ['adminSetting'] }
            },
            // 地区管理
            {
              path: '/system/area',
              name: 'Area',
              redirect: '/system/area/index',
              component: PageView,
              meta: { title: '地区管理', permission: ['adminArea'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/area/index',
                  name: 'AreaList',
                  component: () => import('@/views/system/area/Index'),
                  meta: { title: '地区列表', permission: ['adminArea'] }
                },
                {
                  path: '/system/area/children/:id',
                  name: 'AreaChildren',
                  component: () => import('@/views/system/area/AreaChildren'),
                  meta: { title: '地区列表', permission: ['adminArea'] }
                },
                {
                  path: '/system/area/add',
                  name: 'AreaAdd',
                  component: () => import('@/views/system/area/Add'),
                  meta: { title: '添加地区', permission: ['adminArea'] }
                },
                {
                  path: '/system/area/edit',
                  name: 'AreaEdit',
                  component: () => import('@/views/system/area/Edit'),
                  meta: { title: '编辑地区', permission: ['adminArea'] }
                }
              ]
            },
            // 支付方式
            {
              path: '/system/payment_method',
              name: 'PaymentMethod',
              redirect: '/system/payment_method/index',
              component: PageView,
              meta: { title: '支付方式', permission: ['adminPaymentMethod'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/payment_method/index',
                  name: 'PaymentMethodList',
                  component: () => import('@/views/system/payment_method/Index'),
                  meta: { title: '列表', permission: ['adminPaymentMethod'] }
                },
                {
                  path: '/system/payment_method/add',
                  name: 'PaymentMethodAdd',
                  component: () => import('@/views/system/payment_method/Add'),
                  meta: { title: '添加支付方式', permission: ['adminPaymentMethod'] }
                },
                {
                  path: '/system/payment_method/edit/:id',
                  name: 'PaymentMethodEdit',
                  component: () => import('@/views/system/payment_method/Edit'),
                  meta: { title: '编辑支付方式', permission: ['adminPaymentMethod'] }
                }
              ]
            },
            // 配送方式
            {
              path: '/system/shipping_method',
              name: 'ShippingMethod',
              redirect: '/system/shipping_method/index',
              component: PageView,
              meta: { title: '配送方式', permission: ['adminShippingMethod'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/shipping_method/index',
                  name: 'ShippingMethodList',
                  component: () => import('@/views/system/shipping_method/Index'),
                  meta: { title: '列表', permission: ['adminShippingMethod'] }
                },
                {
                  path: '/system/shipping_method/add',
                  name: 'ShippingMethodAdd',
                  component: () => import('@/views/system/shipping_method/Add'),
                  meta: { title: '添加配送方式', permission: ['adminShippingMethod'] }
                },
                {
                  path: '/system/shipping_method/edit/:id',
                  name: 'ShippingMethodEdit',
                  component: () => import('@/views/system/shipping_method/Edit'),
                  meta: { title: '编辑配送方式', permission: ['adminShippingMethod'] }
                },
                {
                  path: '/system/area_freight_config/list',
                  name: 'AreaFreightConfig',
                  component: () => import('@/views/system/shipping_method/area_freight_config/Index'),
                  meta: { title: '运费配置列表', permission: ['adminShippingMethod'] }
                },
                {
                  path: '/system/area_freight_config/add',
                  name: 'AreaFreightConfigAdd',
                  component: () => import('@/views/system/shipping_method/area_freight_config/Add'),
                  meta: { title: '添加运费配置', permission: ['adminShippingMethod'] }
                },
                {
                  path: '/system/area_freight_config/edit/:id',
                  name: 'AreaFreightConfigEdit',
                  component: () => import('@/views/system/shipping_method/area_freight_config/Edit'),
                  meta: { title: '编辑运费配置', permission: ['adminShippingMethod'] }
                }
              ]
            },
            // 物流公司
            {
              path: '/system/delivery_corp',
              name: 'DeliveryCorp',
              redirect: '/system/delivery_corp/index',
              component: PageView,
              meta: { title: '物流公司', permission: ['adminDeliveryCorp'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/delivery_corp/index',
                  name: 'DeliveryCorpList',
                  component: () => import('@/views/system/delivery_corp/Index'),
                  meta: { title: '列表', permission: ['adminDeliveryCorp'] }
                },
                {
                  path: '/system/delivery_corp/add',
                  name: 'DeliveryCorpAdd',
                  component: () => import('@/views/system/delivery_corp/Add'),
                  meta: { title: '添加物流公司', permission: ['adminDeliveryCorp'] }
                },
                {
                  path: '/system/delivery_corp/edit/:id',
                  name: 'DeliveryCorpEdit',
                  component: () => import('@/views/system/delivery_corp/Edit'),
                  meta: { title: '编辑物流公司', permission: ['adminDeliveryCorp'] }
                }
              ]
            },
            // 支付插件
            {
              path: '/system/payment_plugin',
              name: 'PaymentPlugin',
              redirect: '/system/payment_plugin/index',
              component: PageView,
              meta: { title: '支付插件', permission: ['adminPaymentPlugin'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/payment_plugin/index',
                  name: 'PaymentPluginList',
                  component: () => import('@/views/system/payment_plugin/Index'),
                  meta: { title: '列表', permission: ['adminPaymentPlugin'] }
                },
                {
                  path: '/system/payment_plugin/edit/:id',
                  name: 'PaymentPluginEdit',
                  component: () => import('@/views/system/payment_plugin/Edit'),
                  meta: { title: '设置支付插件', permission: ['adminPaymentPlugin'] }
                }
              ]
            },
            // 存储插件
            {
              path: '/system/storage_plugin',
              name: 'StoragePlugin',
              redirect: '/system/storage_plugin/index',
              component: PageView,
              meta: { title: '存储插件', permission: ['adminStoragePlugin'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/storage_plugin/index',
                  name: 'StoragePluginList',
                  component: () => import('@/views/system/storage_plugin/Index'),
                  meta: { title: '列表', permission: ['adminStoragePlugin'] }
                },
                {
                  path: '/system/storage_plugin/edit/:id',
                  name: 'StoragePluginEdit',
                  component: () => import('@/views/system/storage_plugin/Edit'),
                  meta: { title: '设置存储插件', permission: ['adminStoragePlugin'] }
                }
              ]
            },
            // 登录插件
            {
              path: '/system/login_plugin',
              name: 'LoginPlugin',
              redirect: '/system/login_plugin/index',
              component: PageView,
              meta: { title: '登录插件', permission: ['adminLoginPlugin'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/login_plugin/index',
                  name: 'LoginPluginList',
                  component: () => import('@/views/system/login_plugin/Index'),
                  meta: { title: '列表', permission: ['adminLoginPlugin'] }
                },
                {
                  path: '/system/login_plugin/edit/:id',
                  name: 'LoginPluginEdit',
                  component: () => import('@/views/system/login_plugin/Edit'),
                  meta: { title: '设置登录插件', permission: ['adminLoginPlugin'] }
                }
              ]
            },
            // 管理员
            {
              path: '/system/admin',
              name: 'Admin',
              redirect: '/system/admin/index',
              component: PageView,
              meta: { title: '管理员', permission: ['adminAdmin'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/admin/index',
                  name: 'AdminList',
                  component: () => import('@/views/system/admin/Index'),
                  meta: { title: '列表', permission: ['adminAdmin'] }
                },
                {
                  path: '/system/admin/add',
                  name: 'AdminAdd',
                  component: () => import('@/views/system/admin/Add'),
                  meta: { title: '添加管理员', permission: ['adminAdmin'] }
                },
                {
                  path: '/system/admin/edit/:id',
                  name: 'AdminEdit',
                  component: () => import('@/views/system/admin/Edit'),
                  meta: { title: '编辑管理员', permission: ['adminAdmin'] }
                }
              ]
            },
            // 角色管理
            {
              path: '/system/role',
              name: 'Role',
              redirect: '/system/role/index',
              component: PageView,
              meta: { title: '角色管理', permission: ['adminRole'] },
              hideChildrenInMenu: true,
              children: [
                {
                  path: '/system/role/index',
                  name: 'RoleList',
                  component: () => import('@/views/system/role/Index'),
                  meta: { title: '列表', permission: ['adminRole'] }
                },
                {
                  path: '/system/role/add',
                  name: 'RoleAdd',
                  component: () => import('@/views/system/role/Add'),
                  meta: { title: '添加角色', permission: ['adminRole'] }
                },
                {
                  path: '/system/role/edit/:id',
                  name: 'RoleEdit',
                  component: () => import('@/views/system/role/Edit'),
                  meta: { title: '编辑角色', permission: ['adminRole'] }
                }
              ]
            }
          ]
        }

      ]
    },
    {
      path: '*', redirect: '/404', hidden: true
    }
  ]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
