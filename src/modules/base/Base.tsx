import * as React from "react"
import {connect} from "react-redux"
import {set,alertMsg} from "redux/actions"
import {Grid, Row, Col} from "react-flexbox-grid"
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./Base.less"
import {style} from "./Base.ts";
import AlertMessage from "../../components/AlertMessage"
import NavigatorBar from "../../components/NavigatorBar";
import { isPending, renderExist } from "../../utils/helpers";
import Loading from "../../components/Loading";

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

  closeBaseAlert(){
    const {dispatch} = this.props;
    dispatch(set("base.showModal",false));
  }

  render() {

    return (
      <MuiThemeProvider>
        <div className="container">
          <NavigatorBar isFixed={false}/>
          {this.props.children}
          <AlertMessage open={this.props.base.showModal}
                        modal={false}
                        content={this.props.base.alertMsg.msg}
                        title={this.props.base.alertMsg.title}
                        handleClose={()=>this.closeBaseAlert()} />
          {renderExist(isPending(this.props, 'base.loading'), <Loading/>)}
        </div>
      </MuiThemeProvider>
    )
  }
}
