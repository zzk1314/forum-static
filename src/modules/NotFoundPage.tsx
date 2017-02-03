import * as React from "react"
import {connect} from "react-redux"
import "./Login.less"
import {imgSrc} from "utils/imgSrc"

@connect(state => state)
export default class Reject extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      qrSrc:imgSrc.notFound,
    }
  }

  render() {

    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={this.state.qrSrc}/>
          <p style={{cursor: "pointer"}} onClick={()=>{window.location.href=`http://${window.location.host}/community`}} className="loginTip">网址有误，点击返回首页</p>
        </div>
      </div>
    )
  }
}
