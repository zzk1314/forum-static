import * as React from "react"
import {connect} from "react-redux"
import {set} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./Base.less"
import {style} from "./Base.ts";
import {imgSrc} from "utils/imgSrc"


@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {open:false}
  }

  render() {
    console.log("render");
    // 渲染头像
    const renderAvatar = () => {
      if (this.props.location.pathname.indexOf("fragment") > 0) {
        if (!window.ENV.userName) {
          return (
            <div>
              <Avatar className="avatar" style={style.avatar} src=""/>
              <div className="avatarName">未登录</div>
            </div>
          )
        } else {
          return (
            <div>
              <Avatar size={30} style={style.avatar} src={window.ENV.headImage}/>
              <div className="avatarName">{window.ENV.userName}</div>
            </div>
          )
        }
      } else {
        return null;
      }
    }

    const renderLogo = () => {
      return (
        <div className="logoContainer">
          <img src={imgSrc.logo}/>
          <span className="logoName">圈外</span>
        </div>
      )
    };

    // 这里是设置容器的的
    const renderBanner = () => {
      return (
        <Toolbar style={style.banner}>
          <ToolbarGroup >
            {renderLogo()}
            <FlatButton
              labelStyle={style.navLabel}
              primary={this.props.location.pathname.indexOf("home") > -1}
              onClick={()=>window.location.href="/home"}
              label="首页"
            />
            <FlatButton
              labelStyle={style.navLabel}
              primary={this.props.location.pathname.indexOf("fragment") > -1 || this.props.location.pathname.indexOf("servercode") > -1}
              onClick={()=>window.location.href="/community"}
              label={"碎片化"}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            {renderAvatar()}
          </ToolbarGroup>
        </Toolbar>
      )
    }

    return (
      <MuiThemeProvider>
        <div className="container">
          <div className="topBannerContainer">
            {renderBanner()}
          </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
