import {pget,ppost} from "../../../utils/request"

export function loadConfig(projectId) {
  return pget(`/pc/admin/config/${projectId}`);
}

export function addConfig(param) {
  return ppost(`/pc/admin/config/add`, param)
}

export function deleteConfig(param) {
  return ppost(`/pc/admin/config/delete`, param)
}

export function updateConfig(param) {
  return ppost(`/pc/admin/config/update`, param)
}

export function refund(param) {
  return ppost(`/pc/admin/refund`, param)
}
