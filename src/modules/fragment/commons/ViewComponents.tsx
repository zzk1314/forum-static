import * as React from "react";
import "./ViewComponents.less";

import AssetImg from "../../../components/AssetImg";
interface HomeIconProps {
  showHomeIcon: boolean;
}
export class RISE_HomeIcon extends React.Component<HomeIconProps, any> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleClickGoHomePage() {
    this.context.router.push("/fragment/learn")
  }

  render() {
    if(this.props.showHomeIcon) {
      return (
        <div className="pc-icon" onClick={() => this.handleClickGoHomePage()}>
          <AssetImg type="pc_home_icon" size="50"/>
          <span>小课首页</span>
        </div>
      )
    } else {
      return null
    }
  }

}

interface TitleBarProps {
  content: string;
}
export class RISE_TitleBar extends React.Component<TitleBarProps, any> {

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


