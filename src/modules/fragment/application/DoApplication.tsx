import * as React from "react"
import {connect} from "react-redux"
import "./DoApplication.less"
import * as _ from "lodash"
import { ppost, BreakSignal} from "../../../utils/request";
// import PicUpload from "../../../components/PicUpload"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {loadSelfApplication,submitApplication} from "./async.bak"
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import Editor from "../../../components/editor/Editor"

@connect(state => state)
export default class DoApplication extends React.Component<any,any> {

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
      submitting:false,
    }
  }

  componentWillUnmount(){
    window.onbeforeunload = null;
  }

  componentWillMount() {
    window.onbeforeunload = (e)=>{ return "你还有未提交的内容，离开页面会丢失"; }
    const {location,application,dispatch} = this.props;
    // 根据 cid和planid加载
    const {applicationId, planId} = location.query;
    const mine = _.get(application,`mine.${planId}.${applicationId}`);
    if(!mine){
      this.setState({submitLoading:true});
      loadSelfApplication(planId,applicationId)
        .then(res => {
          this.setState({submitLoading:false});
          if (_.isEqual(res.code, 200)) {
            // 加载成功
            dispatch(set(`application.mine.${planId}.${applicationId}`,res.msg));
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
    const {application,location,dispatch} = this.props;
    const {applicationId, planId} = location.query;
    const mine = _.get(application,`mine.${planId}.${applicationId}`,{});
    const {picList = []} = mine;
    let temp = [];
    picList.forEach(item => temp.push(item));
    temp.push(url);
    dispatch(set(`application.mine.${planId}.${applicationId}.picList`, temp));
  }


  /**
   * 提交作业
   */
  goSubmitApplication() {
    const {application,location} = this.props;
    const {applicationId, planId} = location.query;
    const mine = _.get(application,`mine.${planId}.${applicationId}`,{});
    const { submitId } = mine;
    this.setState({submitting:true})
    const content = this.refs.editor.getValue();
    if (_.isEmpty(content)) {
      this.showAlert("作业还没写完哦","提示");
      return;
    }
    submitApplication(planId,applicationId,content)
      .then(res => {
      if (res.code === 200) {
        // 展示分数
        if(_.isNumber(res.msg)){
          this.showAlert(`已提交，+${res.msg}积分`);
        } else {
          this.showAlert(`提交成功`);
        }
        setTimeout(() => {
          this.context.router.push({
            pathname: "/fragment/application/list",
            query: {
              applicationId: applicationId,
              planId:planId
            }
          })
        }, 1000);
      } else {
        this.showAlert(_.toString(res.msg));
      }
      this.setState({submitting:false})
    }).catch((err) => {
      this.showAlert(_.toString(err));
      this.setState({submitting:false})
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
    const {application,location,dispatch} = this.props;
    const {submitting} = this.state;
    const {applicationId, planId} = location.query;
    const mine = _.get(application,`mine.${planId}.${applicationId}`,{});
    const {content, submitId, moduleId, picList = [], description,title} = mine;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <div className="myWorkTitle">{title}</div>
          <div className="desc" dangerouslySetInnerHTML={{__html:description}}></div>
          <div className="tipTitle">小提示</div>
          <div className="tips">
            结合相关知识点分析问题<br/>
            优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分
          </div>
          <Editor ref="editor" value={content} defaultValue={content} onChange={(value) => dispatch(set(`application.mine.${planId}.${applicationId}.content`,value))} moduleId="3"/>
          {/*<textarea cols="30" rows="10"*/}
                    {/*value={content}*/}
                    {/*onChange={(e) => dispatch(set(`application.mine.${planId}.${applicationId}.content`,e.currentTarget.value))}/>*/}
          <div className="submitBtnGroup">
            {/*<PicUpload onUploadSuccess={(url)=>this.onUploadSuccess(url)} moduleId={moduleId}*/}
                       {/*referencedId={submitId}/>*/}
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.goSubmitApplication()} disabled = {submitting} />
          </div>
          {/*<div className="picContainer">
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
          </div>*/}
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
