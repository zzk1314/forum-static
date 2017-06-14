import * as React from "react"
import { connect } from "react-redux"
import { set, alertMsg } from "redux/actions"
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import NavigatorBar from  "../../components/NavigatorBar"
import AlertMessage from "../../components/AlertMessage"
import AssetImg from "../../components/AssetImg"
import VerticalBarLoading from "../../components/Loading"
import {isPending, renderExist} from "../../utils/helpers";
import Loading from "../../components/Loading";

import "./RiseBase.less";

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super()
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(set("showHomeIcon", false));
  }

  handleClickGoRiseHome() {
    this.context.router.push("/fragment/learn");
  }

  closeBaseAlert() {
    const {dispatch} = this.props;
    dispatch(set("base.showModal", false));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="rise-base">
          <NavigatorBar/>
          <div className="min-width">{this.props.children}</div>
          {renderExist(isPending(this.props,'base.loading'),
            <Loading/>
          )}
          <div className={`pc-icon ${this.props.showHomeIcon?'show':''}`} onClick={()=>this.handleClickGoRiseHome()}>
            <AssetImg type="pc_home_icon" size={50}/>
            <span>小课首页</span>
          </div>
          <AlertMessage
            open={this.props.base.showModal}
            modal={false}
            content={this.props.base.alertMsg.msg}
            title={this.props.base.alertMsg.title}
            handleClose={() => this.closeBaseAlert()}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}
