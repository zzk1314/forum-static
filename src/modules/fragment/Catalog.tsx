import * as React from "react"
import {connect} from "react-redux"
import VerticalBarLoading from "../../components/VerticalBarLoading"
import {loadCurProblemId, loadAccount, loadRiseWorkList} from "./async";
import * as _ from "lodash"
import {set, alertMsg} from "redux/actions"
import {BreakSignal, Stop} from "../../utils/request"
import "./Catalog.less"

@connect(state => state)
export default class Catalog extends React.Component<any,any> {

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

  loadProblem(problemId) {
    // 查看是否有pid
    const {location} = this.props;
    // 传了problemId
    if (problemId || location.query.problemId) {
      return Promise.resolve(problemId || location.query.problemId);
    } else {
      // 没传problemId,加载当前问题
      return loadCurProblemId().then(res => {
        if (res.code === 200) {
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
      this.componentWillMount(newProps.location.query.problemId)
    }
  }

  componentWillMount(problemId) {
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
      return this.loadProblem(problemId);
    }).then(problemId => {
      // 这里根据问题id去加挑战任务和应用任务
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

  goApp(status,unlocked,planId,workId){
    if(unlocked){
      if(status === 1){
        this.context.router.push({
          pathname:"/fragment/application/list",
          query:{planId:planId,applicationId:workId}
        })
      } else {
        this.context.router.push({
          pathname:"/fragment/application",
          query:{planId:planId,applicationId:workId}
        })
      }
    }
  }

  goGoal(challengeList){
    if(challengeList){
      let last = challengeList[challengeList.length - 1];
      if(last.status === 1){
        this.context.router.push({
          pathname:"/fragment/challenge/list",
          query:{planId:last.planId,challengeId:last.workId}
        })
      } else {
        this.context.router.push({
          pathname:"/fragment/challenge",
          query:{planId:last.planId,challengeId:last.workId}
        })
      }
    }
  }

  goSubject(){
    const {activeProblemId} = this.props;
    this.context.router.push({
      pathname:"/fragment/subject/list",
      query:{problemId:activeProblemId}
    })
  }

  render() {
    const {applicationList, challengeList} = this.state;
    const renderWorkStatus = (status, unlocked,type) => {
      if (!unlocked) {
        // 未解锁
        return (
          <img style={{marginTop: "-8px"}} src="https://www.iqycamp.com/images/pcWorkLock.png"/>
        )
      } else {
        // 已解锁
        if (status === 0) {
          return (
            <img src="https://www.iqycamp.com/images/pcWorkGo.png"/>
          )
        } else if (status === 1) {
          if(_.isEqual("application",type)){
            return (
              <img style={{marginTop: "-8px"}}  src="https://www.iqycamp.com/images/pcWorkDone.png"/>
            )
          } else {
            return (
              <span style={{fontSize:"16px",color:"#55cbcb"}}>记录更多</span>
            )
          }
        } else {
          return (
            <img src="https://www.iqycamp.com/images/pcWorkChooseDo.png"/>
          )
        }
      }
    }

    return (
      <div className="catalog">
        <div onClick={()=>this.goSubject()} className="item-container" style={{cursor: 'pointer'}}>
          <div className="title subject">小课论坛</div>
          <div className="content">深度好文·遇见大咖·分享心得</div>
          <div className="detail">
            <div className="go">记录更多</div>
          </div>
        </div>
        <div onClick={()=>this.goGoal(challengeList)} className="item-container" style={{cursor: 'pointer'}}>
          <div className="title goal">小目标</div>
          <div className="content">设定目标·记录进展·回顾总结</div>
          <div className="detail">
            <div className="score">30积分</div>
            <div className="go">记录更多</div>
          </div>
        </div>
        <div className="item-container">
          <div className="title app">应用练习</div>
          <div className="multi-container">
            {this.state.applicationLoading ?
              <VerticalBarLoading/>:
              this.state.applicationList.map((item,seq) =>{
                return (
                  <div key={seq} style={{cursor: 'pointer'}} onClick={()=>this.goApp(item.status,item.unlocked,item.planId,item.workId)} className="item">
                    <div className="content">
                      {item.title}
                    </div>
                    <div className="detail">
                      <div className="score">{item.score}积分</div>
                      <div className="go">{renderWorkStatus(item.status,item.unlocked,'application')}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div >
    )
  }
}
