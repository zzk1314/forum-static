import * as React from "react";
import {connect} from "react-redux";
import {pget, ppost} from "utils/request";
import {List, ListItem} from 'material-ui/List';
import * as _ from "lodash";
import "./Fragment.less"
import {Grid, Row, Col} from "react-flexbox-grid"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Loading from "../../components/Loading"
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
        dispatch(set("user.info", res.msg));
        return res.msg;
      })
    } else {
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
        console.log("ajax加载问题列表",res.msg);
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
   *                     .myChallenge:[problemId]:[challengeList] // 自己的挑战列表
   *                                          [0]:[...challenge...]
   *                     .otherChallenge:[problemId]:[challengeList] // 其他人的挑战列表
   *                                           目前只有一个challenge
   *                                           challenge:{
   *                                           }
   * course.fragment.problemList:[problem] // 问题列表
   *                .doingId //  正在做的问题id
   * page.fragment.curProblemId
   */
  componentWillMount() {
    console.log("fragment willMount");
    const {dispatch, page}= this.props;
    const tempCurPro = _.get(page,"tempCurPro");
    this.getUser()
      .then((res) => this.loadProblemList());

    dispatch(set("page.curNav", "fragment"));
    if(!_.isUndefined(tempCurPro)){
      dispatch(set("page.curProblem",tempCurPro));
    }
  }


  /**
   * 选择了问题,请求跳转
   */
  chooseProblem(problemId) {
    const {dispatch,page} = this.props;
    console.log("choose:", problemId);
    pget(`/pc/fragment/problem/where?problemId=${problemId}`,this.context.router)
      .then(res=>{
        if(res.code===200){
          console.log("请求v 成功",res);
          // 请求成功，进行跳转
          this.context.router.push({
            pathname:res.msg.pathName,
            query:res.msg.query,
          })
          if(res.msg.pathName!=="/servercode" && res.msg.pathName!=="/login"){
            const curNav = _.get(page,"curProblemId",0);
            dispatch(set("page.tempCurPro",curNav));
          }
          dispatch(set("page.curProblemId",problemId));
        } else {
          console.log(res.msg);
        }
      }).catch(err=>console.log(err));
    // this.context.router.push({pathname:`/home/fragment/challenge`,query:{id:problem.id}})
  }

  render() {
    const {course, dispatch, page, user = {},loading} = this.props;
    const problemList = _.get(course, "fragment.problemList", []); // 问题列表，默认为[]
    const doingId = _.get(user, "course.fragment.doingId"); // 正在做的问题id
    const curProblemId = _.get(page, "curProblemId", doingId); // 当前现实的问题id，默认为正在做的问题id
    const fragmentLoading = _.get(loading,"fragment",false); // 是否显示loading动画
    const paperStyle = { // loading的样式
      position: "fixed",
      width: "150px",
      height: "150px",
      left: "45%",
      top: "30%"
    }
    return (
      <div className="fragmentContent" ref="fragmentContent">
        <div className="leftList">
          <VerticalList onChangeCall={(problemId)=>this.chooseProblem(problemId)} problemList={problemList}
                        activeNav={curProblemId}/>
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
        {fragmentLoading?<Loading paperStyle={paperStyle} size={150}/>:null}
      </div>
    )
  }
}
