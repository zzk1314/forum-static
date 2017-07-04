import * as React from "react";
import "./Personal.less";
import { ModuleHeader } from "../../commons/FragmentComponent";

interface PersonalStates {

}
interface PersonalProps {

}
export default class Personal extends React.Component<PersonalStates, PersonalProps> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    // 渲染个人中心的栏目列表
    const renderColumns = () => {
      return (
        <div className="personal-columns">
          <div className="column">
            <div onClick={() => this.context.router.push({pathname: "/fragment/customer/profile"})}>个人信息</div>
            <div onClick={() => this.context.router.push({pathname: "/fragment/customer/account"})}>我的账户</div>
            <div className="last-column" onClick={() => this.context.router.push({pathname: "/fragment/customer/help"})}>帮助</div>
          </div>
        </div>
      )
    }

    return (
      <div className="personal-container">
        <div className="personal-page">
          <div className="personal-header">个人主页</div>
          {renderColumns()}
          <div className="column-detail">
            {this.props.children}
          </div>
        </div>
      </div>
    )

  }

}
