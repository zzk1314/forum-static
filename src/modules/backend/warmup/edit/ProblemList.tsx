import * as React from "react";
import {connect} from "react-redux";
import {loadProblems} from "../async"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {BreakSignal} from "../../../../utils/request"
import {set, startLoad, endLoad, alertMsg} from "../../../../redux/actions"
import ProblemView from "../../component/ProblemView"
import _ from "lodash"


const style = {
  divider: {
    backgroundColor: "#f5f5f5",
  },
  listTitle: {
    height: "65px",
    padding: 0,
    overflow: "hidden",
  },
  firstItem: {
    margin: "0px auto",
    padding: "20px 0 25px"
  },
  item: {
    margin: "0 auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  }
}


@connect(state => state)
export default class ProblemList extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemList: [],
    }
  }

  chooseProblem(problemId) {
    const {dispatch} = this.props;
    const {problemList} = this.state;
    problemList.forEach((item,key) => {
      item.problems.forEach((item1, key1)=>{
        if(item1.id == problemId){
          _.set(item1, 'chosen', true)
        }else{
          _.set(item1, 'chosen', false)
        }
      })
    });
    // 选择难题，进入rise页面
    dispatch(set("activeProblemId",problemId));
    dispatch(set("page.scroll",{x:0,y:0}));
    this.context.router.push({
      pathname:"/backend/warmup/edit/list",
      query:{problemId:problemId}});

  }


  componentWillMount() {
    loadProblems().then(res =>{
      if (res.code === 200) {
        this.setState({
          problemList: res.msg
        })
      } else if(res.code === 401) {
        this.context.router.push({
          pathname:"/login",
          query:{
            callbackUrl:`/backend/warmup/management`
          }
        })
      } else if(res.code === 403){
        setTimeout(() => window.location.href = "/403.jsp", 500);
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }

    })
  }


  render() {
    const {problemList=[]} = this.state
    return (
      <div className="problemContent">
        <div className="leftList">
          <ProblemView chooseProblem={this.chooseProblem.bind(this)} problemList={problemList}/>
        </div>
        <div className="rightContent">
          {this.props.children}
          {/*{window.ENV.openFeedBack?renderFeedBack():null}*/}
        </div>
      </div>
    )
  }
}
