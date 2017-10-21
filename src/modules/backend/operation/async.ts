import { pget, ppost } from "../../../utils/request"

export function loadSurveyConfigs(){
  return pget('/rise/operation/survey/config/list');
}

export function updateSurveyConfig(){
  return ppost('/rise/operation/survey/config',{id:id,activity:activity,name:name,realHref:realHref})
}

export function loadBusinessApplicationList(page) {
  return pget("/pc/operation/bs/application/list", { page: page });
}

export function rejectBusinessApplication(id, comment) {
  return ppost(`/pc/operation/bs/application/reject`, { id: id, comment: comment });
}

export function approveBusinessApplication(id, coupon, comment) {
  return ppost("/pc/operation/bs/application/approve", { id: id, coupon: coupon, comment: comment });
}

export function ignoreBusinessApplication(id, comment) {
  return ppost("/pc/operation/bs/application/ignore", { id: id, comment: comment });
}
