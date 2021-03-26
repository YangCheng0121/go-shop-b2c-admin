import storage from 'store'
import { PREFIX } from './const'

const USER_KEY = `${PREFIX}__user__`

/**
 * 保存 User
 * @param user
 */
function saveUser(user) {
  storage.set(USER_KEY, user)
}

/**
 * 获取 User
 * @returns {*}
 */
function getUser() {
  return storage.get(USER_KEY)
}

/**
 * 清除 User
 * @returns {*}
 */
function clearUser() {
  storage.remove(USER_KEY)
}

export {
  saveUser,
  getUser,
  clearUser
}
