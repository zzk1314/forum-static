import * as React from "react";
import { connect } from "react-redux";
import { set, alertMsg } from "redux/actions";
import { loadSelfPlans } from "./async";
import AssetImg from "../../../components/AssetImg";
import "./Plan.less";

@connect(state => state)
export default class Plan extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      runningPlans: [],
      donePlans: []
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    loadSelfPlans().then(res => {
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
              <div className="plan-problem" key={index}
                   onClick={() =>
                     this.context.router.push({pathname: "/fragment/learn", query: {planId: item.planId}})
                   }
              >
                <AssetImg width={200} height={120} url={item.pic}/>
                <div className="plan-problem-desc">{item.name}</div>
              </div>
            );
          })
        }
      </div>
    );
  }

  // renderRunningPlans() {
  //   const runningPlans = this.state.runningPlans;
  //   return this.generatePlansView(runningPlans);
  // }
  //
  // renderDonePlans() {
  //   const donePlans = this.state.donePlans;
  //   return this.generatePlansView(donePlans);
  // }

  render() {
    const {runningPlans, donePlans} = this.state

    return (
      <div className="plan-container">
        <div className="plan-content outer-wrapper">
          <div className="plan-header">
            我的小课
          </div>
          <div className="plan-plans">
            <span>进行中</span>
            {this.generatePlansView(runningPlans)}
          </div>
          <div className="plan-splitline"/>
          <div className="plan-plans">
            <span>已完成</span>
            {this.generatePlansView(donePlans)}
          </div>
        </div>
      </div>
    );
  }
}


