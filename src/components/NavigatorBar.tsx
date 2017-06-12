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

  componentWillMount(){
    this.checkCurNav();

  }



  handleClickNav(navId){
    switch(navId){
      case NavType.Home:{
        console.log('切换到 home');
        this.setState({activeNav:NavType.Home})
        break;
      }
      case NavType.Rise:{
        console.log('切换到 Rise');
        this.setState({activeNav:NavType.Rise})
        break;

      }
      case NavType.Forum:{
        console.log('切换到 Forum');
        this.setState({activeNav:NavType.Forum})
        break;
      }
    }
  }

  checkCurNav(){
    let url = window.location.pathname;
    if(url = '/fragment/plan'){
      this.setState({activeNav:NavType.Rise});
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
            <div className={`nav-item ${this.state.activeNav===NavType.Home?'active':''}`} onClick={()=>this.handleClickNav(NavType.Home)}>首页</div>
            <div className={`nav-item ${this.state.activeNav===NavType.Rise?'active':''}`} onClick={()=>this.handleClickNav(NavType.Rise)}>RISE</div>
            <div className={`nav-item ${this.state.activeNav===NavType.Forum?'active':''}`} onClick={()=>this.handleClickNav(NavType.Forum)}>论坛</div>
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
