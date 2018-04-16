import { pget, ppost } from '../../../utils/request'
import proxy from '../../../components/proxy/proxy'

export function loadSurveyConfigs () {
  return pget('/pc/operation/survey/config/list')
}

export function updateSurveyConfig (survey) {
  return ppost('/pc/operation/survey/config', survey)
}

export function loadBusinessApplicationList (page) {
  return pget('/pc/operation/bs/application/list', { page: page })
}

export function rejectBusinessApplication (id, param) {
  return ppost(`/pc/operation/bs/application/reject`, { id: id, interviewDto: param })
}

export function approveBusinessApplication (id, coupon, param) {
  return ppost('/pc/operation/bs/application/approve', { id: id, coupon: coupon, interviewDto: param })
}

export function ignoreBusinessApplication (id, param) {
  return ppost('/pc/operation/bs/application/ignore', { id: id, interviewDto: param })
}

export function sendCheckedApplication (time) {
  return pget(`/pc/operation/notice/bs/application/${time}`)
}

export function loadAssts () {
  return pget('/pc/operation/interviewer/list')
}

export function assignApplyInterviewer (data) {
  return ppost('/pc/operation/assign/interviewer', data)
}

export function loadTemplates () {
  return pget('/pc/operation/load/templates')
}

export function sendTemplateMsg (param) {
  return ppost('/pc/operation/send/template/msg', param)
}

export function loadQrCode (scene, remark) {
  return pget(`/subscribe/per/qrCode?scene=${scene}&&remark=${remark}`)
}

export function openVipRiseMember (riseId, month, memo) {
  return ppost(`/pc/operation/add/member/vip?riseId=${riseId}&memo=${memo}&month=${month}`)
}

export function openCourseByMemberIds (memberIds, problemId, startDate, sendWelcomeMsg) {
  return ppost(`/rise/operation/backend/open/course/memberid`, {
    memberIds: memberIds,
    problemId: problemId,
    startDate: startDate,
    sendWelcomeMsg: sendWelcomeMsg,
  })
}

export function generateCertificate (year, month, memberTypeId) {
  return proxy.postProxy(`/rise/operation/backend/generate/certificate`, { year: year, month: month, memberTypeId: memberTypeId })
}

export function sendCertificate (year, month, memberTypeId) {
  return proxy.postProxy(`/rise/operation/backend/send/certificate`, { year: year, month: month, memberTypeId: memberTypeId })
}

export function sendFullAttendance (year, month, memberTypeId) {
  return proxy.postProxy(`/rise/operation/backend/generate/fullattendance`, { year: year, month: month, memberTypeId: memberTypeId })
}
