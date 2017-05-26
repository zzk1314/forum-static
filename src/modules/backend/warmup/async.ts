import {pget,ppost} from "../../../utils/request"

export function loadHotPractice() {
  return pget(`/pc/operation/hot/warmup`);
}

export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/operation/warmup/load/${warmupPracticeId}`)
}

export function highlight(discussId){
  return ppost(`/pc/operation/highlight/discuss/${discussId}`)
}

export function replyDiscuss(params) {
  return ppost(`/pc/operation/reply/discuss`, params)
}

export function deleteWarmupDiscuss(discussId) {
  return pget(`/pc/operation/warmup/discuss/del/${discussId}`)
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
