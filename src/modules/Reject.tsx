import * as React from "react"
import {connect} from "react-redux"
import "./Login.less"

@connect(state => state)
export default class Reject extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      qrSrc:"http://www.confucius.mobi/images/serverQrCode.jpg"
    }
  }

  render() {

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={this.state.qrSrc}/>
          <p className="loginTip">您没有该操作权限，扫码了解更多</p>
        </div>
      </div>
    )
  }
}
