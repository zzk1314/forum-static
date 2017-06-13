import * as React from "react";
import "./SwipeableViews.less"
import {renderExist} from "../utils/helpers";

export default class SwipeableViews extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {

    };

  }

  renderChildren(){

    const { children,index } = this.props;
    return renderExist(children,children.map((item,key)=>{
      return (
        <div className={`view-item ${key===index?'show':''}`} key={key}>
          {item}
        </div>
      )
    }));
  }

  render(){



    return (
      <div className="rise-plan-views">
        <div className="views-list">
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
