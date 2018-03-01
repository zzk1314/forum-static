import { pget } from '../../../utils/request'

export function searchInfo(searchId) {
  return pget(`/pc/operation/user/search?searchId=${searchId}`)
}

export function searchInfoByClass(className, groupId) {
  return pget(`/pc/operation/user/class/search?className=${className}&&groupId=${groupId}`)
}

