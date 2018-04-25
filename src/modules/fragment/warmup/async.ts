import { pget, ppost } from 'utils/request';
import requestProxy from '../../../components/proxy/requestProxy';

export function loadWarmUpAnalysis (practicePlanId) {
  return pget(`/rise/practice/warmup/analysis/${practicePlanId}`);
}

export function answer (params, practicePlanId) {
  return ppost(`/rise/practice/warmup/answer/${practicePlanId}`, params);
}

export function discuss (params) {
  return requestProxy.postProxy(`/rise/practice/warmup/discuss`, params);
}

export function loadWarmUpDiscuss (id, offset) {
  return pget(`/rise/practice/warmup/load/discuss/${id}/${offset}`);
}

export function loadWarmUpAnalysisNew (warmupPracticeId) {
  return pget(`/rise/practice/warmup/new/analysis/${warmupPracticeId}`);
}

export function deleteComment (id) {
  return ppost(`/rise/practice/warmup/delete/comment/${id}`);
}

export function loadPriorityWarmUpAnalysis (practicePlanId) {
  return requestProxy.getProxy(`/rise/practice/warmup/analysis/priority/${practicePlanId}`);
}
