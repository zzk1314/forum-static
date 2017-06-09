import * as React from 'react';
import './NavigatorBar.less';
import { merge } from "lodash";

enum NavType {
  Home=1,
  Rise,
  Forum
}

export default class NavigatorBar extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      size:{ },
      activeNav:0
    }
  }

  checkCurNav(){
    let url = window.location.pathname;
    if(url = '/fragment/plan'){
      this.setState({activeNav:2});
    }
  }

  componentWillMount(){
    this.handleResize();
    window.addEventListener("resize",this.handleResize.bind(this));
    this.checkCurNav();

  }

  componentWillUnmount(){
    window.removeEventListener("resize",this.handleResize);
  }



  handleResize() {
    let width =  window.innerWidth < 960 ? 960:window.innerWidth;
    this.setState({size:merge({userInfoWidth:`${width - 450 - 120}px`})});
  }

  handleClickNav(navId){
    switch(navId){
      case NavType.Home:{
        console.log('切换到 home');
        this.setState({activeNav:1})
        break;
      }
      case NavType.Rise:{
        console.log('切换到 Rise');
        this.setState({activeNav:2})
        break;

      }
      case NavType.Forum:{
        console.log('切换到 Forum');
        this.setState({activeNav:3})
        break;
      }
    }
  }

  render(){
    return(
      <div className="navigator-bar">
        <div className="nav-logo">
          <span className="logo-wrapper">
            <img className="logo-img"/>
          </span>
          <span className="logo-name">
            名称
          </span>
        </div>

        <div className="navigator">
          <div className="nav-list">
            <div className={`nav-item ${this.state.activeNav===1?'active':''}`} onClick={()=>this.handleClickNav(NavType.Home)}>首页</div>
            <div className={`nav-item ${this.state.activeNav===2?'active':''}`} onClick={()=>this.handleClickNav(NavType.Rise)}>RISE</div>
            <div className={`nav-item ${this.state.activeNav===3?'active':''}`} onClick={()=>this.handleClickNav(NavType.Forum)}>论坛</div>
          </div>
        </div>
        <div className="user-info" style={{width:this.state.size.userInfoWidth}}>
          <div className="user-info-wrapper">
            <div className="user-img"><img  src={`${window.ENV.headImage}`}/></div>
            <span className="user-name">{window.ENV.userName}</span>
          </div>
        </div>
      </div>
    )
  }
}
