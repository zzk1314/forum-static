import {pget,ppost} from "../../utils/request"

export function loadAccount() {
  return pget("/account/get");
}

export function loadApplicationList(problemId) {
  return pget(`/pc/asst/application/${problemId}`);
}

export function loadSubjectArticleList(problemId) {
  return pget(`/pc/asst/subject/${problemId}`);
}

export function loadProblems() {
  return pget("/pc/asst/problem/list");
}

export function commentCount() {
  return pget(`/pc/asst/comment/count`);
}