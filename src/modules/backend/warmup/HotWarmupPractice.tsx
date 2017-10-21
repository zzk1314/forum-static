import * as React from "react";
import {connect} from "react-redux";
import "./HotWarmupPractice.less"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import {loadHotPractice} from "./async"
import {BreakSignal, Stop} from "../../../utils/request"
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {decodeTextAreaString2} from "../../../utils/textUtils"


@connect(state => state)
export default class HotWarmupPractice extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      practiceList: [],
      end: true,
      page:1,
    }
  }

  componentWillMount() {
    loadHotPractice(1).then(res => {
      if (res.code === 200) {
        this.setState({
          practiceList: res.msg.list,
          end:res.msg.end,
          page:2,
        })
      } else if(res.code === 401) {
        this.context.router.push({
          pathname:"/login",
          query:{
            callbackUrl:this.props.location.pathname
          }
        })
      } else if(res.code === 403) {
        setTimeout(() => window.location.href = "/403.jsp", 500);
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }
    })
  }

  loadMoreContent(){
    const {practiceList = [], page} = this.state;
    loadHotPractice(page).then(res => {
      if (res.code === 200) {
        this.setState({
          practiceList: practiceList.concat(res.msg.list),
          end:res.msg.end,
          page:page+1,
        })
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }
    })
  }

  view(practice){
    if(this.props.location.pathname.indexOf('asst')!=-1){
      window.open(`/asst/warmup/view?id=${practice.id}`)
    }else{
      window.open(`/backend/warmup/view?id=${practice.id}`)
    }
  }

  render() {
    const {practiceList=[], end} = this.state

    const renderPractice = (practiceList) =>{
      return (
        practiceList.map((practice, index)=>{
          return (
            <div key={index}>
              <div className="problem">{'【'+practice.problemName+'】'}</div>
              <div className="practice" onClick={()=>{this.view(practice)}}>
                {decodeTextAreaString2(practice.question)}
              </div>
              <Divider/>
            </div>
          )
        })
      )
    }

    return (
        <div className="hot-practice">
          <Subheader>热门的巩固练习</Subheader>
          {renderPractice(practiceList)}
          {!end ? <div className="more" onClick={() => this.loadMoreContent()}>点击加载更多</div> :
              <div className="no-more">没有更多了</div>}
        </div>
    )
  }
}
