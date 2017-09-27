import { pget, ppost } from '../../../../utils/request'

export function loadSimpleKnowledges(problemId) {
  return pget(`/pc/operation/knowledge/simple/${problemId}`)
}

export function loadKnowledgeDetail(knowledgeId) {
  return pget(`/pc/operation/knowledge/get/${knowledgeId}`)
}


export function updateKnowledge(problemId, param) {
  return ppost(`/pc/operation/knowledge/update/${problemId}`, param)
}
