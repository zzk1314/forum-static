import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id, planId) {
  let param = {};
  if(planId) {
    param.planId = planId;
  }
  return pget(`/rise/practice/application/start/${id}`, param)
}

export function submitApplicationPractice(planId, applicationId, params) {
  return ppost(`/rise/practice/application/submit/${planId}/${applicationId}`, params)
}

export function autoSaveApplicationDraft(planId, applicationId) {
  return ppost(`/rise/practice/application/autosave/${planId}/${applicationId}`)
}

export function autoUpdateApplicationDraft(draftId, draft) {
  return ppost(`/rise/practice/application/autoupdate/${draftId}`, draft)
}

export function vote(referencedId) {
  return ppost("/rise/practice/vote", {referencedId: referencedId, status: 1, type: CommentType.Application})
}

export function loadOtherList(applicationId, page) {
  return pget(`/rise/practice/application/list/other/${applicationId}`, {page: page})
}

export function loadCommentList(submitId, page) {
  return pget(`/rise/practice/comment/${CommentType.Application}/${submitId}`, {page: page})
}

export function comment(submitId, content) {
  return ppost(`/rise/practice/comment/${CommentType.Application}/${submitId}`, {comment: content})
}

export function commentReply(submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${CommentType.Application}/${submitId}`, {
    comment: comment,
    repliedId: replyedCommentId
  })
}

export function openApplication() {
  return ppost('/rise/plan/open/application');
}

export function getOpenStatus() {
  return pget('/rise/open/status');
}

export function getApplicationPractice(submitId) {
  return pget(`/rise/practice/application/article/${submitId}`)
}

export function deleteComment(id) {
  return ppost(`/rise/practice/delete/comment/${id}`)
}

export const CommentType = {
  Challenge: 1,
  Application: 2,
}

const VoteType = {
  Challenge: 1,
  Application: 2,
}

export const ArticleViewModule = {
  Challenge: 1,
  Application: 2,
  Subject: 3,
}
