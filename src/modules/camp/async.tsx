import { pget, ppost } from '../../utils/request'

export function loadMonthlyCampByClassName(className) {
  return pget(`/backend/camp/load?className=${className}`)
}

export function loadUnGroupMonthlyCamp() {
  return pget(`/backend/camp/load/ungroup`)
}

export function loadProfileByNickName(nickName) {
  return pget(`/backend/camp/load/profile?nickName=${nickName}`)
}

export function loadProfileByRiseId(riseId) {
  return pget(`/backend/camp/load/profile?riseId=${riseId}`)
}

export function modifyMonthlyCamp(param) {
  return ppost(`/backend/camp/modify/update`, param)
}

export function batchModifyMonthlyCampGroupId(riseMemberIds, groupId) {
  return ppost(`/backend/camp/modify/batch/update?groupId=${groupId}`, riseMemberIds)
}

export function modifyAddMonthlyCamp(param) {
  return ppost(`/backend/camp/modify/add`, param)
}
