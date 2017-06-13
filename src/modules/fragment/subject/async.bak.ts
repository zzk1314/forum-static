import {pget,ppost} from "../../../utils/request"

export function loadSubjectList(problemId,page){
  return pget(`/pc/fragment/subject/list`,{problemId:problemId,page:page});
}

export function loadSubject(submitId){
  return pget(`/pc/fragment/subject/${submitId}`);
}

export function loadMineSubjectList(problemId){
  return pget(`/pc/fragment/subject/list/mine?problemId=${problemId}`);
}

export function submitSubject(problemId,submitId,title,content,labels,picList){
  return ppost(`/pc/fragment/subject/submit/${problemId}`,{submitId:submitId,title:title,content:content,labelList:labels,picList:picList})
}

export function loadLabels(problemId){
  return pget(`/pc/fragment/subject/label/${problemId}`)
}
