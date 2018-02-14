import * as React from 'react'
import { connect } from 'react-redux'
import { set, alertMsg } from 'redux/actions'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AlertMessage from '../../components/AlertMessage'
import Loading from '../../components/Loading'
import NavigatorBar from '../../components/NavigatorBar.tsx'
import { isPending, renderExist } from '../../utils/helpers'
import { pget } from '../../utils/request'
import './RiseBase.less'

@connect(state => state)
export default class Main extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      open: false,
      showPage: false
    }
  }

  componentWillMount() {
    pget('/rise/customer/info').then(res => {
      if(res.code === 200) {
        window.ENV.userName = res.msg.nickname
        window.ENV.headImgUrl = res.msg.headimgurl
      }
      this.setState({showPage: true})
    })
  }

  closeBaseAlert() {
    const {dispatch} = this.props
    dispatch(set('base.showModal', false))
  }

  render() {
    if(!this.state.showPage) {
      return <div></div>
    }

    const actions = [ {
      "label": "我知道了",
      "onClick": () => this.closeBaseAlert(),
      "primary": true
    } ]

    const renderFeedBack = () => {
      return (
        <div className="feed-back">
          <a href={`/pc/survey/wjx?activity=${window.ENV.feedBack}`} target="_blank">
            <img src="https://static.iqycamp.com/images/pcFeedBack.png"/>
          </a>
        </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <div>
          <AlertMessage
            open={this.props.base.showModal}
            modal={false}
            content={this.props.base.alertMsg.msg}
            title={this.props.base.alertMsg.title}
            handleClose={() => this.closeBaseAlert()}
            actions={actions}
          />
          {renderFeedBack()}
          {renderExist(isPending(this.props, 'base.loading'), <Loading/>)}
        </div>
      )
    }

    return (
      <MuiThemeProvider>
        <div className="rise-base">
          <NavigatorBar/>
          <div className="min-width">{this.props.children}</div>
          {renderOtherComponents()}
        </div>
      </MuiThemeProvider>
    )
  }
}
