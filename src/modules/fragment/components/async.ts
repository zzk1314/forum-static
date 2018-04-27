import proxy from '../../../components/proxy/requestProxy';

export function requestApplicationComment (submitId) {
  return proxy.postProxy(`/rise/practice/request/comment/2/${submitId}`);
}
