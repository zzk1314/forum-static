import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { loadProblemExtension } from './async'
import './ProblemExtension.less'
import { mark } from '../../../utils/request'
import AssetImg from '../../../components/AssetImg'

@connect(state => state)
export default class ProblemExtension extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { problemId } = this.props.location.query
    mark({
      module: '打点',
      function: '学习',
      action: '加载延伸学习页面',
      memo: problemId
    })
    dispatch(startLoad())
    loadProblemExtension(problemId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ data: res.msg, extension: res.msg.extension })
      } else {
        dispatch(alertMsg('当前课程暂无延伸学习相关内容'))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  render() {
    const { data } = this.state
    const { extension, onlineActivities, offlineActivities } = data

    const renderActivities = () => {
      if((onlineActivities && onlineActivities.length > 0) || (offlineActivities && offlineActivities.length > 0)) {
        return (
          <div className="extension-activity">
            <ExtensionHead
              icon={{ uri: 'https://static.iqycamp.com/images/problem/extension_icon_bag.png', width: 21, height: 20 }}
              content={`学习活动`}/>
            {renderOnlineActivities()}
            {renderOfflineActivities()}
          </div>
        )
      }
    }

    const renderOnlineActivities = () => {
      if(onlineActivities && onlineActivities.length > 0) {
        return (
          <div style={{ marginBottom: 20 }}>
            <ActivityTypeTitle content={`线上活动`}/>
            {
              onlineActivities.map((item, index) =>
                <OnlineContentBox description={item.description} password={item.password} uri={item.uri} key={index}/>
              )
            }
          </div>
        )
      }
    }

    const renderOfflineActivities = () => {
      if(offlineActivities && offlineActivities.length > 0) {
        return (
          <div>
            <ActivityTypeTitle content={`线下活动`}/>
            {
              offlineActivities.map((item, index) =>
                <OfflineContentBox description={item.description} location={item.location} workshop={item.workshop}
                                   uri={item.uri}/>
              )
            }
          </div>
        )
      }
    }

    return (
      <div className="problem-extension-container" style={{ minHeight: window.innerHeight }}>
        <div className="problem-extension-page">
          <div className="extension-head"/>
          <div className="extension-read">
            <ExtensionHead
              icon={{ uri: 'https://static.iqycamp.com/images/problem/extension_icon_book.png', width: 21, height: 20 }}
              content={`延伸阅读`}/>
            <div className="extension-read-content" dangerouslySetInnerHTML={{ __html: extension }}/>
          </div>
          {renderActivities()}
        </div>
      </div>
    )
  }

}

// 分类上 icon 和文字
class ExtensionHead extends React.Component<{icon: {uri: string; width: number; height: number}; content: string}, any> {
  render() {
    const { icon, content } = this.props
    return (
      <div className="extension-head-title">
        <div className="extension-head-content">{content}</div>
      </div>
    )
  }
}

// 活动分类
class ActivityTypeTitle extends React.Component<{content: string}, any> {
  render() {
    const { content } = this.props
    return (
      <div className="activity-type-title">—&nbsp;{content}&nbsp;—</div>
    )
  }
}

// 线上活动列表
class OnlineContentBox extends React.Component<{description: string, password: string, uri: string}, any> {
  render() {
    const { description, password, uri } = this.props
    return (
      <div className="online-content-box">
        <div className="online-content">{description}</div>
        {
          password ? <div className="online-password">直播间密码:{password}</div> : null
        }
        <div className="online-view" onClick={() => window.location.href = uri}>进入</div>
      </div>
    )
  }
}

// 线下活动列表
class OfflineContentBox extends React.Component<{description: string, location: string, workshop: string, uri: string}, any> {
  render() {
    const { description, location, workshop, uri } = this.props
    return (
      <div className="offline-content-box">
        <div className="offline-left-area">
          <div className="offline-left-location">{location}</div>
          <div className="offline-left-icon">
            <AssetImg url="https://static.iqycamp.com/images/problem/extension_icon_location.png?imageslim" width={15}
                      height={19}/>
          </div>
        </div>
        <div className="offline-right-area">
          <div className="offline-right-description">{description}</div>
          <div className="offline-right-workshop">{workshop}</div>
          <div className="offline-right-view" onClick={() => window.location.href = uri}>进入</div>
        </div>
      </div>
    )
  }
}
