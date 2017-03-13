import {pget,ppost} from "../../../utils/request"

export function loadSubjectList(problemId){
  return pget(`/pc/fragment/subject/list?problemId=${problemId}`);
}

export function loadSubject(submitId){
  return pget(`/pc/fragment/subject/${submitId}`);
}

export function loadMineSubjectList(problemId){
  return pget(`/pc/fragment/subject/list/mine?problemId=${problemId}`);
}

export function submitSubject(problemId,submitId,title,content,labels){
  return ppost(`/pc/fragment/subject/subject/submit/${problemId}`,{submitId:submitId,title:title,content:content,labelList:labels})
}
