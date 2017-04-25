import * as React from "react";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from 'material-ui/List';
import "./WarmupPracticeList.less"
import {set, startLoad, endLoad, alertMsg} from "../../../../redux/actions"
import {loadWarmupList} from "../async"
import {BreakSignal, Stop} from "../../../../utils/request"
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {decodeTextAreaString2} from "../../textUtils"


@connect(state => state)
export default class WarmupPracticeList extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      practiceList: [],
    }
  }

  componentWillMount(problemId) {
    loadWarmupList(problemId).then(res => {
      if (res.code === 200) {
        this.setState({
          practiceList: res.msg
        })
      } else if(res.code === 403) {
        setTimeout(() => window.location.href = "/403.jsp", 500);
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }
    })
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.query.problemId !== newProps.location.query.problemId){
      this.componentWillMount(newProps.location.query.problemId)
    }
  }

  view(practice){
    this.context.router.push({pathname:'/backend/warmup/edit/view', query:{id: practice.id}})
  }

  render() {
    const {practiceList=[]} = this.state

    const renderPractice = (practiceList) =>{
      return (
        practiceList.map((practice, index)=>{
          return (
            <div key={index}>
              <div className="practice" onClick={()=>{this.view(practice)}}>
                {practice.question.length>40? decodeTextAreaString2(practice.question).substring(0, 40).concat(' ...')
                    : decodeTextAreaString2(practice.question)}
              </div>
              <Divider/>
            </div>
          )
        })
      )
    }

    return (
        <div className="hotPractice">
          <Subheader>巩固练习</Subheader>
          {renderPractice(practiceList)}
        </div>
    )
  }
}
