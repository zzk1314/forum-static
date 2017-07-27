import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadWarmUpAnalysis(practicePlanId) {
  return pget(`/rise/practice/warmup/analysis/${practicePlanId}`)
}

export function answer(params, practicePlanId) {
  return ppost(`/rise/practice/warmup/answer/${practicePlanId}`, params)
}

export function discuss(params) {
  return ppost(`/rise/practice/warmup/discuss`, params)
}

export function loadWarmUpDiscuss(id, offset) {
  return pget(`/rise/practice/warmup/load/discuss/${id}/${offset}`)
}

export function loadWarmUpAnalysisNew(warmupPracticeId) {
  return pget(`/rise/practice/warmup/new/analysis/${warmupPracticeId}`)
}

export function getOpenStatus(){
  return pget('/rise/open/status');
}

export function openConsolidation(){
  return ppost('/rise/plan/open/consolidation')
}

export function deleteComment(id){
  return ppost(`/rise/practice/warmup/delete/comment/${id}`)
}
