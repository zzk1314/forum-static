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
}



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
    const {dispatch} = this.props;
    this.state = {}
    /**
     * page:{ // 页面相关的数据
     *  curNav,// 当前菜单路径
     * }
     * login:{ // 登录相关的数据
     *  qrVisible,// 登录二维码是否显示
     *
     * }
     * user:{ // 用户数据
     *  role:// 角色,目前只有student，stranger
     *  weixin:{ // 微信数据
     *    openid,
     *    weixinName,
     *    headimgUrl
     *  },
     *  course:{ // 课程数据
     *   confucius:{ // 体系化课程
     *   },
     *   fragment:{ // 碎片化课程
     *    problemList:[{
     *      id,// 问题id
     *      status,//问题状态（0-待解决，1-解决中，2-已解决）
     *      problem,// 工作生活中遇到的问题
     *      pic,// 头图链接
     *      challengeList:[{// 这里刚开始只放解决中的问题
     *        id, // 挑战任务id
     *        description, // "图文混排内容", //html
     *        pic, // "http://someurl",  //图片url
     *        problemId,//问题id
     *        pcurl,"http://someurl", //pc端url
     *        submitted, true, //是否提交过
     *        content, "balbal" //提交内容
     *      }]
     *    ]
     *   }
     * }
     * course:{ // 课程数据,一般是不会变化的
     *  fragment:{
     *   problemList:[{
     *      id,// 问题id
     *      status,//问题状态（0-待解决，1-解决中，2-已解决）
     *      problem,// 工作生活中遇到的问题
     *      pic,// 头图链接
     *      challengeList:[{// 加载完后刷新页面，然后这里静默加载
     *        id, // 挑战任务id
     *        description, // "图文混排内容", //html
     *        pic, // "http://someurl",  //图片url
     *        problemId,//问题id
     *        pcurl,"http://someurl", //pc端url
     *        submitted, true, //是否提交过
     *        content, "balbal" //提交内容
     *      }]
     *  }
     * }
     */


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
    const homeLoading = _.get(loading,"home",false);
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
          <div className="content1Container">
            <div className="leftBorder"></div>
            <div className="title">为每一个想成长的人提供价值</div>
            <div className="rightBorder"></div>
          </div>
        </div>
        {homeLoading?<Loading paperStyle={paperStyle} size={150}/>:null}
      </div>
    )
  }
}
