import * as React from "react"
import * as _ from "lodash"
import "./VerticalBarLoading.less"

export default class VerticalBarLoading extends React.Component<any,any>{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="loading-spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    )
  }
}
