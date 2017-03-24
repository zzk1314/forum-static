import * as React from "react"
import {connect} from "react-redux"
import "./DoChallenge.less"
import * as _ from "lodash"
import { ppost, BreakSignal} from "../../../utils/request";
import PicUpload from "../../../components/PicUpload"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {loadSelfChallengeSubmit,submitChallenge} from "./async"
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import Editor from "../../../components/editor/Editor"

@connect(state => state)
export default class DoChallenge extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      submitLoading:false,
      alert: {
        actions: null,
        modal: true
      },
      alertTitle: "",
      alertContent: "",
      showAlertModal: false,
      snackOpen: false,
      snackMessage: "提交中，请稍后",
    }
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  componentWillMount() {
    window.onbeforeunload = ()=>{ return "你还有未提交的内容，离开页面会丢失"; }
    const {location,challenge,dispatch} = this.props;
    // 根据 cid和planid加载
    const {challengeId, planId} = location.query;
    const mine = _.get(challenge,`mine.${planId}.${challengeId}`);
    if(!mine){
      this.setState({submitLoading:true});
      loadSelfChallengeSubmit(planId,challengeId)
        .then(res => {
          this.setState({submitLoading:false});
          if (_.isEqual(res.code, 200)) {
            // 加载成功
            console.log("ajax:",res.msg);
            dispatch(set(`challenge.mine.${planId}.${challengeId}`,res.msg));
          } else {
            throw new BreakSignal(res.msg);
          }
        }).catch(err=>{
          console.log("加载作业失败",err);
          if(err instanceof BreakSignal){
            dispatch(alertMsg(err.title,err.msg));
          } else {
            dispatch(alertMsg(_.toString(err)));
          }
      })
    }
  }

  /**
   * 上传图片成功
   */
  onUploadSuccess(url) {
    const {challenge,location,dispatch} = this.props;
    const {challengeId, planId} = location.query;
    const mine = _.get(challenge,`mine.${planId}.${challengeId}`,{});
    const {picList = []} = mine;
    let temp = [];
    picList.forEach(item => temp.push(item));
    temp.push(url);
    dispatch(set(`challenge.mine.${planId}.${challengeId}.picList`, temp));
  }


  /**
   * 提交作业
   */
  goSubmitChallenge() {
    const {challenge,location} = this.props;
    const {challengeId, planId} = location.query;
    const mine = _.get(challenge,`mine.${planId}.${challengeId}`,{});
    const {submitId} = mine;
    var content = this.refs.editor.getValue()
    if (_.isEmpty(content)) {
      this.showAlert("作业还没写完哦","提示");
      return;
    }
    // 根据 cid和planid加载
    submitChallenge(submitId,content)
      .then(res => {
      if (res.code === 200) {
        if(_.isNumber(res.msg)){
          this.showAlert(`已提交，+${res.msg}积分`);
        } else {
          this.showAlert(`提交成功`);
        }
        setTimeout(() => {
          this.context.router.push({
            pathname: "/fragment/challenge/list",
            query: {
              challengeId: challengeId,
              planId:planId
            }
          })
        }, 1000);
      } else {
        this.showAlert(_.toString(res.msg));
      }
    }).catch((err) => {
      this.showAlert(_.toString(err));
    });
  }

  showAlert(content, title) {
    const {dispatch} = this.props;
    dispatch(alertMsg(title,content));
    setTimeout(() => {
      dispatch(set("base.showModal",false));
    }, 1000);
  }


  render() {
    const {challenge,location,dispatch} = this.props;
    const {challengeId, planId} = location.query;
    const mine = _.get(challenge,`mine.${planId}.${challengeId}`,{});
    const {content, submitId, moduleId, picList = [], description} = mine;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <div className="myWorkTitle">我的心得</div>
          <div className="desc" dangerouslySetInnerHTML={{__html:description}}></div>
          <div className="tipTitle">小提示</div>
          <div className="tips">
            本题答案仅自己可见 <br/>
            目标最好是某个具体问题或场景 <br/>
            制定目标之前，可以先回顾该专题的知识体系<br/>
          </div>
          <Editor ref="editor" value={content} moduleId="2">
          </Editor>
          <div className="submitBtnGroup">
            <PicUpload onUploadSuccess={(url)=>this.onUploadSuccess(url)} moduleId={moduleId}
                       referencedId={submitId}/>
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.goSubmitChallenge()}/>
          </div>
          <div className="picContainer">
            <ul className="picList">
              {picList.map((pic, sequence) => {
                // 循环存放picList
                return (
                  <li key={sequence} className="picItem">
                    <img src={pic}/>
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
        {this.state.submitLoading?<VerticalBarLoading/>:renderDoWorkArea()}
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}
