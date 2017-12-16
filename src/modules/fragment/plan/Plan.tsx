import * as React from 'react'
import { connect } from 'react-redux'
import { set, alertMsg, startLoad, endLoad } from 'redux/actions'
import { checkIsFollow, loadSelfPlans } from './async'
import { mark } from '../../../utils/request'
import AssetImg from '../../../components/AssetImg'
import _ from "lodash"

import './Plan.less'

interface PlanStates {
  // 进行中计划
  runningPlans: object;
  // 已完成计划
  completedPlans: object;
  // 是否正在获取数据
  isloading: boolean;
  isFollow: boolean;
}
@connect(state => state)
export default class Plan extends React.Component<any, PlanStates> {

  constructor() {
    super()
    this.state = {
      runningPlans: [],
      completedPlans: [],
      auditions: [],
      isloading: true,
      isFollow: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "RISE", action: "PC打开计划列表页", memo: "PC" });
    const { dispatch } = this.props;
    dispatch(startLoad());
    checkIsFollow().then(res => {
      if(res.code === 401) {
        dispatch(endLoad())
        this.context.router.push("/login")
      } else if(res.code === 403) {
        dispatch(endLoad())
        this.setState({ isloading: false, isFollow: false })
      } else {
        loadSelfPlans().then(res => {
          this.setState({ isloading: false })
          dispatch(endLoad())
          const { code, msg } = res
          if(code === 200) {
            this.setState({
              runningPlans: msg.runningPlans, completedPlans: msg.completedPlans, auditions: msg.auditions
            })
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      }
    })
  }

  handleClickPlan(plan) {
    const { learnable, startDate } = plan
    const { dispatch } = this.props
    if(learnable) {
      this.context.router.push({
        pathname: '/fragment/learn',
        query: { planId: plan.planId }
      })
    } else {
      dispatch(alertMsg(`训练营将于${startDate}统一开营\n在当天开始学习哦！`))
    }
  }

  generatePlansView(plans) {
    if(!plans) {
      return
    }
    return (
      <div className="plan-problem-box">
        {plans.map((plan, index) => {
          return (
            <div
              className="plan-problem" key={index}
              onClick={() => this.handleClickPlan(plan)}>
              <div className="problem-item">
                <div className={`problem-item-backcolor catalog${plan.problem.catalogId}`}/>
                <div className={`problem-item-backimg catalog${plan.problem.catalogId}`}/>
                <div className="problem-item-subCatalog">{plan.problem.abbreviation}</div>
              </div>
              <div className="plan-problem-desc">{plan.name}</div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { runningPlans = [], completedPlans = [], isloading, isFollow, auditions = [] } = this.state

    console.log(auditions)
    const renderAuditionPlans = () => {
      return this.generatePlansView(auditions)
    }

    const renderRunningPlans = () => {
      if(runningPlans.length > 0) {
        return this.generatePlansView(runningPlans)
      } else {
        return (
          <div className="plan-tip">请先去微信”圈外同学“选择一门小课吧</div>
        )
      }
    }

    const renderCompletePlans = () => {
      if(completedPlans.length > 0) {
        return this.generatePlansView(completedPlans)
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
            {renderCompletePlans()}
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
    )
  }
}


