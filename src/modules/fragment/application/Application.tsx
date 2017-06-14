import * as React from "react";
import { connect } from "react-redux";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./Application.less";
import AssetImg from "../../../components/AssetImg";
import Editor from "../../../components/editor/Editor";
import {
  loadApplicationPractice, vote, loadOtherList, loadKnowledgeIntro,
  openApplication, getOpenStatus, submitApplicationPractice, CommentType, ArticleViewModule, autoSaveApplicationDraft,
  autoUpdateApplicationDraft
} from "./async";
import Work from "../components/NewWork";
import { findIndex, remove, isEmpty, isBoolean ,merge,set} from "lodash";
import { Work } from "../components/NewWork";
import Tutorial from "../../../components/Tutorial";
import Toast from "../../../components/Toast";
import KnowledgeModal from  "../components/KnowledgeModal"


let timer;

@connect(state => state)
export default class Application extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
      submitId: 0,
      page: 1,
      otherList: [],
      otherHighlightList: [],
      goBackUrl: '',
      integrated: true,
      showOthers: false,
      editorValue: '',
      edit: true,
      draftId: -1,
      draft: '',
      showDraftToast: false
    };
  }

  componentWillMount() {
    const {location,dispatch} = this.props;
    const {state} = location;
    if(state) {
      const {goBackUrl} = state
      if(goBackUrl) {
        this.setState({goBackUrl})
      }
    }
    const {integrated, id, planId} = this.props.location.query;
    this.setState({integrated})
    loadApplicationPractice(id, planId).then(res => {
      const {code, msg} = res;
      if(code === 200) {
        if(res.msg.draftId) {
          this.setState({draftId: res.msg.draftId})
        }
        this.setState({
          data: msg, submitId: msg.submitId, planId: msg.planId, draft: res.msg.draft,
          editorValue: res.msg.content == null ? res.msg.draft : res.msg.content
        })
        const isSubmitted = res.msg.content != null;
        if(!isSubmitted) {
          this.autoSaveApplicationDraft();
        }
        dispatch(endLoad())
        // 如果存在未提交的草稿，则显示提醒toast
        if(res.msg.draft) {
          this.setState({showDraftToast: true}, () => {
            setTimeout(() => {
              let draftToast = document.getElementById("main-toast-draft");
              draftToast.style.opacity = 0;
            }, 1500);
            setTimeout(() => {
              this.setState({showDraftToast: false});
            }, 3000);
          });
        }

        const {content} = msg;
        if(integrated == 'false') {
          loadKnowledgeIntro(msg.knowledgeId).then(res => {
            const {code, msg} = res;
            if(code === 200) {
              this.setState({knowledge: msg})
            } else {
              dispatch(alertMsg(msg))
            }
          })
        }

        if(content !== null) {
          this.refs.submitBar.scrollTop = 0
          this.setState({edit: false})
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      console.error(ex);
    })

    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({openStatus: res.msg});
      }
    })
  }

  componentWillUnmount(){
    clearInterval(timer)
  }

  // 定时保存方法
  autoSaveApplicationDraft() {
    timer = setInterval(() => {
      const draft = this.refs.editor.getValue();
      if(draft.trim().length > 0) {
        if(this.state.draftId == -1) {
          const planId = this.state.planId;
          const applicationId = this.props.location.query.id;
          autoSaveApplicationDraft(planId, applicationId).then(res => {
            this.setState({draftId: res.msg})
            autoUpdateApplicationDraft(res.msg, {draft})
          })
        } else {
          autoUpdateApplicationDraft(this.state.draftId, {draft})
        }
      }
    }, 10000)
  }

  onEdit() {
    this.setState({edit: true});
  }

  closeModal() {
    this.setState({showKnowledge: false});
  }

  goComment(submitId) {
    const {goBackUrl} = this.state;
    this.context.router.push({
      pathname: "/rise/static/practice/application/comment",
      query: merge({submitId: submitId}, this.props.location.query),
      state: {goBackUrl}
    });
  }

  voted(id, voteStatus, voteCount, isMine, seq) {
    if(!voteStatus) {
      if(isMine) {
        this.setState({data: merge({}, this.state.data, {voteCount: voteCount + 1, voteStatus: true})});
      } else {
        let newOtherList = merge([], this.state.otherList);
        set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        set(newOtherList, `[${seq}].voteStatus`, 1);
        this.setState({otherList: newOtherList})
      }
      vote(id);
    }
  }

  back() {
    const {goBackUrl} = this.state;
    const {location} = this.props;
    if(goBackUrl) {
      this.context.router.push({pathname: goBackUrl});
    } else {
      this.context.router.push({
        pathname: '/rise/static/learn',
        query: {
          series: location.query.series
        }
      });
    }
  }

  tutorialEnd() {
    const {openStatus} = this.state;
    openApplication().then(res => {
      const {code, msg} = res;
      if(code === 200) {
        this.setState({openStatus: merge({}, openStatus, {openApplication: true})})
      }
    })
  }

  others() {
    const {location} = this.props;
    loadOtherList(location.query.id, 1).then(res => {
      if(res.code === 200) {
        this.setState({
          otherList: res.msg.list,
          otherHighlightList: res.msg.highlightList,
          page: 1,
          end: res.msg.end,
          showOthers: true
        })
      }
    })
  }

  onSubmit() {
    const {dispatch, location} = this.props;
    const {data, planId} = this.state;
    const answer = this.refs.editor.getValue();
    const {submitId} = data;
    if(answer == null || answer.length === 0) {
      alert("请填写作业");
      return;
    }
    this.setState({showDisable: true});
    submitApplicationPractice(planId, location.query.id, {answer}).then(res => {
      const {code, msg} = res;
      if(code === 200) {
        loadApplicationPractice(location.query.id, planId).then(res => {
          const {code, msg} = res;
          console.log(msg);
          if(code === 200) {
            this.setState({
              data: msg,
              submitId: msg.submitId,
              planId: msg.planId,
              edit: false,
              editorValue: msg.content
            })
          };
          clearInterval(timer)
        })
        this.setState({showDisable: false})
      }
    })
  }

  render() {
    const {data, otherList, otherHighlightList, knowledge = {}, showKnowledge, end, openStatus = {}, showOthers, edit, showDisable, integrated} = this.state
    const {topic, description, content, voteCount, submitId, voteStatus} = data

    const renderList = (list) => {
      if(list) {
        return list.map((item, seq) => {
          console.log(seq);
          return (
            <Work
              onVoted={() => this.voted(item.submitId, item.voteStatus, item.voteCount, false, seq)}
              goComment={() => this.goComment(item.submitId)}
              type={CommentType.Application}
              articleModule={ArticleViewModule.Application}
              {...item}
            />
          )
        })
      }
    }

    const renderTip = () => {
      if(edit) {
        return (
          <div className="no-comment">
            <div className="content">
              <div className="text">更喜欢电脑上提交?</div>
              <div className="text">登录www.iquanwai.com/community</div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <Work
              onVoted={() => this.voted(submitId, voteStatus, voteCount, true)}
              onEdit={() => this.onEdit()}
              headImage={window.ENV.headImage}
              userName={window.ENV.userName}
              type={CommentType.Application}
              articleModule={ArticleViewModule.Application}
              goComment={() => this.goComment(submitId)}
              {...data}
            />
          </div>
        )
      }
    }

    const renderEnd = () => {
      if(showOthers) {
        if(!end) {
          return (
            <div className="show-more" style={{borderTop: "1px solid #efefef"}}>上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more" style={{borderTop: '1px solid #efefef'}}>没有更多了</div>
          )
        }
      }
    }

    return (
      <div>
        <Tutorial
          bgList={['https://static.iqycamp.com/images/fragment/rise_tutorial_yylx_0419.png?imageslim']}
          show={isBoolean(openStatus.openApplication) && !openStatus.openApplication}
          onShowEnd={() => this.tutorialEnd()}
        />
        <div className={`container ${edit ? 'has-footer' : ''}`}>
          <div className="application">
            <div className="page-header">{topic}</div>
            <div className="intro-container">
              <div className="context-img">
                <AssetImg
                  url={integrated == 'false' ? 'https://static.iqycamp.com/images/fragment/application_practice_2.png' : 'https://static.iqycamp.com/images/fragment/integrated_practice.png'}
                  alt=""/>
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>输入是为了更好地输出！结合相关知识点，思考下面的问题，并提交你的答案吧</p>
                  <p>优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
              {integrated == 'false' ?
                <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>
                  点击查看知识点</div> : null
              }
            </div>
            <div ref="workContainer" className="work-container">
              <div ref="submitBar" className="submit-bar">{ content === null ? '提交方式' : '我的作业'}</div>
              {renderTip()}

              {edit ?
                <div className="editor">
                  <Editor
                    ref="editor"
                    moduleId={3}
                    onUploadError={(res) => {
                      this.props.dispatch(alertMsg(res.msg))
                    }}
                    uploadStart={() => {
                      this.props.dispatch(startLoad())
                    }}
                    uploadEnd={() => {
                      this.props.dispatch(endLoad())
                    }}
                    defaultValue={this.state.editorValue}
                    value={this.state.editorValue}
                    placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。全部完成后点下方按钮提交，才能对他人显示和得到专业点评！"
                  />
                </div> : null}
              {showOthers && !isEmpty(otherHighlightList) ? <div>
                <div className="submit-bar">{'管理员推荐'}</div>
                {renderList(otherHighlightList)}</div> : null}
              {showOthers && !isEmpty(otherList) ? <div>
                <div className="submit-bar">{'最新文章'}</div>
                {renderList(otherList)}</div> : null}
              {!showOthers ? <div className="show-others-tip hover-cursor" onClick={this.others.bind(this)}>同学的作业</div> : null}
              {renderEnd()}
            </div>
          </div>
        </div>
        {showKnowledge ? <KnowledgeModal knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}

        { showDisable ?
          <div className="button-footer disabled">提交中</div>
          :
          edit ?
            <div className="button-footer" onClick={this.onSubmit.bind(this)}>提交</div>
            :
            null
        }
        <div className="main-toast">
          <Toast
            show={this.state.showDraftToast}
            id="main-toast-draft"
          >
            <div>上次输入的内容未提交哦</div>
            <div>已自动保存，可以继续编辑啦</div>
          </Toast>
        </div>
      </div>
    )
  }

}
