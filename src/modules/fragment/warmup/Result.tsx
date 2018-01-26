import * as React from "react";
import { connect } from "react-redux";
import "./Result.less";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import { BreadCrumbs } from "../commons/FragmentComponent";

@connect(state => state)
export default class Result extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit() {
    this.context.router.push({ pathname: '/fragment/warmup/analysis', query: this.props.location.query })
  }

  nextTask() {
    const { dispatch } = this.props
    const { series, planId } = this.props.location.query
    this.context.router.push({
      pathname: '/fragment/learn',
      query: { series, planId }
    })
  }

  render() {
    const { rightNumber, point, total } = this.props.location.query
    const { data } = this.state

    return (
      <div>
        <div className="container has-footer outer-wrapper">
          <div className="warm-up-result">
            <div className="warm-up-result-head">
              <BreadCrumbs level={1} name="选择题"/>
              <div className="page-header">{'选择题'}</div>
            </div>
            <div className="intro-container">
              <div className="section">
                <div className="section-title">答对题数</div>
                <div className="count-circle">
                  <div className="context-img">
                    <div className="answer-pic">
                      {rightNumber === total ? <AssetImg width={300} height={210} style={{ margin: '0 auto' }}
                                                         url="https://static.iqycamp.com/images/answer_allright.png"/>
                        : <AssetImg style={{ margin: '0 auto' }} width={300} height={210}
                                    url="https://static.iqycamp.com/images/answer_not_allright.png"/>}
                      <div className="answer-word"><span className="answer-right">{rightNumber}</span><span
                        className="answer-total">{'/ '}{total}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="section-title">任务得分</div>
                <div className="count">
                  <span className="count-main">{point}</span><span className="count-sub">分</span>
                </div>
              </div>
            </div>
            <div className="button-footer">
              <div className="left" onClick={()=>this.nextTask()}>返回</div>
              <div className="right" onClick={()=>this.onSubmit()}>答题解析</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
