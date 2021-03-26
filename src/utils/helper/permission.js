/**
 * 根据 module 获取权限
 * @param module
 * @param permissions
 * @returns {*}
 */
export function getPermissionsByModule(module, permissions) {
  return permissions.filter((value) => {
    return value.module === module
  })
}

/**
 * 根据 module 获取选中的权限
 * @param module
 * @param permissions
 * @returns {*}
 */
export function getCheckedPermissionsByModule(module, permissions) {
  return getPermissionsByModule(module, permissions).map((item) => {
    return item.id
  })
}
