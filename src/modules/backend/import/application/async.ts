import {pget,ppost} from "utils/request"

// 获取所有小课和对应知识点集合的列表
export function loadAllProblemsAndKnowledges() {
  return pget(`/pc/operation/warmup/load/knowledges`)
}

//插入应用题信息
export function insertApplicationPractice (param){
  return ppost(`/pc/operation/application/insert/practice`, param)
}
