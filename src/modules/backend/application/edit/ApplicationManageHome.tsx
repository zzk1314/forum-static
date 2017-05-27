import * as React from "react"
import ApplicationProblemCategory from "./ApplicationProblemCategory";

export default class ApplicationManageHome extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="problemContent">
        <div className="leftList">
          <ApplicationProblemCategory/>
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }

}


