import * as React from "react";
import { connect } from "react-redux";
import "./ProblemViewer.less";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { loadProblem, createPlan, checkCreatePlan } from "./async";
import AlertMessage from "../../../components/AlertMessage";
import { BreadCrumbs } from "../commons/FragmentComponent"

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
    const { authorDesc, length, why, how, what, who, descPic, audio, chapterList, problem, categoryPic } = data;

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
              <BreadCrumbs level={1} name="小课介绍"/>
              <div className="page-header">{problem}</div>
            </div>
            <div className="page-content">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              <div style={{ marginTop: 30 }}>
                <pre>{why}</pre>
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/how_2.png"/>
              </div>
              <pre>{how}</pre>
              <div className="context-title-img">
                <AssetImg width={'60%'} style={{ marginTop: 25 }} url={descPic}/>
              </div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/what_2.png"/>
              </div>
              {what ? <pre>{what}</pre> : null}
              <div
                className="roadmap">{chapterList ? chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)) : null}</div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/ability.png"/>
              </div>
              <div className="text">在RISE，我们的小课都根据“个人势能模型”进行设计，本小课在模型中的能力项为：</div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url={categoryPic} marginTop="25"/>
              </div>
              <div className="text click-key"
                   onClick={() => window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=2651673801&idx=1&sn=c0bc7ad463474f5d8f044ae94d8e6af7&chksm=8b6a3fa5bc1db6b335c423b51e8e987c0ba58546c9a4bcdba1c6ea113e710440e099981fac22&mpshare=1&scene=1&srcid=0522JbB9FCiJ2MLTYIJ9gHp8&key=97c2683b72ba12a9fe14a4718d1e2fc1db167b4659eda45c59be3b3c39723728975cf9c120462d5d896228edb74171fb9bfefc54a6ff447b7b3389e626e18744f9dca6103f6a3fbeb523c571631621eb&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=sl95nanknHuEvflHY9fNI6KUKRA3koznfByp5C1nOV70kROWRuZNqQwkqvViYXiw'}
              >了解"个人势能模型"
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/who_2.png"/>
              </div>
              <pre><b>{who}</b></pre>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/author_desc.png"/>
              </div>
              <div className="text">
                {authorDesc}
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/when_2.png"/>
              </div>
              <div className="text">随开随学，进度自控</div>
              <div className="text">教研团队的推荐进度：每天1节，保证学习效果</div>

              <div className="text">
                <div className="time-tip-content"><b>开放时长：</b>30天
                  {showTip ? <div className="tip"><br/>
                    说明：<br/>
                    本小课最少开放{Math.round(length / 2)}天，最多开放30天，过期会自动关闭。是不是一下子有学习的紧迫感了？<br/>
                  </div> : <div className="tip-img" onClick={() => this.setState({ showTip: true })}>
                    <AssetImg width={16} height={16} type="question-mark"/></div>}
                </div>
              </div>

              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/where_2.png"/>
              </div>
              <div className="text">随时随地，多客户端</div>
              <div className="text"><b>手机微信：</b>圈外学习号-RISE</div>
              <div className="text"><b>网站：</b>www.iquanwai.com，点击RISE</div>
              <div className="text"><b>电脑微信（仅windows客户端）：</b>圈外学习号-RISE</div>
            </div>
          </div>
        </div>
        { show ?
          null
          :
          <div className="button-footer" onClick={() => this.show()}>
            学习该小课
          </div>
        }
        <AlertMessage { ...this.state.alert }
                      open={this.state.showAlert}>
          <p className="global-pre">选择后，需要先学完该小课，才能选择下一小课，想好了吗？</p>
        </AlertMessage>
      </div>
    )
  }
}
