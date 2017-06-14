import VerticalBarLoading from "./VerticalBarLoading";
import * as React from "react";
import "./Loading.less"

export default class Loading extends React.Component<any,any>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="global-loading">
        <div className="gl-mask"/>
        <div className="gl-loading">
          <VerticalBarLoading/>
        </div>
      </div>
    )
  }
}
