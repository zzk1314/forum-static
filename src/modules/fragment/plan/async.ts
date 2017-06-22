import { pget, ppost } from "utils/request";

export function loadPlan(planId) {
  return pget(`/rise/plan/load${planId?'?planId='+planId:''}`)
}

export function loadPlanIntro(planId) {
  return pget(`/rise/plan/play/${planId}`)
}

export function completePlan(planId) {
  return ppost(`/rise/plan/complete${planId?'?planId='+planId:''}`)
}

export function markPlan(series, planId) {
  return ppost(`/rise/plan/mark/${series}${planId?'?planId='+planId:''}`)
}

export function closePlan(planId) {
  return ppost(`/rise/plan/close${planId?'?planId='+planId:''}`)
}

export function updateOpenRise(){
  return ppost(`/rise/plan/openrise`)
}

export function checkPractice(series, planId){
  return ppost(`/rise/plan/check/${series}${planId?'?planId='+planId:''}`)
}

export function gradeProblem(problemScores,problemId){
  return ppost(`/rise/problem/grade/${problemId}`,problemScores);
}

export function isRiseMember(){
  return pget('/rise/plan/risemember');
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/rise/practice/knowledge/learn/${knowledgeId}`)
}

export function mark(param){
  return ppost('/rise/b/mark',param);
}

export function queryEventList(){
  return pget("/rise/customer/event/list");
}

export function queryChapterList(planId){
  return pget(`/rise/plan/chapter/list`,{planId:planId});
}

export function queryReport(planId){
  return pget(`/rise/plan/improvement/report${planId?'?planId='+planId:''}`);
}

export function loadSelfPlans() {
  return pget("/rise/customer/pc/plans")
}
