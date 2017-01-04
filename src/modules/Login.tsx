import * as React from "react"
import {connect} from "react-redux"
import {set} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import * as _ from "lodash"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import "./Login.less"
import {pget, ppost} from "utils/request";
import { getUri } from "utils/helpers";

const P = "base"

@connect(state => state)
export default class Login extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      qrPicUrl:null
    }
    this.webSocket = null;
    this.timer = null;
  }
  private timer;
  private webSocket:WebSocket;

  componentDidMount(){
    console.log("didMount");
  }
  componentDidUpdate(){
    console.log("didUpdate");
  }

  componentWillMount(){
    // const {dispatch,user} = this.props;
    // dispatch(set("page",{"curNav":"fragment"}));
    // // 预先加载用户信息,已登录的话就不用了
    // if(_.isEmpty(user)){
    //   pget(`/account/get`,null).then(res => {
    //     dispatch(set("user",res.msg));
    //     console.log("您已登录，请不要重复登录哦");
    //   }).catch(err=>console.log(err));
    // }
    this.openSocket();
  }


  /**
   * 打开socket,请求二维码
   */
  openSocket(){
    if("WebSocket" in window){
      console.log("支持");
    } else {
      alert("该浏览器不支持socket");
    }
    // 创建socket www.confucius.mobi
    this.webSocket = new WebSocket("ws://www.confucius.mobi:8080/session");
    console.log(this.webSocket);
    this.webSocket.onopen = e=>{console.log("链接打开!");};
    // 处理消息
    this.webSocket.onmessage = e=>{this.dispatchMessage(e);};
    this.webSocket.onerror = e=>{console.log("socket回调,异常处理",e)};
    this.webSocket.onclose = e=>{console.log("socket回调，真正关闭链接")};
  }

  /**
   * 处理消息
   * @param event 消息事件
   */
  dispatchMessage(event:{type:String.required}){
    console.log("socket回调，处理消息",event);
    let {dispatch} = this.props;
    // message消息
    if(_.isEqual(event.type,"message")){
      // 解析data字段
      let data = JSON.parse(event.data);
      // data字段的type为消息具体含义
      switch (data.type){
        case "QR_CREATE":{
          console.log("创建二维码");
          // TODO 这里可以做个加载效果，二维码加载之前
          // 创建二维码成功
          this.setState({qrPicUrl:data.picUrl});
          // 获取二维码后60秒刷新
          this.timer = setTimeout(()=>this.refreshQRCode(),60000);
          break;
        }
        case "LOGIN_SUCCESS":{
          // 显示用户名和用户头像
          // 显示用户头像和名字，1秒后消失
          dispatch(set("user", data.data));
          console.log("login success",data.data);
          // TODO 登录组件只负责登录处理，在其中调用登录成功的回调函数即可
          this.closeSocket();
          // 跳转到之前的页面
          this.jumpToBack();
          // 调用登录成功后的回调方法
          break;
        }
        case "PERMISSION_DENIED":{
          console.log("权限不足，role为stranger的时候会出现");
          clearTimeout(this.timer);
          this.closeSocket();
          // 跳转到服务号页面
          this.jumpToServerQr();
          break;
        }
        case "ERROR":{
          console.log("socket异常消息:",data.msg);
          // 弹出登录异常提示框
          break;
        }
        default:{
          console.log("未处理的Message类型",data);
        }
      }
    } else {
      console.log("未处理的Type类型",event);
    }
  }

  /**
   * 关闭socket，提供该给组件外面使用
   */
  closeSocket(){
    this.webSocket&&this.webSocket.close();
    clearTimeout(this.timer);
    console.log("关闭socket");
  }

  /**
   * 发送msg消息
   * @param msg
   */
  sendTextMessage(msg:{"type":String.required}){
    this.webSocket.send(JSON.stringify(msg));
  }
  /**
   * 刷新二维码
   */
  refreshQRCode(){
    console.log("刷新二维码");
    let param = {"type":"REFRESH_CODE"};
    this.sendTextMessage(param);
  }

  /**
   * 组件移除时尝试关闭socket
   */
  componentWillUnmount(){
    clearTimeout(this.timer);
    this.webSocket&&this.webSocket.close();
  }

  /**
   * 没有该权限，挑战到服务号二维码界面
   */
  jumpToServerQr(){
    this.context.router.push({
      pathname:"/servercode",
    })
  }

  /**
   *  登录成功，跳到进入登录界面之前的界面
   */
  jumpToBack(){
    //  获得url
    const { page,dispatch } = this.props;
    const wannaRoute = _.get(page,"wannaRoute",{pathname:"/home",query:null});
    dispatch(set("page.avatarVisible",true));

    setTimeout(()=>{
      console.log("wannaRoute:",wannaRoute);
      this.context.router.push(wannaRoute);
    },1000);
  }

  render() {
    const {location,user} = this.props;
    console.log(location);
    const callBackUrl = _.get(location, "query.callBackUrl", "");
    const weixin = _.get(user,"weixin",{});
    console.log("render weixin",weixin);
    const renderTips = () => {
      if (_.isEmpty(weixin)) {
        // 用户仍未登录
        return <p className="loginTip">微信扫一扫，登录圈外</p>
      } else {
        return <p className="loginTip"><span style={{color:"#55cbcb"}}>{weixin.weixinName}</span>,已登录圈外,</p>
      }
    }

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={weixin.headimgUrl?weixin.headimgUrl:this.state.qrPicUrl}/>
          {renderTips()}
        </div>
      </div>
    )
  }
}
