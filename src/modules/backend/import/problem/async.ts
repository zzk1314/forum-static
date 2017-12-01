import { pget, ppost } from '../../../../utils/request'


export function loadSimpleProblems() {
  return pget(`/pc/operation/problem/simple`)
}

export function loadProblem(id) {
  return pget(`/pc/operation/problem/load/${id}`)
}

export function loadProblemCatalog() {
  return pget(`/pc/operation/problem/catalog/load`)
}

export function saveProblem(param) {
  return ppost(`/pc/operation/problem/save`, param)
}

/**
 * 添加小课的时候需要往ProblemSchedule中添加一条复习记录
 * @param param
 * @returns {any}
 */
// export function addProblemAndReviewSchedule(param){
//   return ppost('/pc/operation/problem/schedule/save',param)
// }
