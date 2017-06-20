import * as React from 'react';
import { connect } from 'react-redux';
import AssetImg from "../components/AssetImg";
import Paper from 'material-ui/Paper';
import './NavigatorBar.less';

enum NavType {
  Home = 1,
  Rise,
  Forum
}

// TODO 后期删除 showNotes、isFixed
interface NavigatorBarProps {
  isFixed: boolean;
  showNotes?: boolean;
}
interface NavigatorBarStates {
  size: object;
  activeNav: number;
  hoverShowNotes: boolean;
}
@connect(state => state)
export default class NavigatorBar extends React.Component<NavigatorBarProps, NavigatorBarStates> {
  constructor(props) {
    super(props);
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
    this.checkCurNav();
  }

  handleClickNav(navId) {
    switch(navId) {
      case NavType.Home: {
        this.setState({ activeNav: NavType.Home }, () => {
          this.context.router.push({ pathname: '/home' })
        })
        break;
      }
      case NavType.Rise: {
        this.setState({ activeNav: NavType.Rise }, () => {
          this.context.router.push({ pathname: '/fragment/rise' })
        })
        break;
      }
      case NavType.Forum: {
        this.setState({ activeNav: NavType.Forum })
        break;
      }
      default: {
        break;
      }
    }
  }

  checkCurNav() {
    let url = window.location.pathname;
    if(url === '/fragment/rise' || url === '/fragment/learn') {
      this.setState({ activeNav: NavType.Rise });
    } else if(url === '/home' || url === '/') {
      this.setState({ activeNav: NavType.Home });
    }
  }

  render() {

    const { isFixed, showNotes = true } = this.props
    const { activeNav, hoverShowNotes } = this.state

    const renderNotes = () => {
      if(showNotes && hoverShowNotes) {
        return (
          <Paper style={{ position: "absolute", top: 70, marginLeft: "-10px" }}>
            <div className="nav-notes">个人中心正在开发中<br/>敬请期待</div>
          </Paper>
        )
      }
    }

    return (
      <div className={isFixed ? `nav-container-fixed` : `nav-container`}>
        <div className="navigator-bar">
          <div className="nav-logo">
            <div className="logo-img">
              <AssetImg url="http://static.iqycamp.com/images/logo.png" width="36" height="38"/>
            </div>
            <span className="logo-name">
                圈外
            </span>
          </div>
          <div className="nav-btn">
            <button className={`nav-item first-item ${activeNav === NavType.Home ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Home)}>首页
            </button>
            <button className={`nav-item ${activeNav === NavType.Rise ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Rise)}>RISE
            </button>
          </div>
          <div className="nav-user" onMouseOver={() => this.setState({hoverShowNotes: true})}
               onMouseOut={() => this.setState({hoverShowNotes: false})}>
            <div className="user-img"><img src={window.ENV.headImage}/></div>
            <div className="user-name">{window.ENV.userName}</div>
            {renderNotes()}
          </div>
        </div>
      </div>
    )
  }
}
