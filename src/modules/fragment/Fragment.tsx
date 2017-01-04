import * as React from "react";
import {connect} from "react-redux";
import {pget, ppost} from "utils/request";
import {List, ListItem} from 'material-ui/List';
import * as _ from "lodash";
import "./Fragment.less"
import {Grid, Row, Col} from "react-flexbox-grid"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import VerticalList from "../../components/VerticalList"

@connect(state => state)
export default class Fragment extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemList: null,
      currentProblem: null,
    }
  }

  /**
   * 获取用户信息
   * @returns {Promise} 用户信息
   */
  getUser() {
    const {user, dispatch} = this.props;
    if (_.isEmpty(user)) {
      // ajax获取
      return pget(`/account/get`, this.context.router).then(res => {
        console.log("ajax加载用户信息");
        dispatch(set("user", res.msg));
        return res.msg;
      })
    } else {
      console.log("已有缓存的用户信息");
      return Promise.resolve(user);
    }
  }

  /**
   * 加载问题列表
   * @returns {Promise} 当前用户正在做的problemId
   */
  loadProblemList(): {doingId: Number,problemList: Array} {
    console.log();
    const {dispatch, course, user, location} = this.props;
    const problemList = _.get(course, "fragment.problemList", {});
    // 加载所有作业列表
    if (_.isEmpty(problemList) && !_.isArray(problemList)) {
      // ajax加载,设置要跳转的地址为当前路由
      const {pathname = "/home", query = null} = location;
      dispatch(set("page.wannaRoute", {pathname: pathname, query: query}));
      return pget(`/pc/fragment/page`, this.context.router).then(res => {
        console.log("ajax加载问题列表");
        dispatch(set("course.fragment.problemList", res.msg.problemList));
        dispatch(set("user.course.fragment.doingId", res.msg.doingId));
        const doingId = res.msg.doingId;
        console.log("用户正在做:", doingId);
        return res.msg;
      });
    } else {
      // 已经缓存
      console.log("已经缓存问题列表", problemList);
      const doingId = _.get(user, "course.fragment.doingId");
      console.log("用户正在做", {doingId: doingId, problemList: problemList});
      return Promise.resolve({doingId: doingId, problemList: problemList})
    }
  }




  /**
   * 根据problemId来加载用户的challenge
   * @param problemId 问题id
   * 结构：
   * user.course.fragment.doing
   *                     .myChallenge:[problemId]:[challengeList]
   *                                          [0]:[...challenge...]
   *                     .otherChallenge:[problemId]:[challengeList]
   *                                           目前只有一个challenge
   *                                           challenge:{
   *                                           }
   * course.fragment.problemList:[problem]
   *
   * page.fragment.curChallengeId
   */
  componentWillMount() {
    console.log("fragment willMount");
    const {dispatch, user, location} = this.props;
    console.log(location);
    this.getUser()
      .then((res) => this.loadProblemList());

    dispatch(set("page.curNav", "fragment"));
  }


  /**
   * 选择了问题
   */
  chooseProblem(problemId) {
    const {dispatch} = this.props;
    console.log("choose:", problemId);
    pget(`/pc/fragment/problem/where?problemId=${problemId}`,this.context.router)
      .then(res=>{
        if(res.code===200){
          console.log("请求v 成功",res);
          // 请求成功，进行跳转
          this.context.router.push({
            pathname:res.msg.pathName,
            query:res.msg.query
          })
          dispatch(set("page.curProblemId",problemId));
        } else {
          console.log(res.msg);
        }
      }).catch(err=>console.log(err));
    // this.context.router.push({pathname:`/home/fragment/challenge`,query:{id:problem.id}})
    // 加载自己的问题
  }

  render() {
    const {course, dispatch, page, user = {}} = this.props;
    const problemList = _.get(course, "fragment.problemList", []);
    const doingId = _.get(user, "course.fragment.doingId");
    const curProblemId = _.get(page, "curProblemId", doingId);

    return (
      <div className="fragmentContent" ref="fragmentContent">
        <div className="leftList">
          <VerticalList onChangeCall={(problemId)=>this.chooseProblem(problemId)} problemList={problemList}
                        dispatch={dispatch} defaultValue={curProblemId}/>
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}
