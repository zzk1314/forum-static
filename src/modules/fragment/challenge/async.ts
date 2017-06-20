import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadChallengePractice(id) {
  return pget(`/rise/practice/challenge/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function submitChallengePractice(planId,challengeId, params) {
  return ppost(`/rise/practice/challenge/submit/${planId}/${challengeId}`, params)
}

export function vote(referencedId){
  return ppost("/rise/practice/vote", {referencedId: referencedId, status: 1,type:CommentType.Challenge})
}

export function loadOtherList(challengeId,page){
  return pget(`/rise/practice/challenge/list/other/${challengeId}`,{page:page})
}

export function loadCommentList(submitId,page,searchTime){
  return pget(`/rise/practice/comment/${CommentType.Challenge}/${submitId}`,{page:page,searchType:searchTime})
}

export function comment(submitId,content){
  return ppost(`/rise/practice/comment/${CommentType.Challenge}/${submitId}`,{content:content})
}

const CommentType = {
  Challenge:1,
  Application:2,
}

const VoteType = {
  Challenge:1,
  Application:2,
}

