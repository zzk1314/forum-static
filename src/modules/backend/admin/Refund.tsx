import * as React from "react"
import { connect } from "react-redux"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { refund } from "./async"
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Confirm from '../../../components/Confirm'

@connect(state => state)
export default class Refund extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      orderId: '',
      fee: '',
      alert: false,
    }
  }

  onSubmit() {
    this.setState({ alert: true })
  }

  submit() {
    const { fee, orderId } = this.state
    const { dispatch } = this.props
    this.setState({ alert: false })
    if(orderId == '') {
      dispatch(alertMsg('请输入订单号'))
      return
    }

    if(fee == '') {
      dispatch(alertMsg('请输入退款费用'))
      return
    }

    const param = { fee, orderId }
    refund(param).then(res => {
      if(res.code === 200) {
        dispatch(alertMsg('退款成功'))
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  render() {
    const { fee, orderId, alert } = this.state;

    const actions = [
      {
        "label": "确定",
        "onClick": this.submit.bind(this),
      },
      {
        "label": "取消",
        "onClick": () => this.setState({ alert: false }),
        "primary": true,
      }
    ]

    return (
      <div className="backend-refund" style={{marginLeft:20}}>
        <TextField
          floatingLabelText="输入订单号"
          onChange={(ev, value) => {
                this.setState({ orderId: value })
              }}
        /><br/>

        <TextField
          floatingLabelText="输入退款金额"
          onChange={(ev, value) => {
                this.setState({ fee: value })
              }}
        /><br/><br/>

        <Confirm content="确定要退款吗？" open={alert} actions={actions}/>

        <RaisedButton
          className="submit-btn" label="申请退款" primary={true}
          onTouchTap={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}
