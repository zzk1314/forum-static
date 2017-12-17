import { pget, ppost } from '../../utils/request'

export function loadAccount() {
  return pget('/account/get')
}

export function loadApplicationList(problemId) {
  return pget(`/pc/asst/application/${problemId}`)
}

export function loadApplicationListByNickName(problemId, nickName) {
  nickName = encodeURI(nickName)
  return pget(`/pc/asst/application/nickname/${problemId}/${nickName}`)
}

export function loadApplicationListByMemberId(problemId, memberId) {
  return pget(`/pc/asst/application/memberid/${problemId}/${memberId}`)
}

export function loadApplicationProblems() {
  return pget('/pc/asst/application/problem/list')
}

export function commentCount() {
  return pget(`/pc/asst/comment/count`)
}

export function loadCommentedList() {
  return pget('/pc/asst/commented/submit')
}

export function loadApplicationSubmit(submitId) {
  return pget(`/pc/asst/application/show/${submitId}`)
}

export function vote(referencedId, status, type) {
  return ppost('/pc/asst/vote', { referencedId: referencedId, status: status, type: type })
}

export function loadComments(type, submitId, page) {
  return pget(`/pc/asst/comment/${type}/${submitId}`, { page: page })
}

export function submitComment(type, submitId, content) {
  return ppost(`/pc/asst/comment/${type}/${submitId}`, { content: content })
}

export function submitReplyComment(type, submitId, content, replyId) {
  return ppost(`/pc/asst/comment/reply/${type}/${submitId}`, { content: content, replyId: replyId })
}

export function requestAsstComment(moduleId, submitId) {
  return ppost(`/pc/asst/request/comment/${moduleId}/${submitId}`)
}

export function deleteComment(commentId) {
  return ppost(`/pc/asst/delete/comment/${commentId}`)
}

export function loadHotPractice(page) {
  return pget(`/pc/asst/hot/warmup`, {page:page});
}

export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/asst/warmup/load/${warmupPracticeId}`)
}

export function replyDiscuss(params) {
  return ppost(`/pc/asst/reply/discuss`, params)
}

export const CommentType = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}

export const VoteType = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}

export const PictureModule = {
  Subject: 4
}
