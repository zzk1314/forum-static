import * as React from "react";
import {connect} from "react-redux";
import {loadAccount} from "./async";
import {BreakSignal, Stop} from "../../utils/request"


@connect(state => state)
export default class Welcome extends React.Component<any,any> {

  componentWillMount() {
    // 加载用户信息
    loadAccount().then(res => {
      const {code, msg} = res;
      if (code === 200) {
        window.ENV.userName = msg.weixinName;
        window.ENV.headImage = msg.headimgUrl;
      } else if (code === 401) {
        setTimeout(() => window.location.href = "/login?callbackUrl=/backend", 500);
        throw new BreakSignal("请先登录");
      } else {
        throw new BreakSignal(msg);
      }
    })
  }


  render() {

    return (
      <div style={{top: "50%", marginLeft: "-36", position: "absolute", left: "50%"}}>
        <h1>欢迎来到运营后台</h1>
      </div>
    )
  }
}
