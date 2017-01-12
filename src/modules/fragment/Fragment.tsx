import * as React from "react";
import {connect} from "react-redux";
import {pget, ppost} from "utils/request";
import {List, ListItem} from 'material-ui/List';
import * as _ from "lodash";
import "./Fragment.less"
import {Grid, Row, Col} from "react-flexbox-grid"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Loader from "../../components/Loader"
import VerticalList from "../../components/VerticalList"
import { loadProblems } from "./async"

@connect(state => state)
export default class Fragment extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemList: [],
      doingId: null,
      curProblem: null,
    }
  }

  componentWillMount() {
    // 加载所有作业列表
    if (!this.state.problemList || _.isEmpty(this.state.problemList)) {
      // ajax加载
      loadProblems().then(res=>{
        if (res.code === 200) {
          this.setState({problemList: res.msg.problemList, doingId: res.msg.doingId,curProblem:res.msg.doingId});
        }
      });
    } else {
      // 已经缓存
      this.setState({curProblem:this.state.doingId});
    }
  }


  chooseProblem(problemId) {
    pget(`/pc/fragment/problem/where?problemId=${problemId}`)
      .then(res => {
        if (res.code === 200) {
          // 请求成功，进行跳转
          this.context.router.push({
            pathname: res.msg.pathName,
            query: res.msg.query,
          })
        } else {
          console.log('error',res.msg);
        }
        this.setState({curProblem:problemId});
      }).catch(err => console.log(err));
  }

  render() {
    const {loading} = this.props;
    const problemList = _.get(this.state, "problemList"); // 问题列表，默认为[]
    const doingId = _.get(this.state, "doingId"); // 正在做的问题id
    const curProblemId = _.get(this.state, "curProblem", doingId); // 当前现实的问题id，默认为正在做的问题id
    const fragmentLoading = _.get(loading, "fragment", false); // 是否显示loading动画

    return (
      <div className="fragmentContent" ref="fragmentContent">
        <div className="leftList">
          <VerticalList onChangeCall={(problemId)=>this.chooseProblem(problemId)} problemList={problemList}
                        activeNav={curProblemId}/>
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
        {fragmentLoading ?<Loader/>: null}
      </div>
    )
  }
}
