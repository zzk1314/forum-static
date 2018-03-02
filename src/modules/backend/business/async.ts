import { pget } from '../../../utils/request'

export function loadCheckedApplication(page) {
  return pget('/pc/operation/bs/application/history', { page: page })
}

export function loadApplicationById(page,profileId){
  return  pget(`/pc/operation/bs/application/history/search?id=${profileId}&&page=${page}`)
}
