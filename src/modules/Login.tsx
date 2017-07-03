import * as React from "react"
import { connect } from "react-redux"
import { set } from "redux/actions"
import { Grid, Row, Col } from "react-flexbox-grid"
import * as _ from "lodash"
import "./Login.less"
import { pget, ppost } from "utils/request";
import Snackbar from 'material-ui/Snackbar';

@connect(state => state)
export default class Login extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      snackOpen: false,
      message: "",
      userName: null,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    pget('/wx/oauth/pc/auth', {
      callbackUrl: this.props.location.query.callbackUrl ?
        `${encodeURIComponent(this.props.location.query.callbackUrl)}` :
        `https://${window.location.host}/fragment/rise`
    }).then(res => {
      if(res.code === 200) {
        let param = _.merge({}, res.msg, { id: "qr_code" });
        window.obj = new WxLogin(param);
      }
    });
  }

  render() {
    const { userName } = this.state;
    const renderTips = () => {
      if(!userName) {
        return <p className="loginTip">微信扫一扫，登录圈外</p>
      } else {
        return <p className="loginTip"><span style={{ color: "#55cbcb" }}>{userName}</span>,已登录圈外,</p>
      }
    }

    return (
      <div className="messageContainer">
        <div className="qrContainer" style={{ textAlign: 'center' }}>
          <div id="qr_code"/>
          {renderTips()}
        </div>
        <Snackbar
          contentStyle={{ textAlign: "center" }}
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}
        />
      </div>
    );
  }
}
