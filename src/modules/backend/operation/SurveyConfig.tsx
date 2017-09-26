import React from "react";
import { connect } from "react-redux";

import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { loadSurveyConfigs,updateSurveyConfig } from  "./async"

@connect(state=>state)
export class SurveyConfig extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(startLoad());
    loadSurveyConfigs().then(res=>{

    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render() {
    return (
      <div className="survey-config-page">

      </div>
    )
  }

}
