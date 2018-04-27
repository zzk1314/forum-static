import { ppost } from "utils/request";

export function requestCommentByType(type, submitId) {
  return ppost(`/rise/practice/request/comment/${type}/${submitId}`);
}
