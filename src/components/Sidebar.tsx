import * as React from "react";


export default class Sidebar extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="side-bar-container">
        {this.props.sidebar()}
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }

}
