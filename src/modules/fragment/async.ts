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


