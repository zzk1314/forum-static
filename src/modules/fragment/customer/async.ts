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
// 获取个人基本信息
export function loadProfile() {
  return pget(`/rise/customer/profile`)
}
// 更新个人信息
export function updateProfile(workingLife, industry, job, province, city) {
  return ppost(`/rise/customer/profile`, {
    workingLife: workingLife,
    industry: industry,
    function: job,
    province: province,
    city: city
  })
}
// 获取地域信息
export function loadRegion() {
  return pget(`/rise/customer/region`)
}
// 获取知识点评论回复
export function loadKnowledgeDiscussReply(discussId) {
  return pget(`/rise/message/knowledge/discuss/reply/${discussId}`)
}
// 获取知识点内容
export function loadKnowledge(id) {
  return pget(`/rise/practice/knowledge/${id}`)
}
// 对知识点进行讨论
export function discussKnowledge(body) {
  return ppost(`/rise/practice/knowledge/discuss`, body)
}
//
export function loadArticleData(moduleId, commentId) {
  return pget(`/rise/message/comment/reply/${moduleId}/${commentId}`);
}
// 应用题评论回复
export function commentReply(moduleId, submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${moduleId}/${submitId}`, {
    comment: comment,
    repliedId: replyedCommentId
  })
}
// 应用题评论删除
export function deleteComment(id) {
  return ppost(`/rise/practice/delete/comment/${id}`)
}
// 获取选择题对应评论回复
export function loadWarmUpDiscussReply(discussId) {
  return pget(`/rise/message/warmup/discuss/reply/${discussId}`)
}
// 获取选择题信息
export function loadWarmUp(id) {
  return pget(`/rise/practice/warmup/${id}`)
}
// 发送验证码
export function sendValidCode(phone, areacode?) {
  if(areacode) {
    return ppost(`/rise/customer/send/valid/code`, { phone: phone, areaCode: areacode })
  } else {
    return ppost(`/rise/customer/send/valid/code`, { phone: phone })
  }
}
// 提交、更新手机号
export function validPhone(code) {
  return ppost(`/rise/customer/valid/sms`, { code: code })
}
