import * as React from "react";
import { connect } from "react-redux";
import { set, alertMsg, startLoad, endLoad } from "redux/actions";
import { loadSelfPlans } from "./async";
import { mark } from '../../../utils/request'
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
    mark({module:"打点",function:"RISE",action:"PC打开计划列表页",memo:"PC"});
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadSelfPlans().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ donePlans: res.msg.donePlans, runningPlans: res.msg.runningPlans })
      } else if(res.code === 401){
        dispatch(alertMsg("提示", "请先登录"));
        setTimeout(() => window.location.href = "/login?callbackUrl=/backend", 500);

      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
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
            {
              runningPlans.length > 0 ?
                this.generatePlansView(runningPlans) :
                <div className="plan-tip">请先去微信”圈外学习号“选择一门小课吧</div>
            }
          </div>
          <div className="plan-splitline"/>
          <div className="plan-plans">
            <span>已完成</span>
            {
              donePlans.length > 0 ?
                this.generatePlansView(donePlans) :
                <div className="plan-tip">暂时没有已完成的小课</div>
            }
          </div>
        </div>
      </div>
    );
  }
}


