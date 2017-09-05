import React from "react";
import { connect } from "react-redux";

import {  } from  "./async"

@connect(state=>state)
export class SurveyConfig extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="survey-config-page">

      </div>
    )
  }

}
