import * as React from "react";
import { connect } from "react-redux";
import { renderExist, NumberToChinese, questionList } from "../../../utils/helpers";
import { merge, isBoolean, get, isEmpty } from "lodash";
import { set, startLoad, endLoad, alertMsg } from "redux/actions";
import {
  loadPlan, completePlan, updateOpenRise, markPlan,
  gradeProblem, isRiseMember, learnKnowledge, mark, queryChapterList
} from "./async";
import { mark } from "../../../utils/request"
import * as Async from "./async";
import DropChoice from "../../../components/DropChoice";
import Modal from "../../../components/Modal";
import AssetImg from "../../../components/AssetImg"
import SwipeableViews from "../../../components/SwipeableViews"
import "./Learn.less"
import BreadCrumbs from "../commons/BreadCrumbs/BreadCrumbs";

const typeMap = {
  1: '巩固练习',
  2: '巩固练习',
  11: '应用练习',
  12: '应用练习',
  21: '小目标',
  31: '知识理解',
  32: '知识回顾',
}

@connect(state => state)
export default class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      planData: {},
      knowledge: {},
      showScoreModal: false,
      showCompleteModal: false,
      showConfirmModal: false,
      showDoneAll: false,
      currentIndex: 0,
      showProblem: false,
      selectProblem: {},
      defeatPercent: 0,
      expired: false,
      questionList: questionList,
      showedPayTip: false,
      showEmptyPage: false,
      _t: Math.random(),
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(newProps) {
    this.resize();
    const { dispatch, location } = this.props

    dispatch(set("showHomeIcon", false));

    let { planId } = location.query
    if(newProps) {
      planId = newProps.location.query.planId
    }

    dispatch(startLoad())
    Async.loadPlan(planId).then(res => {
      dispatch(endLoad())
      let { code, msg } = res
      if(code === 200) {
        if(msg !== null) {
          this.setState({ planData: msg, currentIndex: msg.currentSeries,
            selectProblem: msg.problem, mustStudyDays:msg.mustStudyDays })
          //从微信菜单按钮进入且已过期，弹出选新小课弹窗
          if(location.pathname === '/fragment/main' && msg.status === 3) {
            this.setState({ expired: true })
          }
        } else {
          // 当点击导航栏进入学习页面，如果当前无小课，展示空页面
          if(location.pathname === '/fragment/learn') {
            this.setState({
              showEmptyPage: true
            })
          }
        }
      }
      else dispatch(alertMsg(msg))
    }).then(() => this.riseMemberCheck()).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      }
    )
  }

  componentDidMount() {
    mark({ module: "打点", function: "RISE", action: "PC打开学习页", memo: "PC" });
    window.addEventListener('resize', this.resize.bind(this));
    const { planId } = this.props.location.query;
    queryChapterList(planId).then(res => {
      if(res.code === 200) {
        this.setState({ chapterList: res.msg })
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.props.location.query.planId !== newProps.location.query.planId) {
      this.componentWillMount(newProps)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    const { dispatch } = this.props;
    dispatch(set("completePracticePlanId", undefined));
    dispatch(set("showHomeIcon", true));
  }

  resize() {
    this.setState({
      style: {
        // picWidth:window.innerWidth,
        picHeight: (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))
      }
    })
  }

  riseMemberCheck() {
    const { dispatch } = this.props
    return isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({ riseMember: res.msg });
        if(!res.msg) {
          setTimeout(() => {
            this.setState({ riseMemberTips: true });
          }, 10)
        }
      } else {
        dispatch(alertMsg(res.msg));
      }
    });
  }

  handleClickPracticeSelected(item) {
    const { dispatch } = this.props
    const { planData, currentIndex } = this.state
    const { problemId, lockedStatus } = planData
    const { type, practicePlanId, planId, unlocked } = item

    if(!unlocked) {
      if(lockedStatus === -1) {
        dispatch(alertMsg(null, "完成之前的任务，这一组才能解锁<br/>学习和内化，都需要循序渐进哦"))
      }
      if(lockedStatus === -2) {
        dispatch(alertMsg(null, "试用版仅能体验前三节内容<br/>点击右上角按钮，升级正式版吧"))
      }
      if(lockedStatus === -3) {
        dispatch(alertMsg(null, "抱歉哦，课程开放期间，你未能完成前面的练习，导致这个练习无法解锁"))
      }
      return
    }

    // 是否完成
    let complete = false;
    if(item.status === 1){
        complete = true;
    }
    //已解锁状态
    if(type === 1 || type === 2) {
      let integrated = true
      if(type === 1) {
        integrated = false
      }
      if(item.status === 1) {
        this.context ? this.context.router.push({
          pathname: '/fragment/warmup/analysis',
          query: { practicePlanId, currentIndex, integrated, planId, complete }
        }) : null;
      } else {
        this.context ? this.context.router.push({
          pathname: '/fragment/warmup',
          query: { practicePlanId, currentIndex, integrated, planId, complete }
        }) : null;
      }
    } else if(type === 11) {
      this.context ? this.context.router.push({
        pathname: '/fragment/application',
        query: { id: item.practiceIdList[0], currentIndex, integrated: false, planId, practicePlanId, complete }
      }) : null;
    } else if(type === 12) {
      this.context ? this.context.router.push({
        pathname: '/fragment/application',
        query: { id: item.practiceIdList[0], currentIndex, integrated: true, planId, practicePlanId, complete }
      }) : null;
    } else if(type === 21) {
      this.context ? this.context.router.push({
        pathname: '/fragment/challenge',
        query: { id: item.practiceIdList[0], currentIndex, planId, practicePlanId, complete }
      }) : null;
    } else if(type === 31) {
        if (!complete){
            learnKnowledge(practicePlanId).then(res => {
                const { code, msg } = res
                if(code === 200) {
                    this.context ? this.context.router.push({
                            pathname: '/fragment/knowledge',
                            query: { practicePlanId, currentIndex, planId, complete }
                        }) : null;
                }
            })
        } else {
            this.context ? this.context.router.push({
                    pathname: '/fragment/knowledge',
                    query: { practicePlanId, currentIndex, planId, complete }
                }) : null;
        }
    } else if(type === 32) {
      if (!complete){
        learnKnowledge(practicePlanId).then(res => {
            const { code, msg } = res
            if(code === 200) {
                this.context ? this.context.router.push({
                        pathname: '/fragment/knowledge/review',
                        query: { problemId, planId, practicePlanId, complete }
                    }) : null;
            }
        })
      } else {
        this.context ? this.context.router.push({
                pathname: '/fragment/knowledge/review',
                query: { problemId, planId, practicePlanId, complete }
            }) : null;
      }

    }
  }

  handleClickProblemReview(problemId) {
    mark({ module: "打点", function: "RISE", action: "PC打开小课介绍", memo: "PC" });
    // this.context.router.push({pathname: '/fragment/problem/view', query: {id: problemId, show: true}});
    window.open(`/fragment/problem/view?id=${problemId}&show=${true}`, "_blank")
  }

  handleClickGoReport() {
    const { planData = {} } = this.state;
    const { status, reportStatus } = planData;
    if(reportStatus === 3) {
      this.context.router.push({
        pathname: "/fragment/report",
        query: this.props.location.query
      })
    } else {
      this.context.router.push({
        pathname: "/rise/static/problem/explore",
      })
    }
  }

  // 提示购买信息
  handleClickRiseMemberTips() {
    const { dispatch } = this.props;
    dispatch(alertMsg(null, "请在手机微信上升级正式版"));
    mark({ module: "打点", function: "RISE", action: "PC点击升级专业版按钮", memo: "PC" });
  }

  handleClickGoReport() {
    const {planId} = this.props.location.query
    this.context.router.push({
      pathname: '/fragment/report',
      query: {planId: planId}
    });
  }

  handleClickUnComplete() {
    const { dispatch } = this.props
    dispatch(alertMsg(null, `先完成所有的知识理解和巩固练习<br/>才能查看报告哦`))
  }

  handleClickUnMinStudy() {
    const {dispatch} = this.props;
    const { mustStudyDays} = this.state
    dispatch(alertMsg(null, `学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${mustStudyDays}天<br/>之后就可以开启下一小课了`));
  }

  handleClickUnReport() {
    const { dispatch } = this.props
    dispatch(alertMsg(null, "糟糕，你的知识理解和巩固练习部分未完成，无法得出学习报告"))
  }

  handleClickComplete() {
    const {dispatch, location} = this.props
    const {planData = {}} = this.state;
    const {planId} = location.query
    dispatch(startLoad());
    completePlan(planId).then(res => {
      dispatch(endLoad());
      const {code, msg} = res;
      if (code === 200) {
        // 设置完成
        if (planData.hasProblemScore) {
          // 已经评分
          this.handleClickConfirmComplete();
        } else {
          // 未评分
          this.setState({showScoreModal: true, defeatPercent: msg.percent, mustStudyDays: msg.mustStudyDays})
        }
      } else {
        if (code === -1) {
          dispatch(alertMsg(null, `先完成所有的知识理解和巩固练习<br/>才能查看报告哦`))
        } else {
          dispatch(alertMsg(msg))
        }
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  handleClickConfirmNextPlan() {
    this.setState({ showCompleteModal: false, showConfirmModal: true })
  }

  handleSwipeTransitionEnd() {
    const { location } = this.props
    const { planId } = location.query
    const { currentIndex } = this.state
    markPlan(currentIndex, planId)
  }

  handleClickCloseConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  handleClickEssenceShare(problemId, series) {
    this.context.router.push({ pathname: '/rise/static/practice/subject', query: { id: problemId, series } })
  }

  handleClickCloseCompleteModal() {
    this.setState({ showCompleteModal: false })
  }

  handleChangeSection(series) {
    this.setState({ currentIndex: series }, () => {
      const { location } = this.props
      const { planId } = location.query
      markPlan(series, planId)
    });
  }

  handleClickConfirmComplete() {
    const { dispatch, location } = this.props;
    const { planId } = location.query;
    this.context.router.push({
      pathname: '/fragment/report',
      query: { planId: planId }
    });
  }

  handleClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  handleClickTutorialEnd() {
    const { dispatch } = this.props
    const { planData } = this.state
    updateOpenRise().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ planData: merge({}, planData, { openRise: true }) })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  handleClickOpenMessageBox() {
    this.context.router.push({ pathname: '/rise/static/message/center' })
  }

  handleClickSubmitScore(questionList) {
    const { selectProblem, planData } = this.state;
    const { dispatch } = this.props;
    let problemScores = questionList.map(item => {
      let selectedChoice;
      item.choiceList.forEach(choice => {
        if(choice.selected) {
          selectedChoice = choice.id;
        }
      });
      return { question: item.id, choice: selectedChoice };
    });
    dispatch(startLoad());
    gradeProblem(problemScores, selectProblem.id).then(res => {
      dispatch(endLoad());
      this.setState({ showScoreModal: false, planData: merge({}, planData, { hasProblemScore: true }) }, () => {
          this.handleClickConfirmComplete()
        }
      );
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })

  }

  renderModal(openRise, completeSeries, reportStatus, expired, point) {
    let modalList = [];
    modalList.push(
      <Modal show={false}
             buttons={[{ click: () => this.handleClickGoReport(), content: `${reportStatus < 0 ? '选择新小课' : '学习报告'}` }]}
             key={0}
      >
        <div className="content">
          <div className="text">糟糕！好久没学，小课到期了！</div>
        </div>
        <div className="content2">
          <div className="text">你完成了<span className="number">{completeSeries}</span>节</div>
          <div className="text">获得了<span className="number">{point}</span>积分</div>
        </div>
      </Modal>
    );
    return modalList;

  }


  renderSection(item, idx) {
    const {
      planData
    } = this.state
    const { location } = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus
    } = planData


    const renderBtnFooter = (item, idx) => {
      let lastBtn = null;
      if (item.series === totalSeries) {
        // 最后一节，显示完成按钮
        // 对最后一个按钮的渲染
        if (reportStatus === 1) {
          // 可以点击完成按钮
          lastBtn = (
            <div onClick={()=>this.handleClickComplete()}>完成小课</div>
          )
        } else if (reportStatus === 3) {
          // 已经完成，直接打开学习报告
          lastBtn = (
            <div onClick={()=>this.handleClickGoReport()}>学习报告</div>
          )
        } else if (reportStatus === 2) {
          // 未完成最小学习天数
          lastBtn = (
            <div className={` disabled`} onClick={()=>this.handleClickUnMinStudy()}>完成小课</div>
          )
        } else if (reportStatus === -2) {
          // 没有完成，需要先完成
          lastBtn = (
            <div className={` disabled`} onClick={()=>this.handleClickUnComplete()}>完成小课</div>
          )
        } else if (reportStatus === -1) {
          // 开放时间没完成，不能查看学习报告
          lastBtn = (
            <div className={` disabled`} onClick={()=>this.handleClickUnReport()}>完成小课</div>
          )
        } else {
          // 默认去调用一下complete接口
          lastBtn = (
            <div onClick={()=>this.handleClickComplete()}>完成小课</div>
          )
        }
      }
      if(lastBtn){
        return (
          <div className="submit-btn-footer">
            {lastBtn}
          </div>
        )
      } else {
        return null;
      }
    }

    return (
      <div key={idx}>
        <div className="plan-progress">
          <div className="intro">
            <div className="intro-chapter">{'第'+NumberToChinese(item.chapter)+'章'}{'、 '}{item.chapterName}</div>
            <div className="bar"/>
          </div>
          <div className="intro-section">{item.chapter + '.' + item.section}{' '}{item.name}</div>
        </div>
        <div className="plan-main">
          <div className="list">
            {this.renderPractice(item.practices)}
          </div>
          { renderBtnFooter(item, idx) }
          <div className="padding-footer"/>
        </div>
      </div>
    )
  }

  renderSidebar() {
    const {
      currentIndex, planData, showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
      selectProblem, riseMember, riseMemberTips, defeatPercent, chapterList, expired, style
    } = this.state;

    if(selectProblem) {
      return (
        <div className="plan-side-bar">
          <div className="side-header-title">
            <span className="content">{selectProblem.problem}</span>
          </div>

          <div ref="sideContent" className="side-content">
            {chapterList ? chapterList.map((item, key) => {
              return (
                <div key={key} className={`chapter-area`}>
                  <div className="cell">
                    <div className="chapter">
                      <div>
                        <div className="label">{'第'+NumberToChinese(item.chapterId)+'章'}</div>
                        <div className="str">{item.chapter}</div>
                      </div>
                    </div>
                    {item.sectionList.map((section, index) => {
                      return (
                        <div id={`section${section.series}`}
                             className={`hover-cursor ${currentIndex === section.series ? 'open' : ''} section`}
                             onClick={() => {
                               this.handleChangeSection(section.series);
                             }} key={index}>
                          <div>
                            <div className="label">{item.chapterId}.{section.sectionId}</div>
                            <div className="str">{section.section}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }) : null}
          </div>
        </div>
      )
    } else {
      return null;
    }

  }

  renderPractice(list = []) {
    const {_t} = this.state;
    const {completePracticePlanId} = this.props;
    const completePracticeRender = (item) => {
        if (item.status !== 1){
            return null;
        }
        if(completePracticePlanId && completePracticePlanId == item.practicePlanId){
            return (
                <div className="practice-complete">
                    <img src={`https://static.iqycamp.com/images/complete.gif?_t=${_t}`} width={50}/>
                </div>
            )
        } else {
            return (
                <div className="practice-complete">
                    <AssetImg type="complete" size={50}/>
                </div>
            )
        }
    }
    if(!list) {
      return null
    } else {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.handleClickPracticeSelected(item)}>
            <div className="header">
                <div className="practice-thumb">
                    {item.type === 1 || item.type === 2 ? item.status !== 1 ?
                            <AssetImg type="warmup" size={50}/> :
                            <AssetImg type="warmup_complete" size={50}/> : null
                    }
                    {item.type === 11 || item.type === 12 ? item.status !== 1 ?
                            <AssetImg type="application" size={50}/> :
                            <AssetImg type="application_complete" size={50}/> : null
                    }
                    {item.type === 21 ? item.status !== 1 ?
                            <AssetImg type="challenge" size={50}/> :
                            <AssetImg type="challenge_complete" size={50}/> : null
                    }
                    {item.type === 31 || item.type === 32 ? item.status !== 1 ?
                            <AssetImg type="knowledge" size={50}/> :
                            <AssetImg type="knowledge_complete" size={50}/> : null
                    }
                </div>
                {
                    completePracticeRender(item)
                }
            </div>
            {item.unlocked === false ?
              <div className="locked"><AssetImg type="lock" height={24} width={20}/></div> : null
            }
            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
            </div>
            <div className="footer">
              {item.optional === true ? <AssetImg type="optional" width={25} height={12}/> : null}
            </div>
          </div>
        )
      })
    }
  }

  render() {
    const {
      currentIndex, planData, showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
      selectProblem, riseMember, riseMemberTips, defeatPercent, chapterList, expired, style
    } = this.state
    const { location } = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus
    } = planData

    const renderOtherComponents = () => {
      let otherComponentsArr = []
      otherComponentsArr.push(<BreadCrumbs level={0} name={`小课`} show={false}/>)
      return otherComponentsArr
    }

    return (
      <div className="rise-main outer-wrapper">
        {/*<ToolBar />*/}
        {/* 打分 */}
        {renderExist(showScoreModal,
          <DropChoice
            onSubmit={(questionList) => this.handleClickSubmitScore(questionList)}
            onClose={() => this.setState({ showScoreModal: false }, () => {
              this.handleClickConfirmComplete()
            })}
            questionList={this.state.questionList}
          />
        )}
        {/* 各种弹框 */}
        {this.renderModal(openRise, completeSeries, reportStatus, expired, point)}
        {/* 主页面内容 */}
        {renderExist(
          showEmptyPage,
          (
            <div className="empty-container">
              <div className="empty-img">
                <AssetImg url="https://static.iqycamp.com/images/plan_empty.png" style={{ height: '150px' }}/>
              </div>
              <div className="empty-text">
                <span>没有正在学习的小课哦，</span><br/>
                <span>点击按钮去选课吧！</span>
              </div>
              <div className="empty-button"><span onClick={this.handleClickProblemChoose.bind(this)}>去选课</span></div>
            </div>
          ),
          (
            <div className="rise-main" style={{ minHeight: window.innerHeight - 80 }}>
              <div className="side-bar-container" style={{ height: window.innerHeight - 80 }}>
                <div className="side-bar">
                  { this.renderSidebar() }
                </div>

                <div className="side-bar-content">
                  <div className="header-img">
                    <AssetImg url={problem.pic} style={{ height: `${style.picHeight}px`, float: 'right' }}/>
                    {renderExist(isBoolean(riseMember) && !riseMember,
                      <div className={`trial-tip ${riseMemberTips ? 'open' : ''}`}
                           onClick={() => this.handleClickRiseMemberTips()}>
                      </div>)}
                    <div className="plan-guide" style={{ height: `${style.picHeight}px` }}>
                      <div className="section-title">
                        <span className="plan-section-title">{problem.problem}</span>
                        <div className="problem-describe" onClick={() => this.handleClickProblemReview(problem.id)}>
                          小课介绍
                        </div>
                      </div>
                      <div className="section-info">
                        <div className="section">
                          <label>已完成:</label> {completeSeries}/{totalSeries}节训练
                        </div>
                        {renderExist(riseMember,
                          <div className="section">
                            <label>距关闭:</label> {deadline}天
                          </div>
                        )}
                        <div className="section">
                          <label>总得分:</label> {point} 分
                        </div>
                      </div>
                    </div>
                  </div>
                  {renderExist(!isEmpty(planData),
                    (
                      <div style={{ padding: "0 15px" }}>
                        <SwipeableViews ref="planSlider" index={currentIndex - 1}
                                        onTransitionEnd={() => this.handleSwipeTransitionEnd()}
                                        onChangeIndex={(index, indexLatest) => this.handleChangeSection(index + 1)}>
                          {renderExist(sections, sections.map((item, idx) => {
                            return this.renderSection(item, idx)
                          }))}
                        </SwipeableViews>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        {renderOtherComponents()}
      </div>
    );
  }

}
