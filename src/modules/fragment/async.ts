import {pget,ppost} from "../../utils/request"

export function loadAccount() {
  return pget("/account/get");
}

export function loadProblems() {
  return pget("/pc/fragment/problem/list");
}


export function loadCurProblemId(){
  return pget("/pc/fragment/problem/curId");
}

export function loadRiseWorkList(problemId){
  return pget(`/pc/fragment/homework/${problemId}`);
}

export function vote(referencedId,status,type){
  return ppost("/pc/fragment/vote", {referencedId: referencedId, status: status,type:type})
}

export function loadComments(type,submitId,page){
  return pget(`/pc/fragment/comment/${type}/${submitId}`,{page:page});
}

export function submitComment(type,submitId,content){
  return ppost(`/pc/fragment/comment/${type}/${submitId}`,{content:content});
}

export const CommentType = {
  Challenge:1,
  Application:2,
  Subject:3,
}

export const VoteType = {
  Challenge:1,
  Application:2,
  Subject:3,
}

export const PictureModule = {
  Subject:4,
}
