/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { deepClone } from '@/utils/util'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, permissions) {
  return routerMap.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions)
      }
      return true
    }
    return false
  })
}

/**
 * 过滤权限值
 */
function filterPermissions(permissions) {
  return permissions.map((item) => {
    return item.value
  })
}

const asyncRouter = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, permissions) {
      return new Promise(resolve => {
        const deepCloneRouterMap = deepClone(asyncRouterMap)
        const accessedRouters = filterAsyncRouter(deepCloneRouterMap, filterPermissions(permissions))
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default asyncRouter
