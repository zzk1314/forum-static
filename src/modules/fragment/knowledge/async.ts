import { pget, ppost } from 'utils/request';
import proxy from '../../../components/proxy/requestProxy';

export function loadKnowledges (practicePlanId) {
  return proxy.getProxy(`/rise/practice/knowledge/start/${practicePlanId}`);
}

export function learnKnowledge (practicePlanId) {
  return proxy.postProxy(`/rise/practice/knowledge/learn/${practicePlanId}`);
}

export function loadRoadMap () {
  return pget(`/rise/plan/roadmap/`);
}

export function loadProblem (id) {
  return pget(`/rise/problem/get/${id}`);
}

export function loadKnowledge (id) {
  return proxy.getProxy(`/rise/practice/knowledge/${id}`);
}

export function loadDiscuss (knowledgeId, offset) {
  return proxy.getProxy(`/rise/practice/knowledge/discuss/${knowledgeId}/${offset}`);
}

export function discussKnowledge (body) {
  return ppost(`/rise/practice/knowledge/discuss`, body);
}

export function deleteKnowledgeDiscuss (id) {
  return ppost(`/rise/practice/knowledge/discuss/del/${id}`);
}

export function loadKnowledgePriorityDiscuss (knowledgeId) {
  return proxy.getProxy(`/rise/practice/knowledge/priority/discuss/${knowledgeId}`);
}
