import { pget, ppost } from "../../../utils/request"

export function loadAssistsStandard(page){
  return pget("/pc/operation/assist/standard/load", { page: page })
}

export function updateAssistStandard(param){
  return ppost("/pc/operation/assist/standard/update",param)
}

export function loadAssistsExecution(page){
  return pget("/pc/operation/assist/execution/load",{page:page})
}

export function updateAssistsExecution(param){
  return ppost("/pc/operation/assist/execution/update",param)
}

export function standardSearch(riseId){
  return pget(`/pc/operation/assist/standard/search/load?riseId=${riseId}`)
}

export function executionSearch(riseId){
  return pget(`/pc/operation/assist/execution/search/load?riseId=${riseId}`)
}
