import requestProxy from '../../../utils/RequestProxy'

export function queryProblemKnowledges (problemId) {
  return requestProxy.getProxy(`/pc/operation/knowledge/load/problem/knowledges?problemId=${problemId}`)
}

export function queryKnowledgeDiscuss (knowledgeId) {
  return requestProxy.getProxy(`/pc/operation/knowledge/load/discuss?knowledgeId=${knowledgeId}`)
}

export function voteKnowledgeDiscuss (discussId, priority) {
  return requestProxy.postProxy(`/pc/operation/knowledge/vote/discuss?discussId=${discussId}&priority=${priority}`)
}
