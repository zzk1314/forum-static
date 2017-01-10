import * as React from "react"
import {connect} from "react-redux"
import "./DoChallenge.less"
import * as _ from "lodash"
import {pget, ppost, BreakSignal} from "utils/request";
import PicUpload from "../../components/PicUpload"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import FlatButton from 'material-ui/FlatButton';
import AlertMessage from "../../components/AlertMessage"
import Snackbar from 'material-ui/Snackbar';

@connect(state => state)
export default class DoChallenge extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      challengeId: null,
      homeworkAnswer: null,
      picList: [],
      submitId: null,
      moduleId: null,
      alert: {
        actions: null,
        modal: true
      },
      alertTitle: "",
      alertContent: "",
      showAlertModal: false,
      snackOpen: false,
      snackMessage: "提交中，请稍后",
      canSubmit: true,
    }
  }


  componentWillMount() {
    const {location} = this.props;
    // 根据 cid和planid加载
    const {cid, planId} = location.query;
    pget(`/pc/fragment/c/mine/${planId}/${cid}`, this.context.router)
      .then(res => {
        if (_.isEqual(res.code, 200)) {
          // 加载成功
          let {id, content, submitId, moduleId, picList = [], submitted, description} = res.msg;
          this.setState({
            homeworkAnswer: content,
            submitId: submitId,
            picList: picList,
            moduleId: moduleId,
            submitted: submitted,
            challengeId: id,
            description: description,
          })
        } else {
          this.showAlert(res.msg,"异常code");
        }
      })
  }

  /**
   * 上传图片成功
   */
  onUploadSuccess(url) {
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
    const {homeworkAnswer, submitId} = this.state;
    if (_.isEmpty(homeworkAnswer)) {
      this.showAlert("作业还没写完哦");
      return;
    }

    const {location} = this.props;
    // 根据 cid和planid加载
    const {cid} = location.query;
    ppost(`/pc/fragment/c/submit/${submitId}`, {answer: homeworkAnswer}).then(res => {
      if (res.code === 200) {
        this.showAlert("提交成功");
        setTimeout(() => {
          this.context.router.push({
            pathname: "/fragment/c/list",
            query: {
              cid: cid,
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
  }

  showAlert(content, title) {
    this.setState({alertContent: content, alertTitle: title = "", showAlertModal: true})
    setTimeout(() => {
      this.setState({showAlertModal: false});
    }, 1000);
  }


  render() {
    const {picList = []} = this.state;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <div className="myWorkTitle">我的心得</div>
          <div className="desc" dangerouslySetInnerHTML={{__html:this.state.description}}></div>
          <div className="tipTitle">小提示</div>
          <div className="tips">
            用心完成作业，你将会获得500积分！<br/>
            用标题区分你的内容,如:<br/>一、小目标；<br/>二、应用任务 <br/>1，具体任务描述（如帮助小明梳理职业困惑）；<br/>三、日常学习心得；<br/>四，学习完成总结
          </div>
          <textarea cols="30" rows="10"
                    value={this.state.homeworkAnswer}
                    onChange={(e) => this.setState({homeworkAnswer: e.currentTarget.value})}/>
          <div className="submitBtnGroup">
            <PicUpload onUploadSuccess={(url)=>this.onUploadSuccess(url)} moduleId={this.state.moduleId}
                       referencedId={this.state.submitId}/>
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.submitChallenge()}/>
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
        <AlertMessage title={this.state.alertTitle} content={this.state.alertContent} {...this.state.alert}
                      open={this.state.showAlertModal}/>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}
