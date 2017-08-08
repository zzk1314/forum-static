import { pget, ppost } from '../../utils/request'

export function loadAccount() {
  return pget('/account/get')
}

export function loadApplicationList(problemId) {
  return pget(`/pc/asst/application/${problemId}`)
}

export function loadApplicationListByNickName(problemId, nickName) {
  nickName = encodeURI(nickName)
  return pget(`/pc/asst/application/${problemId}/${nickName}`)
}

export function loadSubjectArticleList(problemId) {
  return pget(`/pc/asst/subject/${problemId}`)
}

export function loadApplicationProblems() {
  return pget('/pc/asst/application/problem/list')
}

export function loadSubjectArticleProblems() {
  return pget('/pc/asst/subject/problem/list')
}

export function commentCount() {
  return pget(`/pc/asst/comment/count`)
}

export function loadCommentedList() {
  return pget('/pc/asst/commented/submit')
}

export function loadApplicationSubmit(submitId) {
  return pget(`/pc/fragment/application/show/${submitId}`)
}

export function loadSubject(submitId) {
  return pget(`/pc/fragment/subject/${submitId}`)
}

export function loadProblems() {
  return pget('/pc/fragment/problem/list')
}

export function loadCurProblemId() {
  return pget('/pc/fragment/problem/curId')
}

export function loadRiseWorkList(problemId) {
  return pget(`/pc/fragment/homework/${problemId}`)
}

export function vote(referencedId, status, type) {
  return ppost('/pc/fragment/vote', { referencedId: referencedId, status: status, type: type })
}

export function loadComments(type, submitId, page) {
  return pget(`/pc/fragment/comment/${type}/${submitId}`, { page: page })
}

export function submitComment(type, submitId, content) {
  return ppost(`/pc/fragment/comment/${type}/${submitId}`, { content: content })
}

export function submitReplyComment(type, submitId, content, replyId) {
  return ppost(`/pc/fragment/comment/reply/${type}/${submitId}`, { content: content, replyId: replyId })
}

export function requestAsstComment(moduleId, submitId) {
  return ppost(`/pc/fragment/request/comment/${moduleId}/${submitId}`)
}

export function deleteComment(commentId) {
  return ppost(`/pc/fragment/delete/comment/${commentId}`)
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
