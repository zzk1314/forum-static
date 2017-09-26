import {pget,ppost} from "../../../utils/request"

export function loadSurveyConfigs(){
  return pget('/rise/operation/survey/config/list');
}

export function updateSurveyConfig(){
  return ppost('/rise/operation/survey/config',{id:id,activity:activity,name:name,realHref:realHref})
}
