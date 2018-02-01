import { pget, ppost } from "../../../utils/request"


export function loadBusinessApplicationList(page) {
  return pget("/pc/asst/load/business/applications", { page: page });
}


export function assignApplyInterviewer(data) {
  return ppost('/pc/operation/assign/interviewer', data)
}

export function addInterviewerRecord(param){
  return ppost('/pc/asst/add/interview/record',param)
}
