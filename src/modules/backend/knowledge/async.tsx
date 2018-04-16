import proxy from '../../../components/proxy/proxy'

export function queryProblemKnowledges (problemId) {
  return proxy.getProxy(`/pc/operation/knowledge/load/problem/knowledges?problemId=${problemId}`)
}

export function queryKnowledgeDiscuss (knowledgeId) {
  return proxy.getProxy(`/pc/operation/knowledge/load/discuss?knowledgeId=${knowledgeId}`)
}

export function voteKnowledgeDiscuss (discussId, priority) {
  return proxy.postProxy(`/pc/operation/knowledge/vote/discuss?discussId=${discussId}&priority=${priority}`)
}
