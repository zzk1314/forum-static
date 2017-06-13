import * as React from "react"
import {connect} from "react-redux"
import {set,alertMsg} from "redux/actions"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./RiseBase.less"
import NavigatorBar from  "../../components/NavigatorBar";
import AlertMessage from "../../components/AlertMessage"
import AssetImg from "../../components/AssetImg"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
  }

  handleClickGoRiseHome(){
    this.context.router.push("/fragment/plan");
  }

  closeBaseAlert(){
    const {dispatch} = this.props;
    dispatch(set("base.showModal",false));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="rise-base">
          <NavigatorBar/>
          {this.props.children}
          <div className="pc-icon" onClick={()=>this.handleClickGoRiseHome()}>
            <AssetImg type="pc_home_icon" size={50}/>
            <span>小课首页</span>
          </div>
          <AlertMessage
            open={this.props.base.showModal}
            modal={false}
            content={this.props.base.alertMsg.msg}
            title={this.props.base.alertMsg.title}
            handleClose={()=>this.closeBaseAlert()}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}
