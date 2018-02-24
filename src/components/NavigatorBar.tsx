import * as React from 'react'
import { connect } from 'react-redux'
import AssetImg from '../components/AssetImg'
import Paper from 'material-ui/Paper'
import './NavigatorBar.less'
import { Divider, Paper, Menu, MenuItem } from 'material-ui'

enum NavType {
  Home = 1,
  Rise = 2,
  Forum = 3,
  Course = 4,
  Article = 5,
}

interface NavigatorBarStates {
  size: object;
  activeNav: number;
  hoverShowNotes: boolean;
}

@connect(state => state)
export default class NavigatorBar extends React.Component<any, NavigatorBarStates> {

  constructor(props) {
    super(props)
    this.state = {
      size: {},
      activeNav: 0,
      hoverShowNotes: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.checkCurNav()
  }

  handleClickNav(navId) {
    switch(navId) {
      case NavType.Home: {
        this.setState({activeNav: NavType.Home}, () => {
          window.location.href = '/home'
        })
        break
      }
      case NavType.Rise: {
        this.setState({activeNav: NavType.Rise}, () => {
          this.context.router.push({pathname: '/fragment/rise'})
        })
        break
      }
      case NavType.Forum: {
        this.setState({activeNav: NavType.Forum})
        break
      }
      case NavType.Course: {
        this.setState({activeNav: NavType.Course}, () => {
          window.location.href = '/course_project';
        })
        break
      }
      case NavType.Article: {
        this.setState({activeNav: NavType.Article}, () => {
          window.location.href = '/article';
        })
        break
      }
      default: {
        break
      }
    }
  }

  checkCurNav() {
    let url = window.location.pathname
    if(url === '/fragment/rise' || url === '/fragment/learn') {
      this.setState({activeNav: NavType.Rise})
    } else if(url === '/home' || url === '/') {
      this.setState({activeNav: NavType.Home})
    } else if(url === '/course_project') {
      this.setState({activeNAV:NavType.Course})
    } else if(url === '/article') {
      this.setState({activeNAV:NavType.Article});
    }
  }

  // 页面进行跳转而非 ajax 请求，让后台拦截器进行拦截，以便进行缓存清除和页面重定向
  handleClickLoginOut() {
    window.location.href = '/logout'
  }

  render() {

    const {activeNav, hoverShowNotes} = this.state
    const {fix = true} = this.props

    const renderNotes = () => {
      if(hoverShowNotes) {
        return (
          <Paper className="nav-notes" style={{position: 'absolute', top: 70, marginLeft: '-10px'}}
                 onMouseLeave={() => {
                   this.setState({hoverShowNotes: false})
                 }}>
            <Menu style={{paddingTop: 20}}>
              <MenuItem primaryText="个人主页" onClick={() => this.context.router.push('/fragment/customer/profile')}/>
              <MenuItem primaryText="消息通知" onClick={() => this.context.router.push('/fragment/message')}/>
              <Divider/>
              <MenuItem primaryText="退出" onClick={() => this.handleClickLoginOut()}/>
            </Menu>
          </Paper>
        )
      }
    }

    return (
      <div className="nav-container-fixed" style={{position: fix ? 'fixed' : 'relative'}}
           onMouseLeave={() => this.setState({hoverShowNotes: false})}>
        <div className="navigator-bar">
          <div className="nav-logo">
            <div className="logo-img">
              <AssetImg url="https://static.iqycamp.com/images/logo.png" width="36" height="38"/>
            </div>
            <span className="logo-name">圈外同学
            </span>
          </div>
          <div className="nav-btn">
            <button className={`nav-item ${activeNav === NavType.Rise ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Rise)}>线上学习
            </button>
            <button className={`nav-item first-item ${activeNav === NavType.Article ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Article)}>文章
            </button>

            <button className={`nav-item first-item ${activeNav === NavType.Course ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Course)}>课程项目
            </button>
            <button className={`nav-item first-item ${activeNav === NavType.Home ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Home)}>首页
            </button>

          </div>
          {
            window.ENV.headImgUrl && window.ENV.userName ?
              <div className="nav-user" onMouseOver={() => this.setState({hoverShowNotes: true})}>
                <div className="user-img"><img src={window.ENV.headImgUrl}/></div>
                <div className="user-name">{window.ENV.userName}</div>
                {renderNotes()}
              </div> : null
          }
        </div>
      </div>
    )
  }
}
