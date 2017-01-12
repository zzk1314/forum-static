import {pget} from "../../utils/request"

export function loadProblems(){
  return pget("/pc/fragment/problem/list");
}

export function loadCurrentProblem(){
  return pget("/pc/fragment/problem/current");
}
