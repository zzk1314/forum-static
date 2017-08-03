import * as React from 'react';
import { connect } from 'react-redux';
import './Report.less'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { queryReport } from './async'
import { isNumber, merge } from 'lodash';
import { NumberToChinese } from '../../../utils/helpers'
import { BreadCrumbs } from "../commons/FragmentComponent"
const numeral = require('numeral');

@connect(state => state)
export default class Report extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      width: 375,
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { planId } = this.props.location.query;
    const { dispatch } = this.props;
    dispatch(startLoad());
    queryReport(planId).then((res) => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ planData: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))

  }

  componentDidMount() {
    document.body.scrollTop = 0
  }

  renderChapterScores() {
    const { planData = {} } = this.state;
    const {
      chapterList
    } = planData;
    if(chapterList) {
      return chapterList.map((item, key) => {
        let clazz = 'complete-item ' + (key === 0 ? 'first' : '');
        return (
          <div className={clazz} key={key}>
            <div className="info">
              <span className="name">{NumberToChinese(item.chapter)}、{item.name}</span>
              <div className="clear"></div>
            </div>
            <Progress progressStyle={{ width: `${this.state.width - 170}px` }} score={item.myWarmScore}
                      totalScore={item.totalWarmScore}/>
          </div>
        )
      })
    } else {
      return null;
    }
  }

  renderApplicationScores() {
    const { planData = {} } = this.state;
    const {
      applicationTotalScore, applicationShouldCount, applicationScore, applicationCompleteCount
    } = planData;
    let renderArr = [];

    let applications = (
      <div className="complete-item first">
        <div className="info">
          <span className="name">应用练习完成 <span
            className="big-point">{applicationCompleteCount}</span> / {applicationShouldCount} 份，得分：</span>
          <div className="clear"></div>
        </div>
        <Progress holderClass="article" progressStyle={{ width: `${this.state.width - 170}px` }}
                  score={applicationScore}
                  totalScore={applicationTotalScore}/>
      </div>
    )

    renderArr.push(applications);
    return renderArr;

  }

  chooseNew() {
    const { planData = {}, showConfirmModal } = this.state;
    const { dispatch } = this.props;
    const { status, mustStudyDays } = planData;
    if(status !== 1 && isNumber(mustStudyDays) && mustStudyDays !== 0) {
      dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${mustStudyDays}天<br/>之后就可以开启下一小课了`))
    } else {
      this.setState({ showConfirmModal: true })
    }
  }

  goBack() {
    const { planId } = this.props.location.query;
    const { planData = {} } = this.state;
    this.context.router.push({
      pathname: '/rise/static/learn',
      query: {
        planId: planId ? planId : planData.planId
      }
    });
  }

  nextPlan() {
    const { dispatch, location } = this.props
    const { planId } = location.query
    this.context.router.push("/rise/static/problem/explore")
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false });
  }

  renderBtns() {
    return (
      <div className="button-footer" onClick={this.goBack.bind(this)}>
        返回
      </div>
    )

  }

  render() {
    const { planData = {}, showConfirmModal } = this.state;
    const {
      problem, studyDays, percent, receiveVoteCount, shareVoteCount, totalScore, votedScore
    } = planData;

    return (
      <div className="improvement-report">
        <div className="improvement-report-head">
          <BreadCrumbs level={1} name={`学习报告`}/>
          <div className="improvement-report-header">学习报告</div>
        </div>

        <div className="header" style={{ height: this.picHeight }}>
          <img className="bg" src={`https://static.iqycamp.com/images/study_report_bg.jpeg`}/>
          <div className="msg">
            <div className="title">
              学习报告
            </div>
            <div className="problem-title">
              小课：{problem}
            </div>
            <div className="sub-text">
              总得分：<span className="socre top">{totalScore}</span> ，打败了<span className="percent"> {percent}% </span>的同学
            </div>
            <div className="time">
              学习时长：{studyDays === -1 ? '30天' : `${studyDays} 天`}
            </div>
          </div>
        </div>
        <div className="body-container">
          <div className="body">
            <div className="header">
              <span className="title">各章巩固练习得分</span>
            </div>
            {this.renderChapterScores()}
          </div>

          <div className="body" style={{ marginTop: '36px' }}>
            <div className="header">
              <span className="title">应用题</span>
            </div>
            {this.renderApplicationScores()}
            <div className="vote-info">
              共送出 <span className="big-point">{shareVoteCount}</span> 个赞，收获 <span
              className="big-point">{receiveVoteCount}</span> 个赞<br/>
              获得 <span className="big-point">{votedScore}</span> 积分 <span className="tips">（1被赞=2积分）</span>
            </div>
          </div>
          <div className="tips">选课需要在微信”圈外同学“中操作哦</div>
          <div className="padding-footer" style={{ height: '80px' }}/>
        </div>
      </div>
    )
  }
}

class Progress extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculatePercent(score, total) {
    let tempScore = score / total;
    if(isNumber(tempScore)) {
      if(tempScore < 0) {
        tempScore = 0;
      } else if(tempScore > 1) {
        tempScore = 1;
      }

      tempScore = numeral(tempScore * 100).format('0.00');
    } else {
      tempScore = 0;
    }
    return tempScore;
  }

  render() {
    let progressStyle = merge({ width: '50%' }, this.props.progressStyle);

    return (
      <div>
        <div className="progress" style={progressStyle}>
          <div className="track"/>
          <div className={`holder ${this.props.holderClass ? this.props.holderClass : ''}`}
               style={{ width: `${this.calculatePercent(this.props.score, this.props.totalScore)}%` }}>
          </div>
        </div>
        <span className="score"><span className="point number">{this.props.score}</span> / <span
          className="number">{this.props.totalScore}</span></span>
      </div>
    )
  }
}
