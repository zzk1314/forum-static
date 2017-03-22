import {pget,ppost} from "../../utils/request"

export function loadAccount() {
  return pget("/account/get");
}