import {pget,ppost} from "../../../utils/request"

export function loadApplicationTitle(applicationId){
  return pget(`/pc/fragment/application/title/${applicationId}`)
}

export function loadMineApplication(planId,applicationId) {
  return pget(`/pc/fragment/application/list/mine/${planId}/${applicationId}`);
}

export function loadOtherApplication(cid, page) {
  return pget(`/pc/fragment/application/list/other/${cid}`, {page:page});
}

export function loadSelfApplication(planId, cid) {
  return pget(`/pc/fragment/application/mine/${planId}/${cid}`);
}

export function submitApplication(submitId, content) {
  return ppost(`/pc/fragment/application/submit/${submitId}`, {answer: content});
}

export function loadApplicationSubmit(submitId){
  return pget(`/pc/fragment/application/show/${submitId}`);
}

