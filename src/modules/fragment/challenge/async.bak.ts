import {pget,ppost} from "../../../utils/request"

export function loadMineChallenge(planId,challengeId) {
  return pget(`/pc/fragment/challenge/list/mine/${planId}/${challengeId}`);
}

export function loadOtherChallenge(cid) {
  return pget(`/pc/fragment/challenge/list/other/${cid}`);
}

export function loadSelfChallengeSubmit(planId, cid) {
  return pget(`/pc/fragment/challenge/mine/${planId}/${cid}`);
}

export function submitChallenge(planId,challengeId, content) {
  return ppost(`/pc/fragment/challenge/submit/${planId}/${challengeId}`, {answer: content});
}

export function loadChallengeSubmit(submitId){
  return pget(`/pc/fragment/challenge/show/${submitId}`);
}
