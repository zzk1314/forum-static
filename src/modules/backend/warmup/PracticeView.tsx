import * as React from "react";
import {connect} from "react-redux";
import "./PracticeView.less";
import {loadWarmUp, highlight, deleteWarmupDiscuss} from "./async"
import {BreakSignal, Stop} from "../../../utils/request"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import _ from "lodash"
import AlertMessage from "../../../components/AlertMessage";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

const avatarStyle = {
  "position": "fixed",
  "right": 50,
  "top": '20%',
}

@connect(state => state)
export default class practiceView extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      delMsgOpen: false,
      nodelAuthority: false,
      delDiscussId: 0,
      discussList: [],
      roleId: window.ENV.roleId,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location} = this.props;
    const {id} = location.query;
    loadWarmUp(id).then(res => {
      if(res.code === 200) {
        this.setState({
          data: res.msg,
          discussList: res.msg.discussList
        })
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }
    })
  }

  showAlert(content, title) {
    const {dispatch} = this.props;
    dispatch(alertMsg(title, content));
    setTimeout(() => {
      dispatch(set("base.showModal", false));
    }, 1000);
  }

  highlight(id) {
    const {data} = this.state
    highlight(id).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      data.discussList.forEach((item) => {
        if(item.id === id) {
          _.set(item, 'priority', 1)
        }
      })
    })
  }

  reply(warmupPracticeId, repliedId) {
    if(repliedId) {
      this.context.router.push({pathname: '/backend/warmup/discuss', query: {warmupPracticeId, repliedId}})
    } else {
      this.context.router.push({pathname: '/backend/warmup/discuss', query: {warmupPracticeId}})
    }
  }

  onClickDelButton(discussId) {
    this.setState({delMsgOpen: true, delDiscussId: discussId})
  }

  deleteComment(id) {
    this.setState({delMsgOpen: false})
    deleteWarmupDiscuss(id).then(res => {
      if(res.code === 200) {
        let newArray = []
        this.state.discussList.map(discuss => {
          if(discuss.id !== id) {
            newArray.push(discuss)
          }
        })
        this.setState({discussList: newArray})
      } else if(res.code === 201) {
        this.setState({nodelAuthority: true})
      }
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    const {data, roleId} = this.state
    const {id} = data
    let actions = [
      {
        label: "确认",
        onClick: this.deleteComment.bind(this, this.state.delDiscussId)
      },
      {
        label: "取消",
        onClick: () => {
          this.setState({delMsgOpen: false})
        }
      }
    ]

    const questionRender = (practice) => {
      const {id, question, choiceList = []} = practice
      return (
        <div className="intro-container">
          <div className="question">
            <div dangerouslySetInnerHTML={{__html: question}}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            <div className="context"
                 dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
          </div>
          <div className="discuss">
            <a name="discuss"/>
            <div className="discuss-title-bar"><span className="discuss-title">问答</span></div>
            {this.state.discussList.map((discuss, idx) => discussRender(discuss, idx))}
            <div className="discuss-end">
              你已经浏览完所有的讨论啦
            </div>
          </div>
        </div>
      )
    }

    const renderElite = (priority) => {
      if(priority === 0){
        return (
            <div className="function-button" onClick={() => this.highlight(id)}>
              加精
            </div>
        )
      } else {
        return (
            <div className="function-button" style={{color: 'black', cursor: 'auto'}}>
              已加精
            </div>
        )
      }
    }

    const discussRender = (discuss, idx) => {
      const {id, name, avatar, comment, discussTime, repliedName, repliedComment, warmupPracticeId, priority} = discuss
      return (
        <div className="comment-cell" key={id}>
          <div className="comment-avatar"><img className="comment-avatar-img" src={avatar}/></div>
          <div className="comment-area">
            <div className="comment-head">
              <div className="comment-name">{name}</div>
              <div className="comment-time">{discussTime}</div>
              <div className="right">
                {roleId === 8 || roleId === 9 || roleId === 10 ?
                    <div className="function-button" onClick={() => this.onClickDelButton(discuss.id)}>删除</div>
                : null}
                <div className="function-button" onClick={() => this.reply(warmupPracticeId, id)}>
                  回复
                </div>
                {roleId === 8 || roleId === 9 || roleId === 10 ?
                  renderElite(priority) : null}
              </div>
            </div>
            <div className="comment-content">{comment}</div>
            {repliedComment ?
              <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
          </div>

        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice
      return (
        <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
          <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
        </div>
      )
    }

    return (
      <div className="warm-up-analysis">
        <Subheader>巩固练习</Subheader>
        {questionRender(data)}
        <Avatar size={40} src="https://www.iqycamp.com/images/discuss.png" style={avatarStyle}
                backgroundColor='none' onClick={this.reply.bind(this, id, null)}/>
        <AlertMessage open={this.state.delMsgOpen} content="是否删除该条评论" actions={actions}/>
        <AlertMessage open={this.state.nodelAuthority} content="对不起，暂时不能删除非助教评论" handleClose={() => this.setState({nodelAuthority: false})}/>
      </div>
    )
  }
}
