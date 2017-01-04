import * as React from "react"
import {connect} from "react-redux"
import "./Login.less"

@connect(state => state)
export default class ServerCode extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      qrSrc:"http://zzk.s1.natapp.cc/images/ServerQr.png"
    }
  }

  render() {

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={this.state.qrSrc}/>
          <p className="loginTip">该微信号尚未在圈外报名，扫码了解更多</p>
        </div>
      </div>
    )
  }
}
