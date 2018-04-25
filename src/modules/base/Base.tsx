import * as React from 'react'
import { connect } from 'react-redux'
import { set, alertMsg } from 'redux/actions'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Base.less'
import { style } from './Base.ts'
import AlertMessage from '../../components/AlertMessage'
import NavigatorBar from '../../components/NavigatorBar'
import Loading from '../../components/Loading'
import { isPending, renderExist } from '../../utils/helpers'
import { pget } from '../../utils/request'
import sa from 'sa-sdk-javascript';
import { merge, isEmpty, isPlainObject, isArray } from 'lodash';
import ProxyComponent from '../../components/proxy/ProxyComponent'

@connect(state => state)
export default class Main extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showPage: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    // 通过此接口弥补 window.ENV
    pget('/rise/customer/info').then(res => {
      if(res.code === 200) {
        window.ENV.userName = res.msg.nickname
        window.ENV.headImgUrl = res.msg.headimgurl
        window.ENV.riseId = res.msg.riseId;
        window.ENV.isAsst = res.msg.isAsst;
        window.ENV.roleNames = res.msg.roleNames;
        window.ENV.classGroupMaps = res.msg.classGroupMaps;
      }

      sa.init({
        heatmap_url: 'https://static.sensorsdata.cn/sdk/1.9.13/heatmap.min.js',
        name: 'sa',
        web_url: `https://quanwai.cloud.sensorsdata.cn/?project=${window.ENV.sensorsProject}`,
        server_url: `https://quanwai.cloud.sensorsdata.cn:4006/sa?token=0a145b5e1c9814f4&project=${window.ENV.sensorsProject}`,
        heatmap: {},
        is_single_page: true,
        show_log: true
      });
      if(!!res.msg.riseId) {
        sa.login(res.msg.riseId);
      }

      let props = { isAsst: window.ENV.isAsst, platformType: 1 };

      if(!isEmpty(window.ENV.classGroupMaps) && isPlainObject(window.ENV.classGroupMaps)) {
        // merge班组信息
        merge(props, window.ENV.classGroupMaps);
      }
      if(!isEmpty(window.ENV.roleNames) && isArray(window.ENV.roleNames)) {
        merge(props, { 'roleNames': window.ENV.roleNames })
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

    return (
      <MuiThemeProvider>
        <div className="container">
          <ProxyComponent/>
          <NavigatorBar/>
          <div style={{ marginTop: 80 }}>
            {this.props.children}
          </div>
          <AlertMessage open={this.props.base.showModal}
                        modal={false}
                        content={this.props.base.alertMsg.msg}
                        title={this.props.base.alertMsg.title}
                        handleClose={() => this.closeBaseAlert()}/>
          {renderExist(isPending(this.props, 'base.loading'), <Loading/>)}
        </div>
      </MuiThemeProvider>
    )
  }
}
