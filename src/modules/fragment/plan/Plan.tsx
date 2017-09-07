import * as React from "react";
import { connect } from "react-redux";
import { set, alertMsg, startLoad, endLoad } from "redux/actions";
import { checkIsFollow, loadSelfPlans } from "./async";
import { mark } from '../../../utils/request'
import AssetImg from "../../../components/AssetImg";
import { ModuleHeader } from "../commons/FragmentComponent"

import "./Plan.less";

interface PlanStates {
  // 进行中计划
  runningPlans: object;
  // 已完成计划
  donePlans: object;
  // 是否正在获取数据
  isloading: boolean;
  isFollow: boolean;
}
@connect(state => state)
export default class Plan extends React.Component<any, PlanStates> {

  constructor() {
    super();
    this.state = {
      runningPlans: [],
      donePlans: [],
      isloading: true,
      isFollow: true
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "RISE", action: "PC打开计划列表页", memo: "PC" });
    const { dispatch } = this.props;
    dispatch(startLoad());
    // TODO 取消注释
    // checkIsFollow().then(res => {
    //   if(res.code === 401) {
    //     dispatch(endLoad())
    //     this.context.router.push("/login")
    //   } else if(res.code === 403) {
    //     dispatch(endLoad())
    //     this.setState({ isloading: false, isFollow: false })
    //   } else {
        loadSelfPlans().then(res => {
          this.setState({ isloading: false })
          dispatch(endLoad())
          const { code, msg } = res
          if(code === 200) {
            this.setState({ runningPlans: msg.runningPlans, donePlans: msg.donePlans })
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
    //   }
    // })
  }

  generatePlansView(plans) {
    if(!plans) {
      return
    }
    return (
      <div className="plan-problem-box">
        {plans.map((item, index) => {
          return (
            <div
              className="plan-problem" key={index}
              onClick={() => this.context.router.push({ pathname: "/fragment/learn", query: { planId: item.planId } })}>
              <AssetImg height={127.5} url={item.pic}/>
              <div className="plan-problem-desc">{item.name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { runningPlans, donePlans, isloading, isFollow } = this.state

    const renderRunningPlans = () => {
      if(runningPlans.length > 0) {
        return this.generatePlansView(runningPlans)
      } else {
        return (
          <div className="plan-tip">请先去微信”圈外同学“选择一门小课吧</div>
        )
      }
    }

    const renderDonePlans = () => {
      if(donePlans.length > 0) {
        return this.generatePlansView(donePlans)
      } else {
        return <div className="plan-tip">暂时没有已完成的小课</div>
      }
    }

    const renderAllPlans = () => {
      return (
        <div>
          <div className="plan-header">我的小课</div>
          <div className="plan-plans">
            <span>进行中</span>
            {renderRunningPlans()}
          </div>
          <div className="plan-splitline"/>
          <div className="plan-plans">
            <span>已完成</span>
            {renderDonePlans()}
          </div>
        </div>
      )
    }

    const renderNoPermissionTips = () => {
      return (
        <div className="qr-code">
          <div className="tip-top">扫码关注</div>
          <AssetImg url="https://static.iqycamp.com/images/serverQrCode.jpg?imageslim" size={282}/>
          <div className="tip-bottom">扫一扫关注 “圈外同学”</div>
        </div>
      )
    }

    return (
      <div className="plan-container">
        <div className="plan-content" style={{ minHeight: window.innerHeight - 50 }}>
          {!isloading ?
            <div>
              {
                isFollow ?
                  renderAllPlans() :
                  renderNoPermissionTips()
              }
            </div> : null}
        </div>
      </div>
    );
  }
}


