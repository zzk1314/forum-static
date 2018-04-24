import { pget, ppost } from 'utils/request';
import proxy from '../../../components/proxy/requestProxy';

export function requestCommentByType (type, submitId) {
  return ppost(`/rise/practice/request/comment/${type}/${submitId}`);
}

export function IncreaseArticleShow (moduleId, submitId) {
  return pget(`/rise/practice/article/show/${moduleId}/${submitId}`);
}

export function requestApplicationComment (submitId) {
  return proxy.postProxy(`/rise/practice/request/comment/2/${submitId}`);
}
