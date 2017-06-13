import { pget, ppost } from "utils/request";

export function requestCommentByType(type, submitId) {
  return ppost(`/rise/practice/request/comment/${type}/${submitId}`);
}

export function IncreaseArticleShow(moduleId, submitId) {
  return pget(`/rise/practice/article/show/${moduleId}/${submitId}`)
}
