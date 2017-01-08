import * as React from "react"
import {connect} from "react-redux"
import "./Login.less"
import {imgSrc} from "utils/imgSrc"

@connect(state => state)
export default class Stranger extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      qrSrc:imgSrc.serverCode,
    }
  }

  render() {

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={this.state.qrSrc}/>
          <p className="loginTip">请先关注公众号。微信扫码，了解更多</p>
        </div>
      </div>
    )
  }
}
