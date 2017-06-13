import * as React from "react";
import "./Comment.less";
import { connect } from "react-redux";
import { loadCommentList, comment, deleteComment, commentReply, getApplicationPractice } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import PullElement from "pull-element";
import { findIndex, remove } from "lodash";
import DiscussShow from "../components/DiscussShow";
import Discuss from "../components/Discuss";
import { scroll } from "../../../utils/helpers";
import { comment } from "../subject/async";

@connect(state => state)
export default class Comment extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      page: 1,
      editDisable: false,
      commentList: [],
      article: {},
      placeholder: '和作者切磋讨论一下吧'
    };
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location} = this.props;
    dispatch(startLoad());
    getApplicationPractice(location.query.submitId).then(res => {
      if(res.code === 200) {
        this.setState({article: res.msg})
        loadCommentList(location.query.submitId, 1).then(res => {
          if(res.code === 200) {
            dispatch(endLoad());
            this.setState({commentList: res.msg.list, page: 1, end: res.msg.end, isFeedback: res.msg.feedback});
          } else {
            dispatch(endLoad());
            dispatch(alertMsg(res.msg));
          }
        }).catch(ex => {
          dispatch(endLoad());
          dispatch(alertMsg(ex));
        });
      } else {
        dispatch(endLoad());
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  componentDidUpdate() {
    const {commentList = [], end} = this.state;
    const {dispatch, location} = this.props;
    if(commentList && commentList.length !== 0 && !this.pullElement) {
      this.pullElement = new PullElement({
        target: '.pull-target',
        scroller: '.application-comment',
        trigger: '.application-comment',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadCommentList(location.query.submitId, this.state.page + 1).then(res => {
            if(res.code === 200) {
              if(res.msg && res.msg.list.length !== 0) {
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.commentList, item) !== -1;
                });
                this.setState({
                  commentList: this.state.commentList.concat(res.msg.list),
                  page: this.state.page + 1,
                  end: res.msg.end
                })
              } else {
                dispatch(alertMsg('没有更多了'));
              }
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
            dispatch(alertMsg(ex));
          });
        }
      });
      this.pullElement.init();
    }

    if(this.pullElement && this.state.end) {
      this.pullElement.disable();
    }
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
  }

  onSubmit() {
    const {dispatch, location} = this.props;
    const {content, isReply} = this.state;
    if(content) {
      this.setState({editDisable: true});
      if(isReply) {
        commentReply(location.query.submitId, content, this.state.id).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [res.msg].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            });
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable();
            }
            scroll('.comment-header', '.application-comment')
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(ex => {
          this.setState({editDisable: false});
          dispatch(alertMsg(ex));
        });
      } else {
        comment(location.query.submitId, content).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [res.msg].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            });
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable();
            }
            scroll('.comment-header', '.application-comment')
          } else {
            dispatch(alertMsg(res.msg));
            this.setState({editDisable: false});
          }
        }).catch(ex => {
          this.setState({editDisable: false});
          dispatch(alertMsg(ex));
        })
      }
    } else {
      dispatch(alertMsg('请先输入内容再提交'));
    }
  }

  openWriteBox() {
    this.setState({
      showDiscuss: true, content: '',
      isReply: false,
      placeholder: '和作者切磋讨论一下吧'
    })
  }

  reply(item) {
    this.setState({
      id: item.id,
      placeholder: '回复 ' + item.name + ":",
      showDiscuss: true,
      isReply: true,
      content: '',
    })
  }

  onDelete(id) {
    const {commentList = []} = this.state;
    deleteComment(id).then(res => {
      if(res.code === 200) {
        let newCommentList = []
        commentList.forEach((item) => {
          if(item.id != id) {
            newCommentList.push(item)
          }
        })
        this.setState({commentList: newCommentList})
      }
    })
  }

  onChange(value) {
    this.setState({content: value});
  }

  cancel() {
    const {showDiscuss} = this.state;
    if(showDiscuss) {
      this.setState({
        showDiscuss: false
      })
    }
  }

  render() {
    const {commentList = [], showDiscuss, end, isReply, placeholder} = this.state;
    const {topic, description} = this.state.article;
    const renderCommentList = () => {
      if(commentList && commentList.length !== 0) {
        return (
          commentList.map((item, seq) => {
            return (
              <DiscussShow
                discuss={item} key={seq}
                reply={() => {
                  this.reply(item);
                }}
                onDelete={this.onDelete.bind(this, item.id)}
              />
            )
          })
        )
      } else {
        return (
          <div className="on_message">
            <div className="no_comment">
              <AssetImg url="https://static.iqycamp.com/images/no_comment.png" height={120} width={120}/>
            </div>
            还没有人评论过<br/>点击左下角按钮，发表第一条吧
          </div>
        )
      }
    }

    const renderTips = () => {
      if(commentList && commentList.length !== 0) {
        if(!end) {
          return (
            <div className="show-more">上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more">已经到最底部了</div>
          )
        }
      }
    }

    return (
      <div>
        <div className="application-comment">
          <div className="article">
            <div className="article-header">{topic}</div>
            <pre dangerouslySetInnerHTML={{__html: description}} className="description"></pre>
            <div className="comment-header">
              当前评论
            </div>
            {
              this.state.isFeedback ?
                <div className="comment-header-feedback">
                  <span className="comment-feedback-tips">小提示：</span>
                  该条教练点评后，作业被更新，可能有和教练点评不一致的内容
                </div> :
                null
            }
          </div>
          <div className="pull-target">
            <div className="comment-body">
              {renderCommentList()}
              {renderTips()}
            </div>
          </div>
          {
            showDiscuss ?
              <Discuss
                isReply={isReply} placeholder={placeholder}
                submit={() => this.onSubmit()}
                onChange={(v) => this.onChange(v)}
                cancel={() => this.cancel()}
              /> :
              <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
                <AssetImg url="https://static.iqycamp.com/images/discuss.png" width={45} height={45}/>
              </div>
          }
        </div>
      </div>
    )
  }

}

