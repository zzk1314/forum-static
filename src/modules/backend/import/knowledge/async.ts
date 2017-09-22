import { pget, ppost } from '../../../../utils/request'

export function loadEditableProblem() {
  return pget(`/pc/operation/knowledge/get/problem`)
}

export function loadKnowledgeDetail(knowledgeId) {
  return pget(`/pc/operation/knowledge/get/knowledge/${knowledgeId}`)
}

export function addNewChapter(chapter) {
  return ppost(`/pc/operation/knowledge/post/add/chapter/${chapter}`)
}

export function addNewSection(chapter, section) {
  return ppost(`/pc/operation/knowledge/post/add/section/${chapter}/${section}`)
}

export function updateKnowledge(param) {
  return ppost(`/pc/operation/knowledge//post/update/knowledge`, param)
}
