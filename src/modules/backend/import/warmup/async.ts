import {pget,ppost} from "utils/request"

export function loadHotPractice(page) {
  return pget(`/pc/asst/hot/warmup`, {page:page});
}

export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/asst/warmup/load/${warmupPracticeId}`)
}

export function highlight(discussId){
  return ppost(`/pc/operation/highlight/discuss/${discussId}`)
}

export function replyDiscuss(params) {
  return ppost(`/pc/asst/reply/discuss`, params)
}

export function deleteWarmupDiscuss(discussId) {
  return pget(`/pc/operation/warmup/discuss/del/${discussId}`)
}

export function  loadAllWarmupList(problemId){
  return pget(`/pc/operation/warmup/load/all/${problemId}`)
}

export function loadWarmupList(problemId) {
  return pget(`/pc/operation/warmup/list/${problemId}`)
}

export function loadProblems() {
  return pget("/pc/operation/problem/list");
}

export function saveWarmup(practice) {
  return ppost("/pc/operation/warmup/save", practice);
}

export function loadNextWarmup(problemId, prePracticeId) {
  return pget(`/pc/operation/warmup/next/${problemId}/${prePracticeId}`)
}

// 插入录入的选择题信息
export function insertWarmupPractice (param){
  return ppost(`/pc/operation/warmup/insert/practice`, param)
}
// 根据 practiceUid 获取小课信息
export function loadWarmupPracticeByPracticeUid(practiceUid) {
  return pget(`/pc/operation/warmup/load/problem/${practiceUid}`)
}

export function deleteExample(id){
  return pget(`/pc/operation/warmup/delete/example/${id}`)
}
