import { pget, ppost } from '../../../utils/request'

export function loadEditableProblem() {
  return pget(`/pc/backend/knowledge/get/problem`)
}

export function loadKnowledgeDetail(knowledgeId) {
  return pget(`/pc/backend/knowledge/get/knowledge/${knowledgeId}`)
}

export function addNewChapter(chapter) {
  return ppost(`/pc/backend/knowledge/post/add/chapter/${chapter}`)
}

export function addNewSection(chapter, section) {
  return ppost(`/pc/backend/knowledge/post/add/section/${chapter}/${section}`)
}

export function updateKnowledge(param) {
  return ppost(`/pc/backend/knowledge//post/update/knowledge`, param)
}
