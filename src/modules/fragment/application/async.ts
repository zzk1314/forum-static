import {pget,ppost} from "../../../utils/request"

export function loadApplicationTitle(applicationId){
  return pget(`/pc/fragment/application/title/${applicationId}`)
}

export function loadMineApplication(planId,applicationId) {
  return pget(`/pc/fragment/application/list/mine/${planId}/${applicationId}`);
}

export function loadOtherApplication(applicationId, page) {
  return pget(`/pc/fragment/application/list/other/${applicationId}`, {page:page});
}

export function loadSelfApplication(planId, applicationId) {
  return pget(`/pc/fragment/application/mine/${planId}/${applicationId}`);
}

export function submitApplication(planId,applicationId, content) {
  return ppost(`/pc/fragment/application/submit/${planId}/${applicationId}`, {answer: content});
}

export function loadApplicationSubmit(submitId){
  return pget(`/pc/fragment/application/show/${submitId}`);
}

