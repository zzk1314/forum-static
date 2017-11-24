import { pget, ppost } from '../../../utils/request'

export function loadSurveyConfigs() {
  return pget('/pc/operation/survey/config/list')
}

export function updateSurveyConfig(survey) {
  return ppost('/pc/operation/survey/config', survey)
}

export function loadBusinessApplicationList(page) {
  return pget('/pc/operation/bs/application/list', { page: page })
}

export function rejectBusinessApplication(id, comment) {
  return ppost(`/pc/operation/bs/application/reject`, { id: id, comment: comment })
}

export function approveBusinessApplication(id, coupon, comment) {
  return ppost('/pc/operation/bs/application/approve', { id: id, coupon: coupon, comment: comment })
}

export function ignoreBusinessApplication(id, comment) {
  return ppost('/pc/operation/bs/application/ignore', { id: id, comment: comment })
}

export function getCertificate(certificate) {
  return pget(`/rise/customer/certificate/${certificate}`)
}
