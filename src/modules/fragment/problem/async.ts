import { pget, ppost } from 'utils/request'

export function loadProblem(id) {
  return pget(`/rise/problem/get/${id}`)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}

export function checkCreatePlan(problemId) {
  return ppost(`/rise/plan/choose/problem/check/${problemId}`)
}

export function mark(param) {
  return ppost('/rise/b/mark', param)
}

export function loadProblemExtension(problemId) {
  return pget(`/rise/problem/extension/${problemId}`)
}

export function openProblemIntroduction(problemId, practicePlanId) {
  return pget(`/rise/problem/open/${problemId}?autoOpen=false&practicePlanId=${practicePlanId}`)
}
