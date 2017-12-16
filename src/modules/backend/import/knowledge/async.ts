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

//获取所有知识点
export function loadAllKnowledges(){
  return pget('/pc/operation/knowledge/query/knowledges')
}

// 获取所有小课和对应知识点集合的列表
export function loadAllProblemsAndKnowledges() {
  return pget(`/pc/operation/knowledge/load/knowledges`)
}
