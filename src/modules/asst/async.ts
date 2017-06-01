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

export function loadApplicationProblems() {
  return pget("/pc/asst/application/problem/list");
}

export function loadSubjectArticleProblems() {
  return pget("/pc/asst/subject/problem/list");
}

export function commentCount() {
  return pget(`/pc/asst/comment/count`);
}

export function loadCommentedList() {
  return pget("/pc/asst/commented/submit");
}
