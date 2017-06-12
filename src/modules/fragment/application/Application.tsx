import * as React from "react";
import {connect} from "react-redux";

import "./Application.less";
import AssetImg from "../../../components/AssetImg";
import Editor from "../../../components/editor/Editor";

@connect(state => state)
export default class Application extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="app-container">
        <div className="outer-wrapper">
          <div className="app-content">
            <div className="app-topic">证明卖点</div>
            <div className="app-header-img">
              <AssetImg width={460} height={200} url="https://static.iqycamp.com/images/fragment/application_practice_2.png"/>
            </div>
            <div className="app-context">
              <div className="app-context-tips">
                <p>输入是为了更好地输出！结合相关知识点，思考下面的问题，并提交你的答案吧</p>
                <p>优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分</p>
              </div>
              <div className="app-context-title">
                <AssetImg type="app" size{20}/>
                <span>今日应用</span>
              </div>
              <div className="app-context-description">
                从评价他人、工作数据、过往经历中找到证据，来证明自身的特质，
                并用简洁的话语标书出来。如果是过往经历，也要把相关细节想清楚以免面试官追问时慌乱哦！
              </div>
              <div className="app-knowledge-link">点击查看知识点</div>
            </div>
          </div>
          <div className="app-work">
            <div className="app-submit-bar">提交方式</div>
            <div className="app-editor">
              <Editor
                placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。全部完成后点下方按钮提交，才能对他人显示和得到专业点评！"
              />
            </div>
            <div className="app-work-submit">
              <p>提交</p>
            </div>
            <div className="app-work-footer">
              同学的作业
            </div>
          </div>
        </div>
      </div>
    )
  }

}
