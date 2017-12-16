import {pget,ppost} from "utils/request"

//插入应用题信息
export function insertApplicationPractice (param){
  return ppost(`/pc/operation/application/insert/practice`, param)
}

//加载某道应用题
export function loadApplication(applicationId){
  return pget(`/pc/operation/application/load/${applicationId}`);
}

//更新某道应用题
export function updateApplicationPractice(applicationId, topic, description,difficulty) {
  return ppost(`/pc/operation/application/update/${applicationId}`, {topic: topic, description: description,difficulty:difficulty})
}

export function loadProblems() {
  return pget("/pc/operation/problem/list");
}

export function loadRiseWorkList(problemId){
  return pget(`/pc/operation/homework/${problemId}`);
}

export function loadApplicationSubmit(cid, index) {
  return pget(`/pc/operation/application/submit/${cid}`, {page:index});
}

export function highlight(applicationId, submitId){
  return ppost(`/pc/operation/highlight/applicationSubmit/${applicationId}/${submitId}`)
}

export function saveApplicationPractice(applicationId, topic, description) {
  return ppost(`/pc/operation/application/update/${applicationId}`, {topic: topic, description: description})
}

export function submitComment(type,submitId,content){
  return ppost(`/pc/operation/comment/${type}/${submitId}`,{content:content});
}
