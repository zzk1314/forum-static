import {pget,ppost} from "../../../../utils/request"

export function loadAssists(){
  return pget('/pc/operation/assist/load')
}

export function loadAssistCatalogs(){
  return pget('/pc/operation/assist/load/catalog')
}

export function updateAssistCatalog(riseId,assist,assistCatalog){
  return pget(`/pc/operation/assist/update?riseId=${riseId}&assist=${assist}&catalog=${assistCatalog}`)
}

export function loadUnAssistByNickName(nickName){
  return pget(`/pc/operation/assist/load/unassist/${nickName}`)
}

export function addAssist(riseId,assistCatalog){
  return pget(`/pc/operation/assist/add/${riseId}/${assistCatalog}`)
}
