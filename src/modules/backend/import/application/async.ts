import {pget,ppost} from "utils/request"

// 获取所有小课和对应知识点集合的列表
export function loadAllProblemsAndKnowledges() {
  return pget(`/pc/operation/warmup/load/knowledges`)
}

//插入应用题信息
export function insertApplicationPractice (param){
  return ppost(`/pc/operation/application/insert/practice`, param)
}

//加载某道应用题
export function loadApplication(applicationId){
  return pget(`/pc/fragment/application/load/${applicationId}`);
}

//更新某道应用题
export function updateApplicationPractice(applicationId, topic, description,difficulty) {
  return ppost(`/pc/fragment/application/update/${applicationId}`, {topic: topic, description: description,difficulty:difficulty})
}

//获取所有知识点
export function loadAllKnowledges(){
  return pget('/pc/operation/knowledge/query/knowledges')
}
