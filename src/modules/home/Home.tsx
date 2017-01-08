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
              <div className="title">Grow Up</div>
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
              <div className="intro">解决问题</div>
              <div className="intro">提升能力</div>
              <div className="intro">养成习惯</div>
              <div className="intro">交流经验</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
            <li className="intro-card">
              <div className="title">同路人</div>
              <div className="intro">解决问题</div>
              <div className="intro">提升能力</div>
              <div className="intro">养成习惯</div>
              <div className="intro">交流经验</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
            <li className="intro-card">
              <div className="title">烧脑文</div>
              <div className="intro">解决问题</div>
              <div className="intro">提升能力</div>
              <div className="intro">养成习惯</div>
              <div className="intro">交流经验</div>
              <div className="qrcode">
                <img src={imgSrc.serverCode}/>
              </div>
            </li>
          </ul>
        </div>
        <img className="footer-img" src="http://www.iquanwai.com/images/pc/index_panel2.png" alt=""/>
        <div className="footer">
          <div className="footer-container">
            <div className="img-item">
              <img/>
              <div>圈外订阅号</div>
            </div>
            <div className="img-item">
              <img src={imgSrc.serverCode}/>
              <div>圈外服务号</div>
            </div>
            <div style={{marginLeft: 40}}><a style={{textDecoration:"none",color: "#cccccc"}}>意见反馈</a></div>
            <div style={{marginLeft: 30}}><a style={{textDecoration:"none",color: "#cccccc"}}
                                             href="https://book.douban.com/subject/26936065/">圈圈的书</a></div>
          </div>
        </div>
      </div>
    )
  }
}
