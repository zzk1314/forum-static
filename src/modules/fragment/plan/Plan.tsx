import * as React from 'react';
import { connect } from 'react-redux';
import { set, alertMsg } from "redux/actions"
import './Plan.less';

@connect(state => state)
export default class Plan extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="plan-container">
        <div></div>
      </div>
    )
  }
}
