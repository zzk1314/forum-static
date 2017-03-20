import * as React from "react";
import {connect} from "react-redux";


@connect(state => state)
export default class Welcome extends React.Component<any,any> {

  render() {

    return (
      <div style={{top: "50%", marginLeft: "-36", position: "absolute", left: "50%"}}>
        <h1>欢迎来到，运营后台</h1>
      </div>
    )
  }
}
