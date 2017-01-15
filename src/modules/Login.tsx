import * as React from "react"
import {connect} from "react-redux"
import {set} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import * as _ from "lodash"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import "./Login.less"
import {pget, ppost} from "utils/request";
import Snackbar from 'material-ui/Snackbar';

@connect(state => state)
export default class Login extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      qrPicUrl: null,
      snackOpen: false,
      message: "",
      userName:null,
      headImage:null,
    }
    this.webSocket = null;
    this.timer = null;
  }

  private timer;
  private webSocket: WebSocket;

  componentWillMount() {
    this.openSocket();
  }


  /**
   * 打开socket,请求二维码
   */
  openSocket() {
    if ("WebSocket" in window) {
      console.log("支持");
    } else {
      alert("该浏览器不支持socket");
    }
    // 创建socket www.confucius.mobi
    this.webSocket = new WebSocket(window.ENV.loginSocketUrl);
    console.log(this.webSocket);
    this.webSocket.onopen = e => {
      console.log("链接打开!");
    };
    // 处理消息
    this.webSocket.onmessage = e => {
      this.dispatchMessage(e);
    };
    this.webSocket.onerror = e => {
      console.log("socket回调,异常处理", e)
    };
    this.webSocket.onclose = e => {
      console.log("socket回调，真正关闭链接")
    };
  }

  /**
   * 处理消息
   * @param event 消息事件
   */
  dispatchMessage(event: {type: String.required}) {
    console.log("socket回调，处理消息", event);
    if (_.isEqual(event.type, "message")) {
      let data = JSON.parse(event.data);
      switch (data.type) {
        case "QR_CREATE": {
          console.log("创建二维码");
          this.showMsg("即将加载二维码，请稍后");
          this.setState({qrPicUrl: data.picUrl});
          this.timer = setTimeout(() => this.refreshQRCode(), 60000);
          break;
        }
        case "LOGIN_SUCCESS": {
          const {weixinName,headimgUrl,role="stranger"} = data.data;
          this.setState({userName:weixinName,headImage:headimgUrl});
          console.log("login success", weixinName,headimgUrl);
          if(_.isEqual("stranger",role)){
            this.showMsg("请先关注圈外公众号了解更多信息");
            setTimeout(()=>{
              window.location.href="/servercode";
            },2000);
          } else {
            this.showMsg("恭喜您登录成功,即将跳转到之前页面");
            this.jumpBack();
          }
          this.closeSocket();
          break;
        }
        case "PERMISSION_DENIED": {
          this.showMsg("您暂时还没报名，请关注公众号了解更多!");
          clearTimeout(this.timer);
          this.closeSocket();
          // 跳转到服务号页面
          setTimeout(()=>{
            window.location.href="/servercode";
          },2000);
          break;
        }
        case "NOT_FOLLOW" :{
          console.log("NOT_FOLLOW");
          this.showMsg("请先关注圈外公众号了解更多信息");
          this.closeSocket();
          // 跳转到服务号页面
          setTimeout(()=>{
            window.location.href="/servercode";
          },2000);
          break;
        }
        case "ERROR": {
          console.log("socket异常消息:", data.msg);
          // 弹出登录异常提示框
          this.showMsg("登录异常:"+data.msg);
          break;
        }
        default: {
          console.log("未处理的Message类型", data.msg);
          this.showMsg(data.msg);
        }
      }
    } else {
      console.log("未处理的Type类型", event);
      this.showMsg("异常的type类型",event);
    }
  }

  /**
   * 关闭socket，提供该给组件外面使用
   */
  closeSocket() {
    this.webSocket && this.webSocket.close();
    clearTimeout(this.timer);
    console.log("关闭socket");
  }

  /**
   * 发送msg消息
   * @param msg
   */
  sendTextMessage(msg: {"type": String.required}) {
    this.webSocket.send(JSON.stringify(msg));
  }

  /**
   * 刷新二维码
   */
  refreshQRCode() {
    console.log("刷新二维码");
    let param = {"type": "REFRESH_CODE"};
    this.sendTextMessage(param);
  }

  /**
   * 组件移除时尝试关闭socket
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.webSocket && this.webSocket.close();
  }


  /**
   *  登录成功，跳到进入登录界面之前的界面
   */
  jumpBack() {
    //  获得url
    setTimeout(()=>{
      if(this.props.location.query.callbackUrl){
        console.log(this.props.location.query.callbackUrl);
        window.location.href=this.props.location.query.callbackUrl;
      } else {
        window.location.href="/home";
      }
    },2000)
  }

  showMsg(msg) {
    this.setState({
      snackOpen: true,
      message: msg
    });
  }


  render() {
    const {userName,headImage} = this.state;
    const renderTips = () => {
      if (!userName) {
        // 用户仍未登录
        return <p className="loginTip">微信扫一扫，登录圈外</p>
      } else {
        return <p className="loginTip"><span style={{color:"#55cbcb"}}>{userName}</span>,已登录圈外,</p>
      }
    }

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg"  src={headImage?headImage:this.state.qrPicUrl}/>
          {renderTips()}
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}
