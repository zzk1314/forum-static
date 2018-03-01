
import { pget } from '../../../utils/request'

export function loadCheckedApplication(page){
  return pget('/pc/operation/bs/application/history',{page:page})
}
