import { pget, ppost } from 'utils/request';
import proxy, { default as requestProxy } from '../../../components/proxy/requestProxy';

export function loadApplicationPractice (id, planId) {
  let param = {};
  if (planId) {
    param.planId = planId;
  }
  return requestProxy.getProxy(`/rise/practice/application/start/${id}`, param);
}

export function submitApplicationPractice (planId, applicationId, params) {
  return requestProxy.postProxy(`/rise/practice/application/submit/${planId}/${applicationId}`, params);
}

export function autoSaveApplicationDraft (planId, applicationId, draft) {
  return requestProxy.postProxy(`/rise/practice/application/autosave/${planId}/${applicationId}`, { draft: draft });
}

export function autoUpdateApplicationDraft (draftId, draft) {
  return ppost(`/rise/practice/application/autoupdate/${draftId}`, draft);
}

export function vote (referencedId) {
  return ppost('/rise/practice/vote', { referencedId: referencedId, status: 1, type: CommentType.Application });
}

export function loadOtherList (applicationId, page) {
  return pget(`/rise/practice/application/list/other/${applicationId}`, { page: page });
}

export function loadCommentList (submitId, page) {
  return pget(`/rise/practice/comment/${CommentType.Application}/${submitId}`, { page: page });
}

export function comment (submitId, content) {
  return ppost(`/rise/practice/comment/${CommentType.Application}/${submitId}`, { comment: content });
}

export function commentReply (submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${CommentType.Application}/${submitId}`, {
    comment: comment,
    repliedId: replyedCommentId,
  });
}

export function getApplicationPractice (submitId) {
  return pget(`/rise/practice/application/article/${submitId}`);
}

export function deleteComment (id) {
  return ppost(`/rise/practice/delete/comment/${id}`);
}

export function loadPriorityApplicationCommenst (applicationId, planId) {
  return proxy.getProxy(`/rise/practice/application/load/priority/submits?applicationId=${applicationId}&planId=${planId}`);
}

export const CommentType = {
  Challenge: 1,
  Application: 2,
};

const VoteType = {
  Challenge: 1,
  Application: 2,
};

export const ArticleViewModule = {
  Challenge: 1,
  Application: 2,
  Subject: 3,
};
