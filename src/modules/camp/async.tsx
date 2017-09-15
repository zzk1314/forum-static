import { pget, ppost } from '../../utils/request'

export function loadMonthlyCampByClassName(className) {
  return pget(`/backend/camp/load?className=${className}`)
}

export function loadMonthlyCampUnGroup() {
  return pget(`/backend/camp/load/ungroup`)
}

export function modifyMonthlyCamp(param) {
  return ppost(`/backend/camp/modify`, param)
}

