import * as React from "react";
import "./TitleBar.less"

interface TitleBarProps {
  content: string;
}
export default class TitleBar extends React.Component<TitleBarProps, any> {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="title-bar">
        <span>{this.props.content}</span>
      </div>
    )
  }

}
