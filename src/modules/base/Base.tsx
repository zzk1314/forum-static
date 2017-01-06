import * as React from "react"
import {connect} from "react-redux"
import {set} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import * as _ from "lodash"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TweenOne from 'rc-tween-one'
import "./Base.less"
import {pget, ppost} from "utils/request"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {get} from "axios"
import AlertMessage from "../../components/AlertMessage"
import test from "../../utils/auth"
const P = "base"

const style = {
  container: {
    backgroundColor: "red"
  },
  banner: {
    backgroundColor: "white",
    padding: 0,
    height: "91px",
    width: "1000px",
    margin: "0 auto"
  },
  avatar: {
    marginRight: "6px",
    marginTop: "16px"
  },
  navLabel: {
    fontSize: "20px",
    fontWeight: "300",
  },
};

const MenuType = {
  Home: "home",
  Fragment: "fragment",
}

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    console.log(typeof test)

    this.state = {open:false}
  }

  // 打开首页的时候缓存
  componentWillMount() {
    // 这里就查询用户
    const {user, dispatch} = this.props;
    if (_.isEmpty(user)) {
      pget(`/account/get`).then(res => {
        console.log("预加载用户信息");
        dispatch(set("user", res.msg));
      }).catch(err => console.log(err));
    }
  }


  componentWillReceiveProps(newProps) {

  }

  /**
   * 处理跳转事件
   * @param e
   * @param type
   */
  handleMenuClick(e, type) {
    const {dispatch, location = {}} = this.props;
    const {pathname = "/home", query = null} = location;
    // 请求后端查询要前往的地址
    dispatch(set("page.curNav", type));
    dispatch(set("page.wannaRoute", {pathname: pathname, query: query}));
    dispatch(set("loading.home",true));
    if (type === MenuType.Fragment) {
      // 进入碎片化
      pget("/pc/fragment/where",this.context.router)
        .then(res=>{
          dispatch(set("loading.home",false));
          if(res.code===200){
            // 请求成功
            console.log("查询成功，开始跳转",res.msg);
            this.context.router.push({
              pathname:res.msg.pathName,
              query:res.msg.query
            })
          } else {
            alert(res.msg);
          }
        }).catch(err=>console.log(err));
    } else if (type === MenuType.Home) {
      dispatch(set("loading.home",false));
      this.context.router.push({
        pathname: "/home",
      })
    }
  }

  render() {
    const {page, user, show = false, location} = this.props;
    const curNav = _.get(page, "curNav", "home");
    const weixin = _.get(user, "weixin", {});
    // 渲染头像
    const renderAvatar = () => {
      if (_.isEqual(curNav, "fragment") && !_.isUndefined(user)) {
        if (_.isEmpty(weixin)) {
          return (
            <div>
              <Avatar className="avatar" style={style.avatar} src=""/>
              <div className="avatarName">未登录</div>
            </div>
          )
        } else {
          return (
            <div>
              <Avatar size={30} style={style.avatar} src={weixin.headimgUrl}/>
              <div className="avatarName">{weixin.weixinName}</div>
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
          <img src="http://www.confucius.mobi/images/logo.png"/>
          <span className="logoName">圈外</span>
        </div>
      )
    }

    // 这里是设置容器的的
    const renderBanner = () => {
      return (
        <Toolbar style={style.banner}>
          {/* logo */}
          <ToolbarGroup >
            {renderLogo()}
            {/* navigation */}
            <FlatButton
              labelStyle={style.navLabel}
              primary={curNav==="home"}
              ref="getHomeMenu"
              onClick={(e)=>this.handleMenuClick(e,"home")}
              label="首页"
            />
            <FlatButton
              labelStyle={style.navLabel}
              primary={curNav==="fragment"}
              ref="getFragmentMenu"
              onClick={(e)=>this.handleMenuClick(e,"fragment")}
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
          {/* 这里是内容 */}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
