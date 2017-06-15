import * as React from "react";
import { connect } from "react-redux";
import { set, alertMsg, startLoad, endLoad } from "redux/actions";
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
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadSelfPlans().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ donePlans: res.msg.donePlans, runningPlans: res.msg.runningPlans })
      }
    }).catch(ex => {
      dispatch(endLoad());
      console.error(ex);
    });
  }

  generatePlansView(plans) {
    if(!plans) {
      return
    }
    return (
      <div className="plan-problem-box">
        {plans.map((item, index) => {
          return (
            <div className="plan-problem" key={index}
                 onClick={() =>
                   this.context.router.push({ pathname: "/fragment/learn", query: { planId: item.planId } })
                 }>
              <AssetImg width={210} height={98} url={item.pic}/>
              <div className="plan-problem-desc">{item.name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { runningPlans, donePlans } = this.state
    return (
      <div className="plan-container">
        <div className="plan-content" style={{ minHeight: window.innerHeight - 50 }}>
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


