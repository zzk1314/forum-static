import * as React from "react";
import { connect } from "react-redux";
import "./ProblemViewer.less";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { loadProblem, createPlan, checkCreatePlan } from "./async";
import AlertMessage from "../../../components/AlertMessage";
import { BreadCrumbs } from "../commons/FragmentComponent"
import QYVideo from '../../../components/QYVideo'

@connect(state => state)
export default class ProblemViewer extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: {},
      showAlert: false,
      showTip: false,
      alert: {
        actions: [
          {
            label: '再看看',
            onClick: this.close.bind(this)
          },
          {
            label: '想好了',
            onClick: this.submitProblem.bind(this),
          }
        ]
      },
      show: true,
    }
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { id } = location.query
    dispatch(startLoad())
    loadProblem(id).then(res => {
      dispatch(endLoad())
      const { msg, code } = res
      if(code === 200) {
        this.setState({ data: msg })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  submitProblem() {
    this.setState({ showAlert: false })
    const { dispatch, location } = this.props
    dispatch(startLoad())
    createPlan(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.context.router.push({ pathname: '/rise/static/learn' })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  show() {
    const { dispatch } = this.props
    checkCreatePlan(this.props.location.query.id).then(res => {
      if(res.code === 200) {
        this.setState({ showAlert: true })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  close() {
    this.setState({ showAlert: false })
  }

  render() {
    const { data, showTip } = this.state;
    const { show } = this.props.location.query
    const { authorPic, length, why, what, who, audio,audioWords,chapterList, problem,videoUrl,videoWords,videoPoster } = data;

    const renderRoadMap = (chapter, idx) => {
      const { sections } = chapter
      return (
        <div key={idx}>
          <div className={'chapter'}><b>{'第' + chapter.chapter + '章 '}{chapter.name}</b></div>
          {sections ? sections.map((section, idx) => renderSection(section, idx, chapter.chapter)) : null}
        </div>
      )
    }

    const renderSection = (section, idx, chapter) => {
      return (
        <div key={idx}>
          <div className={'section'}>{chapter}{'.'}{section.section + '节 '}{section.name}</div>
        </div>
      )
    }

    return (
      <div className="problem-page outer-wrapper">
        <div className={`container ${show ? '' : 'has-footer'}`}>
          <div className="problem-intro">
            <div className="problem-head">
              <BreadCrumbs level={1} name="课程介绍"/>
              <div className="page-header">{problem}</div>
            </div>
            {videoUrl &&
            <div className="video-container">
              <QYVideo src={videoUrl} videoWords={videoWords} poster={videoPoster}>您的设备不支持video标签</QYVideo>
            </div>}
            <div className="page-content">
              { audio ? <div className="context-audio">
                <Audio url={audio} words={audioWords}/>
              </div> : null }
              <div style={{ marginTop: 30 }}>
                <pre dangerouslySetInnerHTML={{ __html: why }} />
              </div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/what_2.png"/>
              </div>
              {what ? <pre dangerouslySetInnerHTML={{ __html: what }} /> : null}
              <div
                className="roadmap">{chapterList ? chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)) : null}</div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/who_2.png"/>
              </div>
              <pre><b>{who}</b></pre>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/author_desc.png"/>
              </div>
              <div className="author">
                <AssetImg width={'50%'} url={authorPic}/>
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/when_2.png"/>
              </div>
              <div className="text">随开随学，进度自控</div>
              <div className="text">教研团队的推荐进度：2天学习1节，第1天：知识点学习、选择题，第2天：2个应用题</div>

              <div className="text">
                <div className="time-tip-content"><b>开放时长：</b>30天
                  {showTip ? <div className="tip"><br/>
                    说明：<br/>
                    本课程最少开放{Math.round(length / 2)}天，最多开放30天，过期会自动关闭。是不是一下子有学习的紧迫感了？<br/>
                  </div> : <div className="tip-img" onClick={() => this.setState({ showTip: true })}>
                    <AssetImg width={16} height={16} type="question-mark"/></div>}
                </div>
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/where_2.png"/>
              </div>
              <div className="text">随时随地，多客户端</div>
              <div className="text"><b>手机微信：</b>圈外同学-上课啦</div>
              <div className="text"><b>网站：</b>www.iquanwai.com，点击圈外同学</div>
            </div>
          </div>
        </div>
        { show ?
          null
          :
          <div className="button-footer" onClick={() => this.show()}>
            学习该课程
          </div>
        }
        <AlertMessage { ...this.state.alert }
                      open={this.state.showAlert}>
          <p className="global-pre">选择后，需要先学完该课程，才能选择下一课程，想好了吗？</p>
        </AlertMessage>
      </div>
    )
  }
}
