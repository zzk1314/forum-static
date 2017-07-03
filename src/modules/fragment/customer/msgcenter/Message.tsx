import * as React from "react";
import { connect } from "react-redux";
import { alertMsg, startLoad, endLoad } from "redux/actions";
import { loadMessage, readMessage } from "../async";
import { mark } from "../../../../utils/request";
import { set } from "lodash";
import "./Message.less";

@connect(state => state)
export default class Message extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      page: 1,
      list: [],
      pull: {},
      no_message: false,
      end: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadMessage(1).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          list: msg.notifyMessageList,
          no_message: msg.notifyMessageList === 0,
          end: msg.end
        })
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  componentDidMount() {
    mark({ module: "打点", function: "消息中心", action: "打开消息中心页面" })
  }

  loadMoreMessages() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadMessage(this.state.page + 1).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          list: this.state.list.concat(msg.notifyMessageList),
          index: this.state.index + 1,
          end: msg.end
        })
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  open(url, id, isRead) {
    if(!isRead) {
      // 单纯加载，不做任何处理
      readMessage(id)
    }
    if(url.indexOf('?') === -1) {
      this.context.router.push({
        pathname: url,
        state: {
          goBackUrl: '/fragment/message'
        }
      })
    } else {
      //解析url
      let index = url.indexOf('?')
      let path = url.substring(0, index)
      let query = url.substring(index + 1)

      let param = {}
      let params = query.split("&")
      for(let i = 0; i < params.length; i++) {
        let pos = params[i].indexOf("=");
        if(pos == -1) continue;
        let argName = params[i].substring(0, pos);
        let argValue = params[i].substring(pos + 1);

        set(param, argName, argValue)
      }
      this.context.router.push({ pathname: path, query: param, state: { goBackUrl: '/fragment/message' } })
    }
  }

  render() {
    const { list, no_message, end } = this.state
    const renderMessages = () => {

      return (
        list.map((msg, idx) => {
          const { id, message, fromUserName, fromUserAvatar, url, isRead, sendTime } = msg
          return (
            <div className="message-cell" key={idx}>
              <div className="message-avatar"><img className="message-avatar-img" src={fromUserAvatar}/></div>
              <div className="message-area" onClick={() => this.open(url, id, isRead)}>
                <div className={isRead ? "message-head read" : "message-head unread"}>
                  <div className={isRead ? "message-name read" : "message-name unread"}>
                    {fromUserName}
                  </div>
                  <div className={isRead ? "message-time right read" : "message-time right unread"}>{sendTime}</div>
                </div>
                <div className={isRead ? "message-content read" : "message-content unread"}>{message}</div>
              </div>
            </div>
          )
        })
      )
    }

    return (
      <div className="message-container">
        <div className="message-page">
          <div className="message-header">消息通知</div>
          <div className="message_box">
            { no_message ?
              <div className="no_message">
                <div className="no_comment">
                  <AssetImg url="https://static.iqycamp.com/images/no_comment.png" height={120} width={120}/>
                </div>
                还没有消息提醒
              </div> :
              <div className="container has-footer">
                {renderMessages()}
                { end && !no_message ?
                  <div className="show-more">已经到最底部了</div> :
                  <div className="show-more" style={{ cursor: "pointer" }} onClick={() => this.loadMoreMessages()}>
                    点击加载更多消息</div>
                }
              </div>}
          </div>
        </div>
      </div>
    )
  }

}
