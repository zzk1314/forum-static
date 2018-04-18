import proxy from '../../../components/proxy/proxy'

export function queryProblemKnowledges (problemId) {
  return proxy.getProxy(`/pc/operation/knowledge/load/problem/knowledges?problemId=${problemId}`)
}

export function queryKnowledgeDiscusses (knowledgeId) {
  return proxy.getProxy(`/pc/operation/knowledge/load/discuss?knowledgeId=${knowledgeId}`)
}

export function voteKnowledgeDiscuss (discussId, priority) {
  return proxy.postProxy(`/pc/operation/knowledge/vote/discuss?discussId=${discussId}&priority=${priority}`)
}

export function queryKnowledgeDiscuss (discussId) {
  return proxy.getProxy(`/pc/operation/knowledge/load/discuss/${discussId}`)
}

export function replyKnowledgeDiscuss (comment, referenceId, repliedId) {
  return proxy.postProxy(`/rise/practice/knowledge/discuss`, {
    comment: comment,
    referenceId: referenceId,
    repliedId: repliedId,
  })
}

export function delKnowledgeDiscuss (discussId) {
  return proxy.postProxy(`/rise/practice/knowledge/discuss/del/${discussId}`)
}
