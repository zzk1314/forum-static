import * as React from 'react'
import * as _ from 'lodash'
import { pget, ppost } from 'utils/request'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Snackbar from 'material-ui/Snackbar'
import './Login.less'
import NavigatorBar from '../components/NavigatorBar'

export default class Login extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    pget('/wx/oauth/pc/auth', {
      callbackUrl: this.props.location.query.callbackUrl ?
        `${encodeURI(this.props.location.query.callbackUrl)}` :
        `https://${window.location.host}/fragment/rise`
    }).then(res => {
      if(res.code === 200) {
        let param = _.merge({}, res.msg, { id: 'qr_code' })
        window.obj = new WxLogin(param)
      }
    })
  }

  render() {
    return (
      <div className="messageContainer container">
        <NavigatorBar/>
        <div className="qrContainer" style={{ textAlign: 'center', marginTop: 130 }}>
          <div id="qr_code"/>
          <p className="loginTip">微信扫一扫，登录圈外</p>
        </div>
      </div>
    )
  }
}
