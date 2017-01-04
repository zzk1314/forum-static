import * as React from "react"
import {connect} from "react-redux"
import "./DoChallenge.less"
import * as _ from "lodash"
import {pget, ppost, BreakSignal} from "utils/request";
import {getUri} from "utils/helpers"
import PicUpload from "../../components/PicUpload"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import FlatButton from 'material-ui/FlatButton';
import AlertMessage from "../../components/AlertMessage"
@connect(state => state)
export default class DoChallenge extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    console.log("construct ccc");
    super();
    this.state = {
      challengeId: null,
      homeworkAnswer: null,
      picList: [],
      submitId: null,
      moduleId: null,
      pcurl: null,
      confirmAlert: {
        title: "确认提交",
        content: "是否要在修改一下",
        actions: [
          {
            label: "再改改", onClick: () => {
            this.setState({showConfirmModal: false});
          }, primary: true,
            style: {
              marginRight: "30px",
              marginLeft: "10px",
            }
          },
          {
            label: "确认提交", onClick: () => {
            this.submitChallenge();
          }, primary: true,
            style: {
              marginRight: "10px",
              marginLeft: "30px",
            }
          }
        ],
        modal: true,
      },
      alert: {
        actions: [
          {
            label: "确认", onClick: () => {
            this.setState({showAlertModal: false})
          }
          }
        ],
        modal: true
      },
      alertTitle: "",
      alertContent: "",
      showAlertModal: false,
      showConfirmModal: false,
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
   * 初始化页面参数
   * @param res 返回真正的，要渲染的problemList和problemId
   * @param props 最新的props
   */
  initPage(res, props) {
    console.log("初始化页面参数");
    const {location, user} = props;
    const {problemList, doingId} = res;
    console.log("doingId:id,promise返回的", doingId);
    const problemId = _.get(location, "query.problemId", {});
    if (_.isEmpty(problemId)) {
      // 没有传递页面参数，跳转到要进行的
      console.log("没有传递页面参数")
      this.context.router.push({
        pathname: "/fragment/c",
        query: {problemId: doingId}
      });
      throw new BreakSignal("没有设置挑战id，重新访问");
    }
    // 有参数,返回真正
    return {problemList: problemList, problemId: Number(problemId)};
  }

  /**
   * 根据问题列表和要渲染的问题
   *   * user.course.fragment.doing
   *                     .myChallenge:[problemId]:[challengeList]
   *                                          [0]:[...challenge...]
   *                     .otherChallenge:[problemId]:[challengeList]
   *                                           目前只有一个challenge
   *                                           challenge:{
   *                                           }
   */
  loadChallenges(res: {problemList: Array,problemId: Number}) {
    console.log("loadChallenges:", res);
    const {dispatch, user} = this.props;
    const {problemList, problemId} = res;
    let problem = _.first(problemList.filter(item => _.isEqual(item.id, Number(problemId))));
    if (_.isUndefined(problem)) {
      // 该挑战id异常
      console.log("这个挑战任务id异常", problem, problemList);
      return {code: 221, msg: "这个挑战任务id异常"};
    } else {
      // 查看是否付费
      if (problem.pay) {
        // 已付费
        console.log("该挑战任务已付费");
        // 查看是否已加载
        const cacheChallenge = _.get(user, `"course.fragment.myChallenge.${problemId}"`, {});
        if (!_.isEmpty(cacheChallenge)) {
          console.log("该挑战已经缓存", cacheChallenge);
          return {code: 200, msg: cacheChallenge};
        } else {
          console.log("ajax加载挑战", problem.id);
          return pget(`/pc/fragment/c/mine/${problem.id}`, this.context.router)
            .then(res => {
              console.log("任务加载完成", problem.id, res);
              dispatch(set("page.curProblemId", problem.id));
              dispatch(set(`user.course.fragment.myChallenge.${problem.id}`, res.msg));
              return res;
            })
        }
      } else {
        // 未付费
        console.log("该挑战任务未付费");
        return {code: 100001, msg: "该挑战任务未付费"};
      }
    }
  }

  /**
   * 对加载挑战任务的结果进行处理
   */
  dealResult(res, props) {
    console.log("处理加载结果", res);
    const {location} = props;
    const edit = _.get(location, "query.edit", false);
    console.log(location);
    if (_.isEqual(res.code, 100001)) {
      // 为付费，跳转到二维码界面
      this.context.router.push({
        pathname: "/servercode",
      })
    } else if (_.isEqual(res.code, 200)) {
      // 加载成功
      console.log(res);
      let {id, content, submitId, moduleId, picList, submitted, pcurl, submitUrl} = res.msg;
      // 关于这个大作业，设置基础字段,如果submit为true则显示list，如果为false并且doingId是这个则显示做作业，否则不能只展示三篇章
      this.setState({
        homeworkAnswer: content,
        submitId: submitId,
        picList: picList,
        moduleId: moduleId,
        submitted: submitted,
        pcurl: pcurl,
        submitUrl: submitUrl,
        challengeId: id
      })
      if (submitted && !edit) {
        // 已提交并且不编辑
        this.context.router.push({
          pathname: "/fragment/c/list",
          query: {cid: res.msg.id}
        })
        throw new BreakSignal("进入作业列表");
      }
    }
    return res;
  }

  componentWillMount() {
    // user.course.fragment.plan.c
    const {dispatch, location, user} = this.props;
    // 刚加载这个组件，先查看有没有
    // this.getUser()
    //   .then(() => this.loadProblemList())
    //   .then((res) => this.initPage(res, this.props))
    //   .then((res) => this.loadChallenges(res))
    //   .then((res) => this.dealResult(res,this.props))
    //   .catch(err => console.log("error:", err));
    // 根据 cid和planid加载
    const {cid, planId} = location.query;
    const submit = _.get(user, `course.fragment.${planId}.${cid}`);
    if (_.isUndefined(submit)) {
      pget(`/pc/fragment/c/mine/${planId}/${cid}`, this.context.router)
        .then(res => {
          if (_.isEqual(res.code, 100001)) {
            // 为付费，跳转到二维码界面
            this.context.router.push({
              pathname: "/servercode",
            })
          } else if (_.isEqual(res.code, 100002)) {
            alert("超过提交时限");
            this.context.router.push({
              pathname: "/servercode",
            });
          } else if (_.isEqual(res.code, 200)) {
            // 加载成功
            console.log(res);
            let {id, content, submitId, moduleId, picList, submitted, pcurl, submitUrl,description} = res.msg;
            // 关于这个大作业，设置基础字段,如果submit为true则显示list，如果为false并且doingId是这个则显示做作业，否则不能只展示三篇章
            this.setState({
              homeworkAnswer: content,
              submitId: submitId,
              picList: picList,
              moduleId: moduleId,
              submitted: submitted,
              pcurl: pcurl,
              submitUrl: submitUrl,
              challengeId: id,
              description:description,
            })
          }
        })
    }
  }

  test(props) {
    console.log('equal', props === this.props);
  }

  componentWillReceiveProps(newProps) {
    console.log("receiveProps");
    const {user} = newProps;
    // if (!_.isEqual(this.props.location.query.problemId, newProps.location.query.problemId)) {
    //   // 更新
    //   this.loadProblemList()
    //     .then((res) => this.initPage(res, newProps))
    //     .then((res) => this.loadChallenges({
    //       problemList: res.problemList,
    //       problemId: newProps.location.query.problemId
    //     }))
    //     .then((res) => this.dealResult(res, newProps))
    //     .catch(err => console.log("error:", err));
    // }
    if(this.props.location.query.planId!==newProps.props.location.query.planId || this.props.location.query.cid!==newProps.props.location.query.cid){
      const {cid, planId} = location.query;
      const submit = _.get(user, `course.fragment.${planId}.${cid}`);
      if (_.isUndefined(submit)) {
        pget(`/pc/fragment/c/mine/${planId}/${cid}`, this.context.router)
          .then(res => {
            if (_.isEqual(res.code, 100001)) {
              // 为付费，跳转到二维码界面
              this.context.router.push({
                pathname: "/servercode",
              })
            } else if (_.isEqual(res.code, 100002)) {
              alert("超过提交时限");
              this.context.router.push({
                pathname: "/servercode",
              });
            } else if (_.isEqual(res.code, 200)) {
              // 加载成功
              console.log(res);
              let {id, content, submitId, moduleId, picList, submitted, pcurl, submitUrl,description} = res.msg;
              // 关于这个大作业，设置基础字段,如果submit为true则显示list，如果为false并且doingId是这个则显示做作业，否则不能只展示三篇章
              this.setState({
                homeworkAnswer: content,
                submitId: submitId,
                picList: picList,
                moduleId: moduleId,
                submitted: submitted,
                pcurl: pcurl,
                submitUrl: submitUrl,
                challengeId: id,
                description:description,
              })
            }
          })
      }
    }

  }

  onUploadSuccess(url) {
    console.log(url);
    const {picList = [], moduleId, referencedId} = this.state;
    let temp = [];
    picList.forEach(item => temp.push(item));
    temp.push({picSrc: url, moduleId, moduleId, referencedId: referencedId});
    this.setState({picList: temp});
  }

  /**
   * 提交作业
   */
  submitChallenge() {
    const {homeworkAnswer, challengeId, submitId} = this.state;
    const {location} = this.props;

    console.log(homeworkAnswer);
    if (_.isEmpty(homeworkAnswer)) {
      console.log("作业没写完");
      this.showAlert("作业还没写完哦");
      console.log("close");
      this.closeConfirm();
      return;
    }
    // code
    const code = _.get(getUri(this.state.submitUrl), "query.id", {});
    if (_.isEmpty(code)) {
      this.showAlert("code异常");
      console.log(code);
      return;
    }
    console.log("提交");
    ppost(`/pc/fragment/c/submit/${code}`, {answer: homeworkAnswer}).then(res => {
      if (res.code === 200) {
        console.log("成功");
        // this.context.router.push({ pathname: '/static/success' })
        // this.setState({ showModal: true })
        this.closeConfirm();
        this.showAlert("提交成功");
        setTimeout(() => {
          this.context.router.push({
            pathname: "/fragment/c/show",
            query: {
              submitId: submitId,
            }
          })
        }, 1000);
      } else {
        this.showAlert(_.toString(res.msg));
      }
    }).catch((err) => {
      this.showAlert(_.toString(err));
    });
    // 提交
    console.log("提交作业");
  }

  showAlert(content, title) {
    console.log("显示alert", content);
    this.setState({alertContent: content, alertTitle: title = "", showAlertModal: true})
  }

  showConfirm() {
    this.setState({showConfirmModal: true})
  }

  closeConfirm() {
    this.setState({showConfirmModal: false});
  }


  render() {
    const {user, location} = this.props;
    const problemId = _.get(location, "query.problemId", {});
    const myChallenge = _.get(user, `course.fragment.myChallenge[${problemId}]`, {});
    const {content, description, pcurl, pic, submitted} = myChallenge;
    const {picList = []} = this.state;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <div className="myWorkTitle">我的作业</div>
          <div className="desc">{this.state.description}</div>
          <div className="tipTitle">小提示</div>
          <div className="tips">
            作业支持提交后电脑端修改啦！<br/>
            还可以上传图片给圈圈和助教。<br/>
            如果作业较长，需列出提纲，可以用编号的形式展现层次。
          </div>
          <textarea cols="30" rows="10"
                    value={this.state.homeworkAnswer}
                    onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
          <div className="submitBtnGroup">
            <PicUpload onUploadSuccess={(url)=>this.onUploadSuccess(url)} moduleId={this.state.moduleId}
                       referencedId={this.state.submitId}/>
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.showConfirm()}/>
          </div>
          <div className="picContainer">
            <ul className="picList">
              {picList.map((pic, sequence) => {
                // 循环存放picList
                return (
                  <li key={sequence} className="picItem" name={pic.id}>
                    <img src={pic.picSrc}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="challengeContainer">
        {renderDoWorkArea()}
        <AlertMessage { ...this.state.confirmAlert }
          open={this.state.showConfirmModal}/>
        <AlertMessage title={this.state.alertTitle} content={this.state.alertContent} {...this.state.alert}
                      open={this.state.showAlertModal}/>

      </div>
    )
  }
}
