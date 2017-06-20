import * as React from "react"
import "./Toast.less"

export default class Toast extends React.Component<any, any> {

  constructor() {
    super()
  }

  render() {
    const {show, id, children} = this.props;

    return (
      <div
        id={id}
        className="toast-container"
        style={{display: show ? "block" : "none"}}
      >
        <div className="toast-bg">
          <div className="toast-icon"></div>
          <div className="toast-content">
            {children}
          </div>
        </div>
      </div>
    )
  }

}

