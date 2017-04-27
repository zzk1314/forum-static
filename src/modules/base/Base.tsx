import * as React from "react"
import {connect} from "react-redux"
import {set,alertMsg} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./Base.less"
import {style} from "./Base.ts";
import {imgSrc} from "utils/imgSrc"
import AlertMessage from "../../components/AlertMessage"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {open: false};
  }

  closeBaseAlert(){
    const {dispatch} = this.props;
    dispatch(set("base.showModal",false));
  }

  render() {

    // 渲染头像
    const renderAvatar = () => {
      if (this.props.location.pathname.indexOf("fragment") > 0 ||
          this.props.location.pathname.indexOf("asst") > 0) {
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


    return (
      <MuiThemeProvider>
        <div className="container">
          <div className="topBannerContainer">
            <Toolbar style={style.banner}>
              <ToolbarGroup >
                <div className="logoContainer">
                  <img style={{width:"36px",marginTop:"5px"}} src={imgSrc.logo}/>
                  <span className="logoName">圈外</span>
                </div>
                {window.ENV.backend?null:
                <div>
                  <FlatButton
                    labelStyle={(this.props.location.pathname.indexOf("home") > -1)?style.navLabelActive:style.navLabel}
                    onClick={()=>{const {dispatch} = this.props;dispatch(set("page.scroll",{x:0,y:0})); this.context.router.push("/home")}}
                    label="首页"
                  />
                  <FlatButton
                    labelStyle={(this.props.location.pathname.indexOf("fragment") > -1 || this.props.location.pathname.indexOf("servercode") > -1)?style.navLabelActive:style.navLabel}
                    onClick={()=>{const {dispatch} = this.props;dispatch(set("page.scroll",{x:0,y:0})); this.context.router.push("/fragment/rise")}}
                    label="Rise"
                  />
                </div>
                }
              </ToolbarGroup>
              <ToolbarGroup>
                {renderAvatar()}
              </ToolbarGroup>
            </Toolbar>
          </div>
          {this.props.children}
          <AlertMessage open={this.props.base.showModal}
                        modal={false}
                        content={this.props.base.alertMsg.msg}
                        title={this.props.base.alertMsg.title}
                        handleClose={()=>this.closeBaseAlert()} />
        </div>
      </MuiThemeProvider>
    )
  }
}
