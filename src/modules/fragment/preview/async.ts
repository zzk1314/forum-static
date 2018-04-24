import { pget, ppost } from 'utils/request'

export function loadPreview (practicePlanId) {
  return pget(`/rise/practice/preview/start/${practicePlanId}`)
}

export function learnPreview (practicePlanId) {
  return ppost(`/rise/practice/preview/learn/${practicePlanId}`)
}

