import * as React from "react"
import {connect} from "react-redux"
import "./WriteSubject.less"
import * as _ from "lodash"
import { ppost, BreakSignal} from "../../../utils/request";
import PicUpload from "../../../components/PicUpload"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import {loadSubject,submitSubject,loadLabels} from "./async"
import {PictureModule} from "../async"
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {imgSrc} from "../../../utils/imgSrc"
import Editor from "../../../components/editor/Editor"

const reg = /[^\/]*$/;
const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-8px"
  },
}
@connect(state => state)
export default class WriteSubject extends React.Component<any,any> {

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
      snackOpen: false,
      snackMessage: "提交中，请稍后",
      data:{
        content:"",
        title:"",
        picList:[],
        labelList:[],
      },
    }
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  componentWillMount() {
    window.onbeforeunload = ()=>{ return "你还有未提交的内容，离开页面会丢失"; }
    const {location,dispatch} = this.props;
    // 根据 cid和planid加载
    const {problemId, submitId} = location.query;
    if(!submitId){
      // 没有提交id，发布新的
      this.setState({submitLoading:true});
      loadLabels(problemId).then(res=>{
        this.setState({submitLoading:false});
        if (_.isEqual(res.code, 200)) {
          // 加载成功
          this.setState({data:res.msg});
          // dispatch(set(`challenge.mine.${planId}.${challengeId}`,res.msg));
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
    } else {
      // 有提交id，编辑旧的
      this.setState({submitLoading:true});
      loadSubject(submitId)
        .then(res => {
          this.setState({submitLoading:false});
          if (_.isEqual(res.code, 200)) {
            // 加载成功
            this.setState({data:res.msg});
            // dispatch(set(`challenge.mine.${planId}.${challengeId}`,res.msg));
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
    const {data} = this.state;
    let picList = _.get(data,"picList",[]);
    if(!picList){
      picList = [];
    }
    this.setState({data:_.merge({},data,{picList:picList.concat([url])})});
  }


  /**
   * 提交作业
   */
  goSubmitSubject() {
    const {location,dispatch} = this.props;
    const {problemId, submitId} = location.query;
    const {data} = this.state;
    const { title,labelList,picList = []} = data;
    const content = this.refs.editor.getValue();
    if (_.isEmpty(content)) {
      this.showAlert("内容未输入","提示");
      return;
    }

    if (_.isEmpty(title)) {
      this.showAlert("标题未输入","提示");
      return;
    }

    if(title.length > 64){
      this.showAlert("标题最多输入64个字哦");
      return;
    }


    // 根据 cid和planid加载 problemId,submitId,title,content,labels
    let submitLabels = _.merge([],labelList.filter(item=>item.selected));
    // let updatePicList = [].concat(picList.map(item=>reg.exec(item)[0]));
    let updatePicList = [];
    submitSubject(problemId,submitId,title,content,submitLabels,updatePicList)
      .then(res => {
        if (res.code === 200) {
          if(_.isNumber(res.msg)){
            this.showAlert(`已提交，+${res.msg}积分`);
          } else {
            this.showAlert(`提交成功`);
          }
          setTimeout(() => {
            this.context.router.push({
              pathname: "/fragment/subject/list",
              query: {
                problemId: problemId,
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

  clickLabel(selected,seq){
    const {data} = this.state;
    let labels = _.get(data,"labelList");
    this.setState({data:_.merge({},data,{labelList:_.set(_.merge([],labels),`[${seq}].selected`,!selected)})});
  }


  render() {
    const {data} = this.state;
    const {location} = this.props;
    const {content, submitId, picList = [], desc,title, labelList=[]} = data;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          {/*<div className="myWorkTitle">小课论坛</div>*/}
          <div className="backContainer">
          <span onClick={()=>{
            this.context.router.push({
              pathname: "/fragment/subject/list/mine",
              query: {
                problemId: location.query.problemId
              }
            })
            }} className="backBtn"><img src={imgSrc.backList}/>返回列表</span>
            <Divider style={style.divider}/>
          </div>
          <div className="desc" dangerouslySetInnerHTML={{__html:desc}}></div>
          <input className="title-area" value={title}
                 placeholder="请输入标题"
                 onChange={(e)=>this.setState({data:_.merge({},data,{title:e.currentTarget.value})})}/>
          <div className="label-container">
            <span className="tips">选择标签:</span>
            {
              labelList.map((item,seq)=>{
                return (
                  <div key={seq} className={`label-item ${item.selected?"selected":''}`} style={{marginLeft:`10px`,marginRight:`10px`}} onClick={()=>this.clickLabel(item.selected,seq)}>{item.name}</div>
                )
              })
            }
          </div>
          <Editor ref="editor" value={content} defaultValue={content} onChange={(value) => this.setState({data:_.merge({},data,{content:value})})} moduleId="4"/>
          {/*<textarea cols="30" rows="10"*/}
                    {/*placeholder="请输入你要分享的内容"*/}
                    {/*value={content}*/}
                    {/*onChange={(e) => this.setState({data:_.merge({},data,{content:e.currentTarget.value})})}/>*/}
          <div className="submitBtnGroup">
            {/*<PicUpload onUploadSuccess={(url)=>this.onUploadSuccess(url)} moduleId={PictureModule.Subject}*/}
                       {/*referencedId={submitId}/>*/}
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.goSubmitSubject()}/>
          </div>
          {/*<div className="picContainer">
            <ul className="picList">
              {picList?picList.map((pic, sequence) => {
                // 循环存放picList
                return (
                  <li key={sequence} className="picItem">
                    <img src={pic}/>
                  </li>
                )
              }):null}
            </ul>
          </div>*/}
        </div>
      )
    }

    return (
      <div className="write-subject-container">
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
