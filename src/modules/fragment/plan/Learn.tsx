import * as React from "react";
import { connect } from "react-redux";
import { renderExist, NumberToChinese, questionList } from "../../../utils/helpers";
import { merge, isBoolean, get, isEmpty } from "lodash";
import { set, startLoad, endLoad, alertMsg } from "redux/actions";
import {
  loadPlan, completePlan, updateOpenRise, markPlan,
  gradeProblem, isRiseMember, learnKnowledge, mark, queryChapterList
} from "./async";
import * as Async from "./async";
import DropChoice from "../../../components/DropChoice";
import Modal from "../../../components/Modal";
import AssetImg from "../../../components/AssetImg"
import SwipeableViews from "../../../components/SwipeableViews"
import AlertMessage from "../../../components/AlertMessage"
import "./Learn.less"

const typeMap = {
  1: '巩固练习',
  2: '巩固练习',
  11: '应用练习',
  12: '综合练习',
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
      nextModal: {
        actions: [
          {label: '我不听', onClick: () => this.handleClickConfirmComplete(true)},
          {label: '好的', onClick: () => this.setState({showWarningModal: false})}
        ],
      },
      showEmptyPage: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(newProps) {
    this.resize();
    const {dispatch, location} = this.props

    dispatch(set("showHomeIcon", false));

    let {planId} = location.query
    if(newProps) {
      planId = newProps.location.query.planId
    }

    dispatch(startLoad())
    Async.loadPlan(planId).then(res => {
      dispatch(endLoad())
      let {code, msg} = res
      if(code === 200) {
        if(msg !== null) {
          this.setState({planData: msg, currentIndex: msg.currentSeries, selectProblem: msg.problem})
          //从微信菜单按钮进入且已过期，弹出选新小课弹窗
          if(location.pathname === '/fragment/main' && msg.status === 3) {
            this.setState({expired: true})
          }
        } else {
          // 当点击导航栏进入学习页面，如果当前无小课，展示空页面
          if(location.pathname === '/fragment/learn') {
            this.setState({
              showEmptyPage: true
            })
          } else {
            alert('进入欢迎页面');
            // this.context.router.push({
            //   pathname: '/rise/static/welcome'
            // })
          }
        }
      }
      else dispatch(alertMsg(msg))
    }).then(() => this.riseMemberCheck()).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      }
    )
    if(navigator.userAgent.indexOf('WindowsWechat') !== -1) {
      this.setState({windowsClient: true})
    } else {
      this.setState({windowsClient: false})
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    const {planId} = this.props.location.query;
    queryChapterList(planId).then(res => {
      if(res.code === 200) {
        this.setState({chapterList: res.msg})
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
    const {dispatch} = this.props;
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
    const {dispatch} = this.props
    return isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({riseMember: res.msg});
        if(!res.msg) {
          setTimeout(() => {
            this.setState({riseMemberTips: true});
          }, 10)

        }
      } else {
        dispatch(alertMsg(res.msg));
      }
    });
  }

  handleClickPracticeSelected(item) {
    const {dispatch} = this.props
    const {planData, currentIndex} = this.state
    const {problemId, lockedStatus} = planData
    const {type, practicePlanId, planId, unlocked} = item

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
    //已解锁状态
    if(type === 1 || type === 2) {
      let integrated = true
      if(type === 1) {
        integrated = false
      }
      if(item.status === 1) {
        this.context ? this.context.router.push({
          pathname: '/fragment/warmup/analysis',
          query: {practicePlanId, currentIndex, integrated, planId}
        }) : null;
      } else {
        this.context ? this.context.router.push({
          pathname: '/fragment/warmup',
          query: {practicePlanId, currentIndex, integrated, planId}
        }) : null;
      }
    } else if(type === 11) {
      this.context ? this.context.router.push({
        pathname: '/fragment/application',
        query: {id: item.practiceIdList[0], currentIndex, integrated: false, planId}
      }) : null;
    } else if(type === 12) {
      this.context ? this.context.router.push({
        pathname: '/fragment/application',
        query: {id: item.practiceIdList[0], currentIndex, integrated: true, planId}
      }) : null;
    } else if(type === 21) {
      this.context ? this.context.router.push({
        pathname: '/fragment/challenge',
        query: {id: item.practiceIdList[0], currentIndex, planId}
      }) : null;
    } else if(type === 31) {
      this.context ? this.context.router.push({
        pathname: '/fragment/knowledge',
        query: {practicePlanId, currentIndex, planId}
      }) : null;
    } else if(type === 32) {
      learnKnowledge(practicePlanId).then(res => {
        const {code, msg} = res
        if(code === 200) {
          this.context ? this.context.router.push({
            pathname: '/fragment/knowledge/review',
            query: {problemId, planId}
          }) : null;
        }
      })
    }
  }

  handleClickProblemReview(problemId) {
    mark({module: "打点", function: "PC", action: "打开小课介绍", memo: problemId});
    this.context.router.push({pathname: '/fragment/problem/view', query: {id: problemId, show: true}});
  }

  handleClickGoReport() {
    const {planData = {}} = this.state;
    const {status, reportStatus} = planData;
    if(reportStatus === 3) {
      this.context.router.push({
        pathname: "/rise/static/plan/report",
        query: this.props.location.query
      })
    } else {
      this.context.router.push({
        pathname: "/rise/static/problem/explore",
        // query:this.props.location.query
      })
    }
  }

  // 提示购买信息
  handleClickRiseMemberTips() {
    const {dispatch} = this.props;
    dispatch(alertMsg(null, "请在手机微信上升级正式版"));
    // mark({module: "打点", function: "升级专业版", action: "点击升级专业版按钮", memo: "首页"}).then(() => {
    //   window.location.href = `https://${window.location.hostname}/pay/pay`
    // })
  }

  handleClickComplete() {
    const {dispatch, location} = this.props
    const {planData = {}} = this.state;
    const {planId} = location.query
    const {status, reportStatus} = planData;

    if(reportStatus === 3) {
      this.context.router.push({
        pathname: '/rise/static/plan/report',
        query: {planId: planId}
      });
    } else if(reportStatus === -1) {
      dispatch(alertMsg("糟糕，你的知识理解和巩固练习部分未完成，无法得出学习报告"))
    } else {
      dispatch(startLoad());
      completePlan(planId).then(res => {
        dispatch(endLoad());
        const {code, msg} = res;
        if(code === 200) {
          // 设置完成
          if(planData.hasProblemScore) {
            // 已经评分
            //
            // this.setState({defeatPercent: msg.percent, mustStudyDays: msg.mustStudyDays},()=>{
            //   this.confirmComplete();
            // })
            this.confirmComplete();
          } else {
            // 未评分
            this.setState({showScoreModal: true, defeatPercent: msg.percent, mustStudyDays: msg.mustStudyDays})
          }
        } else {
          if(code === -1) {
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
  }

  handleClickConfirmNextPlan() {
    this.setState({showCompleteModal: false, showConfirmModal: true})
  }

  handleSwipeTransitionEnd() {
    const {location} = this.props
    const {planId} = location.query
    const {currentIndex} = this.state
    markPlan(currentIndex, planId)
  }

  handleClickCloseConfirmModal() {
    this.setState({showConfirmModal: false})
  }

  handleClickEssenceShare(problemId, series) {
    this.context.router.push({pathname: '/rise/static/practice/subject', query: {id: problemId, series}})
  }

  handleClickCloseCompleteModal() {
    this.setState({showCompleteModal: false})
  }

  handleChangeSection(series) {
    this.setState({currentIndex: series}, () => {
      const {location} = this.props
      const {planId} = location.query
      markPlan(series, planId)
    });
  }

  handleClickConfirmComplete(force) {
    const {dispatch, location} = this.props;
    const {planData, mustStudyDays} = this.state
    const {planId} = location.query
    const {doneAllIntegrated} = planData
    if(!force && !doneAllIntegrated) {
      this.setState({showCompleteModal: false, showWarningModal: true})
      return
    }
    this.context.router.push({
      pathname: '/rise/static/plan/report',
      query: {planId: planId}
    });
  }

  handleClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  handleClickTutorialEnd() {
    const {dispatch} = this.props
    const {planData} = this.state
    updateOpenRise().then(res => {
      const {code, msg} = res
      if(code === 200) {
        this.setState({planData: merge({}, planData, {openRise: true})})
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  handleClickOpenMessageBox() {
    this.context.router.push({pathname: '/rise/static/message/center'})
  }

  handleClickSubmitScore(questionList) {
    const {selectProblem, planData} = this.state;
    const {dispatch} = this.props;
    let problemScores = questionList.map(item => {
      let selectedChoice;
      item.choiceList.forEach(choice => {
        if(choice.selected) {
          selectedChoice = choice.id;
        }
      });
      return {question: item.id, choice: selectedChoice};
    });
    dispatch(startLoad());
    gradeProblem(problemScores, selectProblem.id).then(res => {
      dispatch(endLoad());
      this.setState({showScoreModal: false, planData: merge({}, planData, {hasProblemScore: true})}, () => {
          this.confirmComplete()
        }
      );
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })

  }

  renderModal(openRise, completeSeries, reportStatus, showWarningModal, expired, point) {
    let modalList = [];
    // modalList.add(
    //   <Tutorial show={isBoolean(openRise) && !openRise} onShowEnd={() => this.handleClickTutorialEnd()}/>
    // );
    modalList.push(
      <Modal show={false}
             buttons={[{click: () => this.handleClickGoReport(), content: `${reportStatus < 0 ? '选择新小课' : '学习报告'}`}]}
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
    modalList.push(
      <AlertMessage { ...this.state.nextModal }
                    open={!!showWarningModal}
                    key={1}
                    handleClose={() => this.setState({showWarningModal: false})}
                    content="我们发现你的综合练习还没有完成，这会影响你的学习报告内容,建议先返回完成它们"
      />
    );
    return modalList;

  }

  renderSection(item, idx) {
    const {
      currentIndex, planData, showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
      selectProblem, riseMember, riseMemberTips, defeatPercent, showWarningModal, chapterList, expired, style
    } = this.state
    const {location} = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus
    } = planData

    return (
      <div key={idx}>
        <div className="plan-progress">
          <div className="intro">
            <div className="intro-chapter">{NumberToChinese(item.chapter)}{'、 '}{item.chapterName}</div>
            <div className="bar"/>
          </div>
          <div className="intro-section">{item.chapter + '.' + item.section}{' '}{item.name}</div>
        </div>
        <div className="plan-main">
          <div className="list">
            {this.renderPractice(item.practices)}
          </div>
          {windowsClient ?
            <div className="submit-btn-footer">
              <div className={`left origin ${item.series === 1 ? ' disabled' : ''}`}
                   onClick={() => this.handleChangeSection(item.series - 1)}>上一节
              </div>
              { item.series !== totalSeries ?
                <div className={`right`} onClick={() => this.handleChangeSection(item.series + 1)}>下一节</div> : null }
              { item.series === totalSeries ?
                <div className={`right ${reportStatus < 0 ? 'grey' : ''}`} onClick={() => this.handleClickComplete()}>
                  学习报告</div> : null }
            </div>
            : null}
          { item.series === totalSeries && !windowsClient ?
            <div className={`submit-btn-footer ${reportStatus < 0 ? 'grey' : ''}`}
                 onClick={() => this.handleClickComplete()}>
              学习报告</div> : null}
          <div className="padding-footer"></div>
        </div>
      </div>
    )
  }

  renderSidebar() {
    const {
      currentIndex, planData, showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
      selectProblem, riseMember, riseMemberTips, defeatPercent, showWarningModal, chapterList, expired, style
    } = this.state
    const {location} = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus
    } = planData

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
                        <div className="label">{NumberToChinese(item.chapterId)}、</div>
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
    if(!list) {
      return null
    } else {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.handleClickPracticeSelected(item)}>
            <div className="header">
              {item.type === 1 || item.type === 2 ? item.status !== 1 ?
                <AssetImg type="warmup" size={50}/> :
                <AssetImg type="warmup_complete" size={50}/> : null
              }
              {item.type === 11 ? item.status !== 1 ?
                <AssetImg type="application" size={50}/> :
                <AssetImg type="application_complete" size={50}/> : null
              }
              {item.type === 12 ? item.status !== 1 ?
                <AssetImg type="integrated" size={50}/> :
                <AssetImg type="integrated_complete" size={50}/> : null
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
            {item.unlocked === false ?
              <div className="locked"><AssetImg type="lock" height={24} width={20}/></div> : null
            }
            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
            </div>
            <div className="footer">
              {item.optional === true ? <AssetImg type="optional" width={25} height={12}/> : null}
              {item.type === 12 ? <AssetImg type="recommend" width={45} height={12}/> : null}
            </div>
          </div>
        )
      })
    }
  }

  render() {
    const {
      currentIndex, planData, showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
      selectProblem, riseMember, riseMemberTips, defeatPercent, showWarningModal, chapterList, expired, style
    } = this.state
    const {location} = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus
    } = planData

    return (
      <div className="rise-main outer-wrapper">
        {/*<ToolBar />*/}
        {/* 打分 */}
        {renderExist(showScoreModal,
          <DropChoice
            onSubmit={(questionList) => this.handleClickSubmitScore(questionList)}
            onClose={() => this.setState({showScoreModal: false}, () => {
              this.handleClickConfirmComplete()
            })}
            questionList={this.state.questionList}
          />
        )}
        {/* 各种弹框 */}
        {this.renderModal(openRise, completeSeries, reportStatus, showWarningModal, expired, point)}
        {/* 主页面内容 */}
        {renderExist(
          showEmptyPage,
          (
            <div className="empty-container">
              <div className="empty-img">
                <AssetImg url="http://static.iqycamp.com/images/plan_empty.png" style={{height: '150px'}}/>
              </div>
              <div className="empty-text">
                <span>没有正在学习的小课哦，</span><br/>
                <span>点击按钮去选课吧！</span>
              </div>
              <div className="empty-button"><span onClick={this.handleClickProblemChoose.bind(this)}>去选课</span></div>
            </div>
          ),
          (
            <div className="rise-main">
              <div className="side-bar-container">
                <div className="side-bar">
                  { this.renderSidebar(selectProblem) }
                </div>
                <div className="side-bar-content">
                  <div className="header-img">
                    <AssetImg url={problem.pic} style={{height: `${style.picHeight}px`, float: 'right'}}/>
                    {renderExist(isBoolean(riseMember) && !riseMember,
                      <div className={`trial-tip ${riseMemberTips ? 'open' : ''}`}
                           onClick={() => this.handleClickRiseMemberTips()}>
                      </div>)}
                    <div className="plan-guide" style={{height: `${style.picHeight}px`}}>
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
                  {/*<div className="function-menu">*/}
                  {/*<div className="left" onClick={() => this.handleClickEssenceShare(problem.id, currentIndex)}>*/}
                  {/*<span className="essence"><AssetImg type="essence" height={13} width={19}/></span>*/}
                  {/*<span>小课论坛</span>*/}
                  {/*</div>*/}
                  {/*<div className="right" onClick={() => this.handleClickProblemReview(problem.id)}>*/}
                  {/*<span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>*/}
                  {/*<span>小课介绍</span>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {renderExist(!isEmpty(planData),
                    (
                      <div style={{padding: "0 15px"}}>
                        <SwipeableViews ref="planSlider" index={currentIndex - 1}
                                        onTransitionEnd={() => this.handleSwipeTransitionEnd()}
                                        onChangeIndex={(index, indexLatest) => this.handleChangeSection(index + 1)}>
                          {renderExist(sections, sections.map((item, idx) => {
                            return this.renderSection(item, idx, windowsClient, totalSeries)
                          }))}
                        </SwipeableViews>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

}
