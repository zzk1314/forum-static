import { pget, ppost } from '../../../../utils/request'

export function loadTextAutoReplyMessage() {
  return pget(`/pc/message/reply/load/text`)
}

export function addAutoReplyMessage(param) {
  return ppost(`/pc/message/reply/add`, param)
}

export function updateAutoReplyMessage(param) {
  return ppost(`/pc/message/reply/update`, param)
}

export function deleteAutoReplyMessage(id) {
  return pget(`/pc/message/reply/del?id=${id}`)
}

export function reloadAutoReplyMessage() {
  return pget(`/cache/weixin/message/reload`)
}

export function loadSubscribeDefaultTextMessage() {
  return pget(`/pc/message/subscribe/load`)
}

export function updateSubscribeMessage(param) {
  return ppost(`/pc/message/subscribe/update`, param)
}
