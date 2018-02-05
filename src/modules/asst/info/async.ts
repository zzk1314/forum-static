import { pget, ppost } from "../../../utils/request"

export function loadGradeInfo(){
  return pget(`/pc/asst/load/up/info`)
}
