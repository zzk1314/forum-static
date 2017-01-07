import * as React from "react"
import {connect} from "react-redux"
import {Grid, Row, Col} from "react-flexbox-grid"
import * as _ from "lodash"
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import Loading from "../components/Loading"
import "./Home.less"

const style = {
  container: {
    minWidth: "960px",
  },
  avatar: {
    marginRight: "10px"
  },
  successTip: {},
  toolBar: {
    minWidth: "960px",
    backgroundColor: "#FFF",
    boxShadow: "0 0 2px 0 rgba(0,0,0,.5)",
    height: "64px"
  },
  banner: {
    height: "64px",
  },
};


@connect(state => state)
export default class extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   * 构造函数，配置本页面用到的一些本地变量x`
   * @param props
   */
  constructor(props) {
    console.log("constructor home");
    super(props);
    this.state = {}
  }

  /**
   * 组件加载时调用一次
   * 即URI变化时会调用，注意时URI而不是URL
   * #与？的变化不会引起该操作
   */
  componentWillMount() {
    console.log("home willMount");

  }

  componentDidMount() {
    console.log("home didMount");
  }

  /**
   * 组件的props参数变化时会调用该方法
   * 组件内部是不能修改props的
   * @param newProps 变化后的props
   */
  componentWillReceiveProps(newProps) {
    console.log("home receiveProps");
  }


  /**
   * 渲染组件
   * @returns {any}
   */
  render() {
    const {loading} = this.props;
    const homeLoading = _.get(loading, "home", false);
    const paperStyle = {
      position: "fixed",
      width: "150px",
      height: "150px",
      left: "45%",
      top: "30%"
    }
    return (
      <div className="messageContainer">
        <div className="homePage">
          <div className="homeContentContainer">
            <div className="leftBorder"></div>
            <div className="title">为每一个想成长的人提供价值</div>
            <div className="rightBorder"></div>
          </div>
        </div>
        <div className="homeShowContainer">
          <div className="showItem">
            <div className="title">Grow Up</div>
            <div className="item">解决问题</div>
            <div className="item">提升能力</div>
            <div className="item">养成习惯</div>
            <div className="item">交流经验</div>
            <div className="code">
              <img style={{width:"100px",height:"100px"}}/>
            </div>
          </div>
          <div className="showItem">
            <div className="title">Grow Up</div>
            <div className="item">解决问题</div>
            <div className="item">提升能力</div>
            <div className="item">养成习惯</div>
            <div className="item">交流经验</div>
            <div className="code">
              <img style={{width:"100px",height:"100px"}}/>
            </div>
          </div>
          <div className="showItem">
            <div className="title">Grow Up</div>
            <div className="item">解决问题</div>
            <div className="item">提升能力</div>
            <div className="item">养成习惯</div>
            <div className="item">交流经验</div>
            <div className="code">
              <img style={{width:"100px",height:"100px"}}/>
            </div>
          </div>
          <div className="showItem">
            <div className="title">Grow Up</div>
            <div className="item">解决问题</div>
            <div className="item">提升能力</div>
            <div className="item">养成习惯</div>
            <div className="item">交流经验</div>
            <div className="code">
              <img style={{width:"100px",height:"100px"}}/>
            </div>
          </div>

        </div>
        <div className="homeBottomContainer">
          <div className="bottomContent">
            <img style={{width:"70px",height:"70px", marginRight: "20px"}}/>
            <img style={{width:"70px",height:"70px",marginRight: "30px"}}/>
            <div className="linkContainer">
              <a style={{marginRight:"30px",cursor:"pointer"}}>意见反馈</a>
              <a style={{cursor:"pointer"}}>圈圈的书</a>
            </div>
          </div>
        </div>
        {homeLoading ?<Loading paperStyle={paperStyle} size={150}/>: null}
      </div>
    )
  }
}
