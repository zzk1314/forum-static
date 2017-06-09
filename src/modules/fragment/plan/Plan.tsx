import * as React from 'react';
import { connect } from 'react-redux';
import { set, alertMsg } from "redux/actions"
import './Plan.less';
import { pget } from "../../../utils/request";

@connect(state => state)
export default class Plan extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    loadUnChooseList().then(res => {
      console.log(res)
    })
  }

  render

  render() {
    return (
      <div className="plan-container">
        <div className="plan-content outer-wrapper">
          <div className="plan-header">
            我的小课
          </div>
          <div className="plan-plans">
            <span>进行中</span>
            <div className="plan-problem-box">
              <div className="plan-problem">
                <img className="plan-problem-img"/>
                <div className="plan-problem-desc">
                  给自己的未来定一个发展策略
                </div>
              </div>
              <div className="plan-problem">
                <img className="plan-problem-img"/>
                <div className="plan-problem-desc">
                  给自己的未来定一个发展策略
                </div>
              </div>
            </div>
          </div>
          <div className="plan-plans">
            <span>已完成</span>
            <div className="plan-problem-box">
              <div className="plan-problem">
                <img className="plan-problem-img"/>
                <div className="plan-problem-desc">小课描述信息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function loadUnChooseList(){
  return pget("/rise/customer/plans")
}
