import * as React from "react"
import { connect } from "react-redux"
import Divider from 'material-ui/Divider';
import { ppost, BreakSignal, Stop } from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import Avatar from 'material-ui/Avatar';
import { set, startLoad, endLoad, alertMsg } from "../../../redux/actions"
import _ from "lodash"
import "./ApplicationList.less"
import { loadApplicationSubmit, highlight, loadApplication, submitComment, saveApplicationPractice } from  "./async"
import { Menus } from "../../../utils/Invariables"
import Editor from "../../../components/editor/Editor"
import { decodeTextAreaString3 } from "../../textUtils"
import Snackbar from 'material-ui/Snackbar'
import {imgSrc} from "../../../utils/imgSrc"

export const CommentType = {
  Challenge: 1,
  Application: 2,
  Subject: 3,
}

@connect(state => state)
export default class ApplicationList extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      other: [],
      hasMore: true,
      index: 1,
      otherLoading: true,
      application: {},
      topic: "",
      topicEditable: false,
      descriptionEditable: false,
      snackOpen: false,
      message: "",
      saving: false
    }
  }

  componentWillMount() {
    const {location, dispatch, page} = this.props;
    const {applicationId} = location.query
    const {index} = this.state
    const scrollValue = _.get(page, "scroll");

    loadApplication(applicationId).then(res => {
      if(res.code === 200) {
        this.setState({application: res.msg, topic: res.msg.topic});
      } else {
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      }
    })

    loadApplicationSubmit(applicationId, index).then(res => {
      if(res.code === 200) {
        this.setState({other: res.msg, otherLoading: false});
        if(scrollValue) {
          scroll(scrollValue.x, scrollValue.y);
          dispatch(set("page.scroll", {x: 0, y: 0}));
        }
      } else {
        this.setState({otherLoading: false});
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        this.setState({otherLoading: false});
        dispatch(alertMsg(err.title, err.msg));
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

  loadMoreContent() {
    const {location, dispatch} = this.props;
    const {applicationId} = location.query
    const {index, other} = this.state

    loadApplicationSubmit(applicationId, index + 1).then(res => {
      if(res.code === 200) {
        let hasMore = true
        if(res.msg.length === 0) {
          hasMore = false
        } else {
          res.msg.forEach(item => other.push(item));
        }
        this.setState({other, index: index + 1, hasMore});
      } else {
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      }
    })
  }

  highlight(application, id) {
    const {other} = this.state
    highlight(application, id).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item) => {
        if(item.id === id) {
          _.set(item, 'priority', 1)
        }
      })
      this.setState({other})
    })
  }

  showComment(id) {
    const {other} = this.state

    other.forEach((item) => {
      if(item.id === id) {
        _.set(item, 'commenting', 1)
      }
    })

    this.setState({other})
  }

  comment(id) {
    const {other, comment} = this.state
    submitComment(CommentType.Application, id, comment).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item) => {
        if(item.id === id) {
          _.set(item, 'comment', 1)
          _.set(item, 'commenting', 0)
        }
      })
      this.setState({other, comment: ''})
    })
  }

  onClickGoDetail(item) {
    this.context.router.push({
      pathname: "/fragment/application/show",
      query: {
        submitId: item.id,
        applicationId: item.applicationId,
        planId: item.planId
      }
    })
  }

  back() {
    this.context.router.goBack()
  }

  save() {
    let editor_topic = this.state.topicEditable?this.refs.editor_topic.value:this.state.application.topic
    let editor_description
    if(this.state.descriptionEditable) {
      editor_description = this.refs.editor_description.getValue()
    } else {
      editor_description = this.state.application.description
    }
    const applicationId = this.state.application.id
    if(this.state.topicEditable || this.state.descriptionEditable) {
      saveApplicationPractice(applicationId, editor_topic, editor_description).then(res => {
        if(res.code === 200) {
          this.setState({message: '保存成功', snackOpen: true, saving: false})
        } else {
          this.setState({message: res.msg, snackOpen: true, saving: false})
        }
      })
    }
    setTimeout(() => {
      this.setState({snackOpen: false})
    }, 2000)
  }

  onClickTopicEdit() {
    this.setState({topicEditable: true}, () => {
      this.refs.editor_topic.focus()
    })
  }

  onClickDescriptionEdit() {
    this.setState({descriptionEditable: true})
  }

  render() {
    const {other = [], hasMore, otherLoading, application} = this.state;
    const renderOther = () => {
      return (
        <div className="otherContainer">
          {other.map((item, index) => {
            const {id, upName, headPic, upTime, content, applicationId, priority, comment, commenting} = item;
            return (
              <div key={index} className="workItemContainer" style={{marginTop: 50}}>
                <div className="titleArea">
                  <div className="leftArea">
                    <div className="author">
                      <div className="avatar">
                        <Avatar
                          src={headPic}
                          size={30}
                        />
                      </div>
                      <div className="upInfo">
                        <div className="upName">{upName}</div>
                        <div className="upTime">{upTime + "上传"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="workContentContainer">
                  <div className="content" dangerouslySetInnerHTML={{__html: content}}>
                  </div>
                  <div className="rightArea">
                    {priority === 0 ?
                      <div className="function-button" onClick={() => this.highlight(applicationId, id)}>
                        加精
                      </div> :
                      <div className="function-done">已加精</div> }
                    <div className="function-button" onClick={() => this.onClickGoDetail(item)}>详情</div>
                  </div>
                  {commenting === 1 ?
                    <div className="commentSubmit">
                                <textarea value={this.state.comment} placeholder="和作者切磋讨论一下吧"
                                          onChange={(e) => {
                                            this.setState({comment: e.target.value})
                                          }}/>
                      <div className="commentBtn" onClick={() => this.comment(id)}>提交</div>
                    </div> : null
                  }
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    const renderDiscuss = () => {
      return (
        <div>
          <div className="title">
            <span className="title-text">群众的智慧</span>
          </div>
          {otherLoading ? <VerticalBarLoading/> : renderOther()}
          <Divider/>
          {hasMore ? <div className="more" onClick={() => this.loadMoreContent()}>点击加载更多</div> :
            <div className="no-more">没有更多了</div>}
        </div>
      )
    }

    return (
      <div className="applicationListContainer">
        <div className="backContainer">
          <span onClick={() => this.context.router.goBack()} className="backBtn"><img src={imgSrc.backList}/>返回列表</span>
        </div>
        <hr/>
        <div className="myApplicationContainer">
          {
            this.props.menu === Menus.APPLICATION_DISCUSS ?
              null :
              this.state.topicEditable ?
                <input value={this.state.topic} ref="editor_topic" type="text" className="application-topic"
                       onChange={(e) => this.setState({topic: e.target.value})}/> :
                <div onClick={this.onClickTopicEdit.bind(this)} className="edit-topic"
                     dangerouslySetInnerHTML={{__html: application.topic}}/>
          }
          {
            this.props.menu === Menus.APPLICATION_DISCUSS ?
              <div className="desc" dangerouslySetInnerHTML={{__html: application.description}}/> :
              this.state.descriptionEditable ?
                <Editor id={`editor4`} value={decodeTextAreaString3(application.description)}
                        ref="editor_description"/> :
                <div className="desc" onClick={this.onClickDescriptionEdit.bind(this)}
                     dangerouslySetInnerHTML={{__html: application.description}}/>
          }
          {
            this.props.menu === Menus.APPLICATION_DISCUSS ?
              renderDiscuss():
              null
          }
          {
            (this.state.topicEditable || this.state.descriptionEditable) && this.props.menu === Menus.APPLICATION_MANAGE ?
              <div className="submitArea">
                {
                  this.state.saving ? <div className="submitBtn disabled">保存中</div> :
                    <div className="submitBtn" onClick={this.save.bind(this)}>保存</div>
                }
                <div className="submitBtn" onClick={() => this.back()}>返回</div>
              </div> :
              null
          }
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}/>
      </div>
    )
  }
}
