import * as React from "react"
import {connect} from "react-redux"
import "./Login.less"
import Snackbar from 'material-ui/Snackbar';
import {imgSrc} from "utils/imgSrc";

@connect(state => state)
export default class ServerCode extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      qrSrc:imgSrc.serverCode,
      message:"您还没有制定任何计划哦,请先去公众号制定计划吧！",
      snackOpen:false,
    }
  }

  componentWillMount(){
    this.setState({snackOpen:true});
  }

  render() {
    return (
      <div className="messageContainer">
        <div className="qrContainer">
          <img className="qrImg" src={this.state.qrSrc}/>
          <p className="loginTip">你还未开始该项训练。微信扫码，了解更多</p>
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}/>
      </div>
    )
  }
}
