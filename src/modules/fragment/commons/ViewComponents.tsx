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

interface BreadCrumbsProps {
  navList: object;
}
export class RISE_BreadCrumbsProps extends React.Component<BreadCrumbsProps, any> {

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
    const { navList } = this.props

    const renderNavs = () => {
      return (
        navList.map((item, idx) => {
          if(idx === 0) {
            return (
              <div className="bread-first-item" key={idx}
                   onClick={() => this.handleClickGoHomePage()}>
                {item}
              </div>
            )
          } else {
            return (
              <div className="bread-items" key={idx}>
                <div>&gt;</div>
                <div>{item}</div>
              </div>
            )
          }
        })
      )
    }

    return (
      <div className="bread-crumbs">
        {renderNavs()}
      </div>
    )
  }

}

