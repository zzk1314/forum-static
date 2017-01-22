import * as React from "react"
import {connect} from "react-redux"
import VerticalBarLoading from "../../components/VerticalBarLoading"
import {loadCurProblemId, loadAccount, loadRiseWorkList} from "./async";
import * as _ from "lodash"
import {set, alertMsg} from "redux/actions"
import {BreakSignal, Stop} from "../../utils/request"
import "./Rise.less"

@connect(state => state)
export default class Rise extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      challengeLoading: false,
      applicationLoading: false,
      challengeList: [],
      applicationList: [],
    }
  }

  loadProblem() {
    // 查看是否有pid
    const {location} = this.props;
    const problemId = _.get(location, "query.problemId");
    // 传了problemId
    if (problemId) {
      console.log("has problemId");
      return Promise.resolve(problemId);
    } else {
      // 没传problemId,加载当前问题
      return loadCurProblemId().then(res => {
        if (res.code === 200) {
          console.log("当前问题：", res.msg);
          return res.msg;
        } else if(res.code === 20001){
          this.context.router.push("/servercode");
          throw new Stop();
        } else {
          throw new BreakSignal(res.msg, "加载当前问题失败")
        }
      });
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.query.problemId !== newProps.location.query.problemId){
      console.log("newProps")
      const {dispatch} = newProps;
      this.setState({applicationLoading: true, challengeLoading: true});
      // 加载用户信息
      loadAccount().then(res => {
        const {code, msg} = res;
        if (code === 200) {
          window.ENV.userName = msg.weixinName;
          window.ENV.headImage = msg.headimgUrl;
        } else if (code === 401) {
          setTimeout(() => window.location.href = "/login", 2000);
          throw new BreakSignal("请先登录");
        } else {
          throw new BreakSignal(msg);
        }
      }).then(() => {
        return this.loadProblem();
      }).then(problemId => {
        // 这里根据问题id去加挑战任务和应用任务
        const {dispatch} = newProps;
        dispatch(set("activeProblemId",problemId));
        return loadRiseWorkList(problemId)
          .then(res => {
            if (res.code === 200) {
              this.setState({
                challengeList: res.msg.challengeWorkList,
                applicationList: res.msg.applicationWorkList,
                applicationLoading: false,
                challengeLoading: false
              });
            } else if(res.code===20001){
              this.context.router.push("/servercode");
            } else {
              throw BreakSignal(res.msg, "加载作业失败");
            }
          });
      }).catch(err => {
        this.setState({challengeLoading: false, applicationLoading: false});
        if (err instanceof BreakSignal) {
          dispatch(alertMsg(err.title, err.msg));
        } else if (!(err instanceof Stop)) {
          dispatch(alertMsg("异常信息", _.toString(err)));
        }
      });
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    this.setState({applicationLoading: true, challengeLoading: true});
    // 加载用户信息
    loadAccount().then(res => {
      const {code, msg} = res;
      if (code === 200) {
        window.ENV.userName = msg.weixinName;
        window.ENV.headImage = msg.headimgUrl;
      } else if (code === 401) {
        setTimeout(() => window.location.href = "/login?callbackUrl=/fragment/rise", 2000);
        throw new BreakSignal("请先登录");
      } else {
        throw new BreakSignal(msg);
      }
    }).then(() => {
      return this.loadProblem();
    }).then(problemId => {
      // 这里根据问题id去加挑战任务和应用任务
      const {dispatch} = this.props;
      dispatch(set("activeProblemId",problemId));
      return loadRiseWorkList(problemId)
        .then(res => {
          if (res.code === 200) {
            this.setState({
              challengeList: res.msg.challengeWorkList,
              applicationList: res.msg.applicationWorkList,
              applicationLoading: false,
              challengeLoading: false
            });
          } else if(res.code===20001){
            this.context.router.push("/servercode");
          } else {
            throw BreakSignal(res.msg, "加载作业失败");
          }
        });
    }).catch(err => {
      this.setState({challengeLoading: false, applicationLoading: false});
      if (err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        dispatch(alertMsg("异常信息", _.toString(err)));
      }
    });
  }

  goEdit(planId,workId,type){
    console.log("go",planId,workId,type);
    if(_.isEqual(type,"challenge")){
      this.context.router.push({
        pathname:"/fragment/challenge",
        query:{planId:planId,challengeId:workId}
      })
    } else {
      this.context.router.push({
        pathname:"/fragment/application",
        query:{planId:planId,applicationId:workId}
      })
    }
  }

  goList(planId,workId,type){
    console.log("go",planId,workId,type);
    if(_.isEqual(type,"challenge")){
      this.context.router.push({
        pathname:"/fragment/challenge/list",
        query:{planId:planId,challengeId:workId}
      })
    } else {
      this.context.router.push({
        pathname:"/fragment/application/list",
        query:{planId:planId,applicationId:workId}
      })
    }
  }

  render() {
    const {applicationList, challengeList} = this.state;
    const renderWorkStatus = (status, unlocked,type) => {
      if (!unlocked) {
        // 未解锁
        return (
          <img style={{marginTop: "-8px"}} src="http://www.iquanwai.com/images/pcWorkLock.png"/>
        )
      } else {
        // 已解锁
        if (status === 0) {
          return (
            <img src="http://www.iquanwai.com/images/pcWorkGo.png"/>
          )
        } else if (status === 1) {
          if(_.isEqual("application",type)){
            return (
              <img style={{marginTop: "-8px"}}  src="http://www.iquanwai.com/images/pcWorkDone.png"/>
            )
          } else {
            return (
              <span style={{fontSize:"16px",color:"#55cbcb"}}>记录更多</span>
            )
          }
        } else {
          return (
            <img src="http://www.iquanwai.com/images/pcWorkChooseDo.png"/>
          )
        }
      }
    }

    const renderWork = (list,type) => {

      return (
        <div className="content">
          {list.map((item, index) => {
            const clickHandler = {
              onClick:null
            }
            if(_.isEqual(type,"application")){
              // 应用训练
              if(item.unlocked){
                if(item.status===3){
                  clickHandler.onClick = ()=> this.goEdit(item.planId,item.workId,type);
                } else if(item.status===1){
                  clickHandler.onClick = ()=> this.goList(item.planId,item.workId,type);
                }
              }
            } else {
              if(item.unlocked){
                if(item.status===0){
                  clickHandler.onClick = ()=> this.goEdit(item.planId,item.workId,type);
                } else if(item.status===1){
                  clickHandler.onClick = ()=> this.goList(item.planId,item.workId,type);
                }
              }
            }

            return (
              <div {...clickHandler} className="rise-workItem" key={index}>
                <div className="rise-workTitle">{item.title}</div>
                <div className="rise-workScore">{item.score}积分</div>
                <div className="rise-go">{renderWorkStatus(item.status,item.unlocked,type)}</div>
              </div>
            )
          })}
        </div>
      )
    };


    const renderRise = () => {
      return (
        <div className="riseInnerContainer">
          <div className="rise-workContainer">
            <div className="title">
              <span className="title-text">专题训练</span>
            </div>
            {this.state.challengeLoading ? <VerticalBarLoading/>: renderWork(challengeList,"challenge")}
          </div>
          <div className="rise-workContainer">
            <div className="title">
              <span className="title-text">应用训练</span>
            </div>
            {this.state.applicationLoading ? <VerticalBarLoading/>: renderWork(applicationList,"application")}
          </div>
        </div>
      )
    }

    return (
      <div className="riseOuterContainer">
        {renderRise()}
      </div>
    )
  }
}
