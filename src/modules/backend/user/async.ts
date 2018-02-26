
import { pget } from '../../../utils/request'

export function searchInfoByMember(memberId){
  return pget(`/pc/operation/user/search?type=1&&search=${memberId}`)
}

export function searchInfoById(id){
  return pget(`/pc/operation/user/search?type=2&&search=${id}`)
}


export function searchInfoByRiseId(riseId){
  return pget(`/pc/operation/user/search?type=3&&search=${riseId}`)
}
