import { pget, ppost } from "../../../utils/request"

export function sendMessage(phone, content) {
  return ppost("/operation/send/message", { content: content, phone: phone })
}

export function loadBusinessApplicationList(page) {
  return pget("/pc/operation/bs/application/list", { page: page });
}

export function rejectBusinessApplication(id, comment) {
  return ppost(`/pc/operation/bs/application/reject`, { id: id, comment: comment });
}

export function approveBusinessApplication(id, coupon, comment) {
  return ppost("/pc/operation/bs/application/approve", { id: id, coupon: coupon, comment: comment });
}

export function ignoreBusinessApplication(id, comment) {
  return ppost("/pc/operation/bs/application/ignore", { id: id, comment: comment });
}
