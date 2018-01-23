import { pget, ppost } from "../../../utils/request"

export function loadAssistsStandard(page){
  return pget("/pc/operation/assist/load/standard", { page: page })
}
