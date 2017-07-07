import * as React from "react";
import * as _ from "lodash";
import "./BreadCrumbs.less";
import isArray = require("lodash/isArray");

/**
 * 重要参数 ！！！
 */
interface BreadCrumbsProps {
  level: number; // 面包屑所在层级
  name: string; // 当前页面在面包屑上显示名称
  show?: boolean; // 是否展示面包屑，默认 true
}
interface BreadCrumbsStates {
  level: number;
  uri: string; // 当前 uri
  name: string;
  navListBread: object;
}
export default class BreadCrumbs extends React.Component<BreadCrumbsProps, BreadCrumbsStates> {

  constructor() {
    super()
    this.state = {
      level: 0,
      uri: window.location.pathname + window.location.search,
      name: '',
      navListBread: []
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { level, name } = this.props
    this.setState({ level: level, name: name })
  }

  componentDidMount() {
    const { level, uri, name } = this.state
    let navList = localStorage.getItem("navList")
    let navListArr = [];
    if(navList) {
      try {
        navListArr = JSON.parse(navList)
      } catch (e) {
        // pass
      }
    }
    navListArr[level] = { uri: uri, name: name }
    this.setState({ navListBread: navListArr })
    localStorage.setItem("navList", JSON.stringify(navListArr))
  }

  componentWillReceiveProps(nextProps) {
    const { level, name } = this.state
    if(nextProps.level != level) {
      this.setState({ level: nextProps.level })
    }
    if(nextProps.name != name) {
      this.setState({ name: nextProps.name })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { navListBread } = this.state
    const nextNavListBread = nextState.navListBread
    return nextNavListBread != undefined && navListBread != nextNavListBread
  }

  render() {
    let { level, navListBread } = this.state
    const { show = true } = this.props
    navListBread = _.dropRight(navListBread, navListBread.length - level - 1)
    if(navListBread.length <= 1 || !show) return null
    const renderNavs = () => {
      return (
        navListBread.map((nav, idx) => {
          if(idx === 0) {
            return (
              <div className="bread-first-item" key={idx}
                   onClick={() => this.context.router.push(nav.uri)}>
                {nav.name}
              </div>
            )
          } else if(idx < navListBread.length - 1) {
            return (
              <div className="bread-items" key={idx}
                   onClick={() => this.context.router.push(nav.uri)}>
                <div>&gt;</div>
                <div>{nav.name}</div>
              </div>
            )
          } else {
            return (
              <div className="bread-last-items" key={idx}>
                <div>&gt;</div>
                <div>{nav.name}</div>
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
