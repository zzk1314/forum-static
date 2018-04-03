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
import './RiseBase.less';
import { merge } from 'lodash';
import sa from 'sa-sdk-javascript';

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

        window.ENV.riseId = res.msg.riseId;
        window.ENV.className = res.msg.className;
        window.ENV.groupId = res.msg.groupId;
        window.ENV.roleName = res.msg.roleName;
        window.ENV.isAsst = res.msg.isAsst;
      }

      sa.init({
        heatmap_url: 'https://static.sensorsdata.cn/sdk/1.9.13/heatmap.min.js',
        name: 'sa',
        web_url: `https://quanwai.cloud.sensorsdata.cn/?project=${window.ENV.sensorsProject}`,
        server_url: `https://quanwai.cloud.sensorsdata.cn:4006/sa?token=0a145b5e1c9814f4&project=${window.ENV.sensorsProject}`,
        heatmap: {},
        is_single_page: true,
      });
      if(!!res.msg.riseId) {
        sa.login(res.msg.riseId);
      }
      let props = { roleName: window.ENV.roleName, isAsst: window.ENV.isAsst, platformType: 1 };
      if(!!window.ENV.className && !!window.ENV.groupId) {
        merge(props, {
          className: window.ENV.className,
          groupId: window.ENV.groupId
        });
      }
      if(!!res.msg.riseId) {
        merge(props, {
          riseId: res.msg.riseId
        })
      }
      sa.registerPage(props);
      sa.quick('autoTrack');

      this.setState({ showPage: true })
    })
  }

  closeBaseAlert() {
    const { dispatch } = this.props
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
