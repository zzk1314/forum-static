import { pget, ppost } from '../../utils/request'

export function loadMonthlyCampByClassName(className) {
  return pget(`/camp/load?className=${className}`)
}

export function loadMonthlyCampUnGroup() {
  return pget(`/camp/load/ungroup`)
}

export function modifyMonthlyCamp(param) {
  return ppost(`/camp/modify`, param)
}

