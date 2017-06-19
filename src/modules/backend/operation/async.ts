import {pget,ppost} from "../../../utils/request"

export function sendMessage(phone,content){
  return ppost("/operation/send/message",{content:content,phone:phone})
}
