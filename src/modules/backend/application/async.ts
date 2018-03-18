import {pget,ppost} from "../../../utils/request"

export function loadProblems() {
  return pget("/pc/operation/problem/list");
}

export function loadRiseWorkList(problemId){
  return pget(`/pc/operation/homework/${problemId}`);
}

export function loadApplicationSubmit(cid, index) {
  return pget(`/pc/operation/application/submit/${cid}`, {page:index});
}

export function highlight(submitId){
  return ppost(`/pc/operation/highlight/applicationSubmit/${submitId}`,null)
}

export function unhighlight(submitId){
  return ppost(`/pc/operation/highlight/cancel/applicationSubmit/${submitId}`,null)
}

export function loadApplication(applicationId){
  return pget(`/pc/operation/application/load/${applicationId}`);
}

export function saveApplicationPractice(applicationId, topic, description) {
  return ppost(`/pc/operation/application/update/${applicationId}`, {topic: topic, description: description})
}

export function submitComment(type,submitId,content){
  return ppost(`/pc/operation/comment/${type}/${submitId}`,{content:content});
}

