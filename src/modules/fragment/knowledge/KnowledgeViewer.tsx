import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { mark } from "../../../utils/request"
import "./KnowledgeViewer.less";
import {
  loadDiscuss,
  discussKnowledge,
  loadKnowledge,
  learnKnowledge,
  loadKnowledges,
  deleteKnowledgeDiscuss
} from "./async"
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";
import DiscussShow from "../components/DiscussShow";
import Discuss from "../components/Discuss"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import { BreadCrumbs, TitleBar } from "../commons/FragmentComponent"

const sequenceMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G"
}

@connect(state => state)
export default class KnowledgeViewer extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showTip: false,
      showDiscuss: false,
      commentId: 0,
      knowledge: {},
      discuss: {},
      placeholder: '对知识点有疑问？在这里和大家讨论吧（限1000字）',
      isReply: false,
      clickedCompleteBtn: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "RISE", action: "PC打开知识点", memo: "PC" })
    const { id, practicePlanId, complete } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    if(practicePlanId) {
      loadKnowledges(practicePlanId).then(res => {
        if(res.code === 200) {
          this.setState({ knowledge: res.msg[0], referenceId: res.msg[0].id })
          loadDiscuss(res.msg[0].id, 1).then(res => {
            if(res.code === 200) {
              this.setState({ discuss: res.msg })
            }
          });
          dispatch(endLoad())
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      })
      if (complete == 'false') {
        dispatch(set('completePracticePlanId', practicePlanId));
      }
    } else if(id) {
      loadKnowledge(id).then(res => {
        if(res.code === 200) {
          this.setState({ knowledge: res.msg })
          dispatch(endLoad())
          loadDiscuss(id, 1).then(res => {
            if(res.code === 200) {
              this.setState({ discuss: res.msg })
            }
          });
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      })
    }
  }

  reply(item) {
    this.setState({
      isReply: true,
      placeholder: '回复 ' + item.name + ':',
      content: '',
      repliedId: item.id,
      referenceId: item.knowledgeId,
      showDiscuss: true,
    })
  }

  reload() {
    const { knowledge } = this.state;
    loadDiscuss(knowledge.id, 1).then(res => {
      if(res.code === 200) {
        this.setState({
          discuss: res.msg,
          showDiscuss: false,
          showSelfDiscuss: false,
          repliedId: 0,
          isReply: false,
          placeholder: '对知识点有疑问？在这里和大家讨论吧（限1000字）',
        })
        document.body.scrollTop = document.querySelector(".discuss").offsetTop - 140
      }
    });
  }

  writeDiscuss() {
    this.setState({ showDiscuss: true, repliedId: 0 }, () => {
      scroll(0, 0)
    });
    if(this.props.trigger) {
      this.props.trigger();
    }
  }

  onChange(value) {
    this.setState({ content: value })
  }

  cancel() {
    this.setState({
      placeholder: '对知识点有疑问？在这里和大家讨论吧（限1000字）',
      isReply: false,
      repliedId: 0,
      showDiscuss: false,
      showSelfDiscuss: false,
    })
  }

  onSubmit(isSelfDiscuss = false) {
    const { dispatch } = this.props
    const { content } = this.state;
    const repliedId = isSelfDiscuss ? 0 : this.state.repliedId
    if(content.length == 0) {
      dispatch(alertMsg("请填写评论"));
      return false;
    }
    let discussBody = { comment: content, referenceId: this.state.knowledge.id };
    if(repliedId) {
      _.merge(discussBody, { repliedId: repliedId })
    }
    dispatch(startLoad())
    discussKnowledge(discussBody).then(res => {
      const { code, msg } = res
      if(code === 200) {
        dispatch(endLoad());
        this.reload()
      }
      else {
        dispatch(endLoad());
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

    return true;
  }

  onDelete(id) {
    let newDiscuss = [];
    let discuss = this.state.discuss;
    const { dispatch } = this.props

    dispatch(startLoad())
    deleteKnowledgeDiscuss(id).then(res => {
      if(res.code === 200) {
        dispatch(endLoad());
        discuss.map(disItem => {
          if(disItem.id !== id) {
            newDiscuss.push(disItem);
          }
        });
        this.setState({
          discuss: newDiscuss
        });
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  openWriteBox() {
    this.setState({
      showSelfDiscuss: true, content: '',
      isReply: false,
      placeholder: '对知识点有疑问？在这里和大家讨论吧（限1000字）'
    }, () => {
      document.body.scrollTop = document.body.scrollHeight;
    })
  }

  complete() {
    window.history.back();
  }

  render() {
    const { showTip, showDiscuss, showSelfDiscuss, knowledge, discuss = [], isReply, placeholder, clickedCompleteBtn } = this.state
    const { analysis, means, keynote, audio, pic, example, analysisPic, meansPic, keynotePic,
        analysisAudio, meansAudio, keynoteAudio} = knowledge
    const { location } = this.props
    const { practicePlanId } = location.query

    const renderKnowledgeContent = () => {
      return (
        <div>
          {audio ? <div className="context-audio"><Audio url={audio}/></div> : null }
          {pic ?
            <div className="context-img" style={{ textAlign: "center" }}>
              <AssetImg url={pic} width="60%"/></div> :
            null }
          {analysis ?
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/analysis2.png"/>
              </div>
              {analysisAudio ? <div className="context-audio"><Audio url={analysisAudio}/></div> : null }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: analysis }} />
              </div>
              { analysisPic ?
                <div className="context-img">
                  <AssetImg width={'60%'} url={analysisPic}/>
                </div> : null
              }
            </div> :
            null}
          {means ?
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/means2.png"/>
              </div>
              {meansAudio ? <div className="context-audio"><Audio url={meansAudio}/></div> : null }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: means }} />
              </div>
              { meansPic ?
                <div className="context-img">
                  <AssetImg width={'60%'} url={meansPic}/>
                </div>
                : null }
            </div> :
            null}
          {keynote ?
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/keynote2.png"/>
              </div>
              {keynoteAudio ? <div className="context-audio"><Audio url={keynoteAudio}/></div> : null }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: keynote }} />
              </div>
              { keynotePic ? <div className="context-img"><AssetImg width={'60%'} url={keynotePic}/></div> : null }
            </div> :
            null}
          {example ?
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/example.png"/>
              </div>
              <div className="question">
                <pre dangerouslySetInnerHTML={{ __html: example.question }}/>
              </div>
              <div className="choice-list">
                {example.choiceList.map((choice, idx) => choiceRender(choice, idx))}
              </div>

              {showTip ?
                <div className="analysis">
                  {<TitleBar content="解析"/>}
                  <div className="context">
                    正确答案：{example.choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                  </div>
                  <pre dangerouslySetInnerHTML={{ __html: example.analysis }}/>
                </div> :
                <div className="analysis">
                  <div className="analysis-tip click-key" onClick={() => this.setState({ showTip: true })}>点击查看解析
                  </div>
                </div>}
            </div>
            : null}
        </div>
      )
    }

    const renderDiscussContent = () => {
      return (
        <div className="discuss">
          {_.isEmpty(discuss) ? null : discuss.map((item, seq) => {
            return (
              <div key={seq}>
                <DiscussShow
                  discuss={item}
                  reply={() => {
                    this.reply(item)
                  }}
                  onDelete={() => this.onDelete(item.id)} key={seq}/>
                {
                  this.state.showDiscuss && this.state.repliedId === item.id ?
                    <Discuss isReply={isReply} placeholder={placeholder} limit={1000}
                             submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                             cancel={() => this.cancel()}/> :
                    null
                }
              </div>
            )
          })}
          { discuss ? (discuss.length > 0 ?
            <div className="show-more">
              你已经浏览完所有的讨论啦
            </div>
            :
            <div className="discuss-end">
              <div className="discuss-end-img">
                <AssetImg url="https://static.iqycamp.com/images/no_comment.png" width={94}
                          height={92}/>
              </div>
              <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>
            </div>)
            : null}
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${choice.isRight ? ' right' : ''}`}>
                                                  <span className={`index`}>
                                                  {sequenceMap[idx]}
                                                  </span>
          <span className={`subject`}>{subject}</span>
        </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[idx] + ' ' : '')
    }

    const renderClickBtn = () => {
      if(!location.query.tag) {
        return (
          <div className={`button-footer ${clickedCompleteBtn ? "disable" : ""}`} onClick={()=>this.complete()}>
            标记完成</div>
        )
      }
    }

    const renderSelfDisucss = () => {
      if(!showDiscuss) {
        return (
          <div>
            <Discuss
              isReply={isReply} placeholder={`对知识点有疑问？在这里和大家讨论吧（限1000字）`}
              submit={() => this.onSubmit(true)} limit={1000}
              onChange={(v) => this.onChange(v)}
              cancel={() => this.cancel()}
              showCancelBtn={false}
            />
          </div>
        )
      }
    }

    return (
      <div className="knowledgeviewer-container">
        <div className="knowledge-page">
          <div className={`container ${practicePlanId ? 'has-footer' : ''}`}>
            <div className="knowledge-head">
              <BreadCrumbs level={1} name={`知识点`}/>
              <div className="page-header">{knowledge.knowledge}</div>
            </div>
            <div className="intro-container">
              {renderKnowledgeContent()}
              {renderClickBtn()}
              {<TitleBar content="问答"/>}
              {renderSelfDisucss()}
              {renderDiscussContent()}
            </div>
          </div>
        </div>
        {showDiscuss ? <div className="padding-comment-dialog"/> : null}
      </div>
    )

  }

}
