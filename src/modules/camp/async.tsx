import { pget, ppost } from '../../utils/request'

export function loadMonthlyCampByClassName (className) {
  return pget(`/backend/camp/load?className=${className}`)
}

export function loadUnGroupMonthlyCamp (pageSelected) {
  return pget(`/backend/camp/load/ungroup?page=${pageSelected}`)
}

export function loadProfileByNickName (nickName) {
  return pget(`/backend/camp/load/profile/nickName?nickName=${nickName}`)
}

export function loadProfileByRiseId (riseId) {
  return pget(`/backend/camp/load/profile/riseId?riseId=${riseId}`)
}

export function loadProfileByMemberId (memberId) {
  return pget(`/backend/camp/load/profile/memberId?memberId=${memberId}`)
}

export function modifyMonthlyCamp (param) {
  return ppost(`/backend/camp/modify/update`, param)
}

export function batchModifyMonthlyCampGroupId (riseMemberIds, groupId) {
  return ppost(`/backend/camp/modify/batch/update?groupId=${groupId}`, riseMemberIds)
}

export function modifyAddMonthlyCamp (param) {
  return ppost(`/backend/camp/modify/add`, param)
}

export function addCertificate (param) {
  return ppost(`/rise/operation/backend/generate/special/certificate`, param)
}
