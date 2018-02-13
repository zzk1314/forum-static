import * as React from "react"
import {connect} from "react-redux"
import {loadRiseWorkList} from "./async";
import * as _ from "lodash"
import {set, alertMsg} from "../../../redux/actions"
import {BreakSignal, Stop} from "../../../utils/request"
import "./ApplicationCatalog.less"
import {removeHtmlTags} from "../../../utils/textUtils"

@connect(state => state)
export default class ApplicationCatalog extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.query.problemId !== newProps.location.query.problemId){
      this.componentWillMount(newProps.location.query.problemId)
    }
  }

  componentWillMount(problemId) {

    const {dispatch} = this.props

    this.loadProblem(problemId).then(problemId => {
      // 这里根据问题id去加挑战任务和应用任务
      dispatch(set("activeProblemId",problemId));
      return loadRiseWorkList(problemId)
      .then(res => {
        if (res.code === 200) {
          this.setState({
            applicationList: res.msg,
          });
        } else {
          throw BreakSignal(res.msg, "加载作业失败");
        }
      });
    }).catch(err => {
      if (err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        dispatch(alertMsg("异常信息", _.toString(err)));
      }
    });
  }

  // 根据redux设置的menu值，实行不同情况的跳转
  goApp(workId){
    this.context.router.push({
      pathname:"/backend/problem/application/list",
      query:{applicationId:workId}
    })
  }

  goSubject(){
    const {activeProblemId} = this.props;
    this.context.router.push({
      pathname:"/fragment/subject/list",
      query:{problemId:activeProblemId}
    })
  }

  render() {
    const {applicationList} = this.state;

    return (
      <div className="application-catalog">
        <div className="item-container">
          <div className="title app">应用练习</div>
          <div className="app-container">
            {applicationList.map((item,seq) =>{
              return (
                <div key={seq} onClick={()=>this.goApp(item.id)} className="item">
                  <div className="content">{removeHtmlTags(item.topic)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    )
  }
}
