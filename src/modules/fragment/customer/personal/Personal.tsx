import * as React from "react";
import "./Personal.less";

interface PersonalStates {
  chooseColumn: number;
}
export default class Personal extends React.Component<any, PersonalStates> {

  constructor() {
    super()
    this.state = {
      chooseColumn: this.handleTheChooseColumn()
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleTheChooseColumn() {
    const path = window.location.pathname
    if(path === "/fragment/customer/profile") {
      return 1
    } else if(path === "/fragment/customer/account") {
      return 2
    } else if(path === "/fragment/customer/help") {
      return 3
    } else {
      return 1
    }
  }

  render() {
    const { chooseColumn } = this.state

    // 渲染个人中心的栏目列表
    const renderColumns = () => {
      return (
        <div className="personal-columns">
          <div className="column">
            <div className={chooseColumn === 1 ? 'chosed' : ''}
                 onClick={() => {
                   this.setState({ chooseColumn: 1 })
                   this.context.router.push({ pathname: "/fragment/customer/profile" })
                 }}>个人信息
            </div>
            <div className={chooseColumn === 2 ? 'chosed' : ''}
                 onClick={() => {
                   this.setState({ chooseColumn: 2 })
                   this.context.router.push({ pathname: "/fragment/customer/account" })
                 }}>我的账户
            </div>
            <div
              className={`last-column ${chooseColumn === 3 ? 'chosed' : ''}` }
              onClick={() => {
                this.setState({ chooseColumn: 3 })
                this.context.router.push({ pathname: "/fragment/customer/help" })
              }}>帮助
            </div>
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
