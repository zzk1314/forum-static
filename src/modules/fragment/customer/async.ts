import { pget, ppost } from "../../../utils/request"
// 加载消息中心的消息
export function loadMessage(offset) {
  return pget('/rise/message/load', { page: offset })
}

export function readMessage(messageId) {
  return ppost(`/rise/message/read/${messageId}`)
}
// 获取账户信息
export function loadAccount() {
  return pget(`/rise/customer/account`)
}
// 获取会员信息
export function loadMember() {
  return pget(`/rise/customer/member`)
}
