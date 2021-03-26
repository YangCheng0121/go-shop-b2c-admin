import Vue from 'vue'
import router from './router'
import store from './store'
import { getUser } from '@/cache'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/index'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  /* has cookie */
  if (Vue.$cookies.get('admin_login')) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (!store.getters.role.permissions) {
        const user = getUser()
        if (user) {
          store.dispatch('GetSettingList').then(() => {
            store.dispatch('GetRole', user.roles).then(() => {
              store.dispatch('GenerateRoutes', store.getters.role.permissions).then(() => {
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            })
          })
        } else {
          // 失败时，调用登出，来清空历史保留信息
          store.dispatch('Logout').then(() => {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
          })
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
