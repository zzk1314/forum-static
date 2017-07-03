import * as React from "react";
import * as _ from "lodash";
import "./BreadCrumbs.less";

interface BreadCrumbsProps {
}
export default class BreadCrumbs extends React.Component<BreadCrumbsProps, any> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  generatenavNameList(navList) {
    const navNameList = []
    navList.map((nav, idx) => {
      navNameList.push(this.getNameByUrl(nav))
    })
    return navNameList
  }

  getNameByUrl(url) {
    let name = ''
    if(url.indexOf("/fragment/learn") > 0 || url.indexOf("/fragment/main") > 0) {
      name = "小课"
    } else if(url.indexOf("/fragment/problem/view") > 0) {
      name = "小课介绍"
    } else if(url.indexOf("/fragment/knowledge") > 0) {
      name = "知识理解"
    } else if(url.indexOf("/fragment/warmup") > 0
      || url.indexOf("/fragment/warmup/result") > 0
      || url.indexOf("/fragment/warmup/analysis") > 0
    ) {
      name = "巩固练习"
    } else if(url.indexOf("/fragment/application") > 0) {
      name = "应用练习"
    } else if(url.indexOf("/fragment/challenge") > 0) {
      name = "小目标"
    } else if(url.indexOf("/fragment/report") > 0) {
      name = "学习报告"
    }
    if(url.indexOf("/fragment/application/comment") > 0) {
      name = "评论"
    }
    return name
  }

  render() {
    let navList = localStorage.getItem("navList").split(",")
    navList = _.remove(navList, (nav) => nav !== "")
    // 应对用户清除存储信息，则当前页面不展示导航栏
    if(navList.length === 1) {
      return <div/>
    }
    const navNameList = this.generatenavNameList(navList)

    const renderNavs = () => {
      return (
        navList.map((item, idx) => {
          if(idx === 0) {
            return (
              <div className="bread-first-item" key={idx}
                   onClick={() => this.context.router.push(navList[idx])}>
                {navNameList[idx]}
              </div>
            )
          } else if(idx < navList.length - 1) {
            return (
              <div className="bread-items" key={idx}
                   onClick={() => this.context.router.push(navList[idx])}>
                <div>&gt;</div>
                <div>{navNameList[idx]}</div>
              </div>
            )
          } else {
            return (
              <div className="bread-last-items" key={idx}>
                <div>&gt;</div>
                <div>{navNameList[idx]}</div>
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
