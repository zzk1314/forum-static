import * as React from "react";
import {connect} from "react-redux";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import {set, startLoad, endLoad, alertMsg} from "../../redux/actions";
import "./Home.less";
import {imgSrc} from "utils/imgSrc"

@connect(state => state)
export default class extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <div className="home-container">
          <div className="main-theme">
            为每一个想成长的人提供价值
          </div>
          <ul className="intro-card-list">
            <li className="intro-card">
              <div className="title">RISE</div>
              <div className="intro">解决问题</div>
              <div className="intro">提升能力</div>
              <div className="intro">养成习惯</div>
              <div className="intro">交流经验</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
            <li className="intro-card">
              <div className="title">训练营</div>
              <div className="intro">升级思维</div>
              <div className="intro">翻转课堂</div>
              <div className="intro">实操案例</div>
              <div className="intro">跟进复盘</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
            <li className="intro-card">
              <div className="title">同路人</div>
              <div className="intro">认识伙伴</div>
              <div className="intro">共同学习</div>
              <div className="intro">互相鼓励</div>
              <div className="intro">对接资源</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
            <li className="intro-card">
              <div className="title">烧脑文</div>
              <div className="intro">思维方法</div>
              <div className="intro">沟通技巧</div>
              <div className="intro">职业种种</div>
              <div className="intro">自我管理</div>
              <div className="qrcode">
                <img src={imgSrc.subscribeCode}/>
              </div>
            </li>
          </ul>
        </div>
        <img className="footer-img" src="http://www.iquanwai.com/images/pc/index_panel2.png" alt=""/>
        <div className="footer">
          <div className="footer-container">
            <div className="img-item">
              <img src={imgSrc.subscribeCode}/>
              <div>圈外订阅号</div>
            </div>
            <div className="img-item">
              <img src={imgSrc.serverCode}/>
              <div>圈外服务号</div>
            </div>
            <div style={{marginTop:"30px",float:"right",marginLeft:"30px"}}><a style={{textDecoration:"none",color: "#FFFFFF"}}
                                             href="https://book.douban.com/subject/26936065/">圈圈的书</a></div>
            <div style={{marginTop:"30px",float:"right"}}>
              <div className="email" style={{textDecoration:"none",color: "#FFFFFF",position:"relative"}}>意见反馈
                <div className="email-link">iquanwaivip@163.com</div>
              </div>
            </div>
            <div style={{fontSize:"12px",position:"absolute",width:"280px",top:"76px",right:"-69px",color:"#cccccc"}}><a style={{textDecoration:"none",color: "#cccccc"}}
                                             href="http://www.miitbeian.gov.cn/">ICP备15006409号</a></div>
          </div>
        </div>
      </div>
    )
  }
}
