import * as React from "react";
import * as _ from "lodash";
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/clear';

const style = {
  dialog_content:{
    width:"400px",
    textAlign:"center"
  },
  login_img:{
    marginTop:"50px",
    width:"250px",
    height:"250px",
  },
  dialog_close:{
    position:"absolute",
    right:"-20px",
    top:"-20px",
  },
  p:{

  }
}

/**
 * 二维码登录窗口
 * 是否显示放在全局里
 *
 */
export default class Login extends React.Component<any,any>{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props){
    super(props);
    console.log("login",props);
    this.state={
      qrPicUrl:null,
      userName:null,
      userPic:null,
      openState:open,
      tip1:"扫码登录圈外",
      onLoginSuccess:null,
      onCloseDialog:null
    };
    this.webSocket = null;
    this.timer = null;
  }
  private timer;
  private webSocket:WebSocket;

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
    this.webSocket = new WebSocket("ws://127.0.0.1:8080/session");
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
    let {dispatch,page} = this.props;
    console.log(_.get(page,"curNav"));
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
          console.log("登录成功,用户数据:",data);
          // 显示用户名和用户头像
          // 显示用户头像和名字，1秒后消失
          dispatch(set("user", data.data));
          // TODO 登录组件只负责登录处理，在其中调用登录成功的回调函数即可
          this.setState({"userName":data.data.weixin.weixinName,"userPic":data.data.weixin.headimgUrl,"tip2":"已登录圈外!"});
          // 调用缓慢消失方法
          this.slowCloseDialog();
          // 调用登录成功后的回调方法
          break;
        }
        case "PERMISSION_DENIED":{
          console.log("权限不足，role为stranger的时候会出现");
          this.setState({"qrPicUrl":"","tip1":"圈外公众号","tip2":"该微信号尚未在圈外报名，扫码了解更多"})
          clearTimeout(this.timer);
          break;
        }
        case "ERROR":{
          console.log("socket异常消息:",data.msg);
          // 弹出登录异常提示框
          this.closeDialog();
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
   * 立即关闭弹出窗口
   * @param e
   */
  closeDialog(e){
    const {dispatch} = this.props;
    dispatch(set("login.qrVisible",false));
    this.closeSocket();
  }

  /**
   * 缓慢关闭弹出窗口
   */
  slowCloseDialog(){
    // this.closesocket();
    clearTimeout(this.timer);
    setTimeout(()=>{
      this.closeDialog();
      this.context.router.push({
        pathname:"/home/fragment",
      });
    },1000);
  }


  render(){
    // 从属性中取出相关属性
    const open = _.get(this.props,"login.qrVisible",false);
    return (
      <Dialog contentStyle={style.dialog_content} open={open}>
        <FloatingActionButton onClick={(e)=>this.closeDialog(e)} style={style.dialog_close} mini={true} >
          <ContentAdd />
        </FloatingActionButton>
          <img style={style.login_img} src={this.state.userPic?this.state.userPic:this.state.qrPicUrl}/>
          <p style={style.p}>{this.state.userName?this.state.userName:this.state.tip1}</p>
          <p style={style.successTip}>{this.state.tip2}</p>
      </Dialog>
    )
  }
}

