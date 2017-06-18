import {pget,ppost} from "../../../utils/request"

export function sendMessage(phone,content){
  let phones = [];
  phones.push(phone);
  return ppost("/operation/send/message",{content:content,phones:phones})
}
