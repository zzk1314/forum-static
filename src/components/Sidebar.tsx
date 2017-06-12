import * as React from "react";
import "./Sidebar.less";
import {renderExist} from "../utils/helpers";


export default class Sidebar extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {};
  }



  render(){
    return (
      <div className="side-bar-container">
        <div className="side-bar">
          {renderExist(this.props.sidebar,this.props.sidebar)}
        </div>
        <div className="side-bar-content">
          {this.props.children}
        </div>
      </div>
    )
  }

}
