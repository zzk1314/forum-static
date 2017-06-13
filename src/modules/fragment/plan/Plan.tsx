import * as React from "react";
import { connect } from "react-redux";
import { set, alertMsg } from "redux/actions";
import { pget } from "../../../utils/request";
import "./Plan.less";
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export default class Plan extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      runningPlans: [],
      donePlans: []
    };
  }

  componentWillMount() {
    loadSelfPlans().then(res => {
      console.log(res);
      if(res.code === 200) {
        this.setState({donePlans: res.msg.donePlans, runningPlans: res.msg.runningPlans})
      }
    });
  }

  generatePlansView(plans) {
    if(!plans) {
      return;
    }
    return (
      <div className="plan-problem-box">
        {
          plans.map((item, index) => {
            return (
              <div className="plan-problem" key={index}>
                <AssetImg width={200} height={120} url="https://static.iqycamp.com/images/fragment/problem1_3.png"/>
                <div className="plan-problem-desc">{item.name}</div>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderRunningPlans() {
    const runningPlans = this.state.runningPlans;
    return this.generatePlansView(runningPlans);
  }

  renderDonePlans() {
    const donePlans = this.state.donePlans;
    return this.generatePlansView(donePlans);
  }

  render() {
    console.log(this.state);
    return (
      <div className="plan-container">
        <div className="plan-content outer-wrapper">
          <div className="plan-header">
            我的小课
          </div>
          <div className="plan-plans">
            <span>进行中</span>
            {this.renderRunningPlans()}
          </div>
          <div className="plan-splitline"></div>
          <div className="plan-plans">
            <span>已完成</span>
            {this.renderDonePlans()}
          </div>
        </div>
      </div>
    );
  }
}

function loadSelfPlans() {
  return pget("/rise/customer/plans")
}
