import {pget} from "../../utils/request"

export function loadCurrentProblem(){
  return pget("/pc/fragment/problem/list");
}
