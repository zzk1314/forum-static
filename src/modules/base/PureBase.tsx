import * as React from "react"
import {connect} from "react-redux"
import {set,alertMsg} from "redux/actions"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./Base.less"

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

  componentWillMount(){
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
