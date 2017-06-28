import * as React from "react";
import "./BreadCrumbs.less";

interface BreadCrumbsProps {
  navList: object;
  urlList?: object;
}
export default class BreadCrumbs extends React.Component<BreadCrumbsProps, any> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleClickGoHomePage() {
    this.context.router.push("/fragment/learn")
  }

  // TODO
  render() {
    const { navList, urlList } = this.props
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
          } else if(idx < navList.length - 1) {
            return (
              <div className="bread-items" key={idx}
                   onClick={() => this.context.router.push(urlList[idx - 1])}>
                <div>&gt;</div>
                <div>{item}</div>
              </div>
            )
          } else {
            return (
              <div className="bread-last-items" key={idx}>
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
