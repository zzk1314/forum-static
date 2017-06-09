import * as React from 'react';
import { connect } from 'react-redux';
import './Plan.less';
import {set,alertMsg} from "redux/actions"




@connect(state=>state)
export default class Plan extends React.Component<any,any>{
  constructor(){
    super()
    this.state = {}
  }

  componentWillMount(){
  }

  render(){
    return (
      <div className="problem-main">
        <div className="plan-container">
          plan
        </div>
      </div>
    )
  }
}
