import {pget,ppost} from "../../../utils/request"

export function loadHotPractice() {
  return pget(`/pc/operation/hot/warmup`);
}

export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/operation/warmup/${warmupPracticeId}`)
}

export function highlight(discussId){
  return ppost(`/pc/operation/highlight/discuss/${discussId}`)
}

export function replyDiscuss(params) {
  return ppost(`/pc/operation/reply/discuss`, params)
}