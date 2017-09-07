import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions'
import './Application.less'
import AssetImg from '../../../components/AssetImg'
import Editor from '../../../components/editor/Editor'
import {
  loadApplicationPractice, vote, loadOtherList, loadKnowledgeIntro,
  openApplication, getOpenStatus, submitApplicationPractice, CommentType, autoSaveApplicationDraft,
  autoUpdateApplicationDraft
} from './async'
import Work from '../components/NewWork'
import _ from 'lodash'
import { Work } from '../components/NewWork'
import KnowledgeModal from  '../components/KnowledgeModal'
import { BreadCrumbs, TitleBar } from '../commons/FragmentComponent'
import { ArticleViewModule } from '../../../utils/helpers'
import { mark } from '../../../utils/request'

let timer
let localStorageTimer
const APPLICATION_AUTO_SAVING = 'rise_application_autosaving'

@connect(state => state)
export default class Application extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
      submitId: 0,
      page: 0,
      otherList: [],
      integrated: true,
      showOthers: false,
      editorValue: '',
      edit: true,
      draftId: -1,
      draft: '',
      showDraftToast: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: 'RISE', action: 'PC打开应用练习页', memo: 'PC' })
    const { location, dispatch } = this.props
    const { integrated, id, planId } = location.query
    this.setState({ integrated })
    loadApplicationPractice(id, planId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        dispatch(endLoad())

        let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING))
        let draft = storageDraft && storageDraft.id === id && storageDraft.content ? storageDraft.content : msg.draft
        // 对草稿数据进行处理
        if(storageDraft && id == storageDraft.id) {
          this.setState({
            edit: true,
            editorValue: draft,
            isSynchronized: false
          }, () => {
            autoSaveApplicationDraft(planId, id, storageDraft.content)
          })
        } else {
          this.setState({
            edit: !msg.isSynchronized,
            editorValue: msg.isSynchronized ? msg.content : msg.draft,
            isSynchronized: msg.isSynchronized
          })
        }

        // 更新其余数据
        this.setState({
          data: msg,
          submitId: msg.submitId,
          planId: msg.planId,
          applicationScore: res.msg.applicationScore
        })
        if(integrated == 'false') {
          loadKnowledgeIntro(msg.knowledgeId).then(res => {
            const { code, msg } = res
            if(code === 200) {
              this.setState({ knowledge: msg })
            } else {
              dispatch(alertMsg(msg))
            }
          })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  componentDidUpdate() {
    if(this.state.edit) {
      this.autoSaveApplicationDraftTimer()
      this.autoSaveLocalStorageTimer()
    } else {
      clearInterval(timer)
      clearInterval(localStorageTimer)
    }
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  clearStorage() {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING)
  }

  // 定时保存方法
  autoSaveApplicationDraftTimer() {
    clearInterval(timer)
    timer = setInterval(() => {
      const planId = this.state.planId
      const applicationId = this.props.location.query.id
      const draft = this.refs.editor.getValue()
      if(draft.trim().length > 0) {
        autoSaveApplicationDraft(planId, applicationId, draft).then(res => {
          if(res.code === 200) {
            this.clearStorage()
          }
        })
      }
    }, 10000)
  }

  autoSaveLocalStorageTimer() {
    clearInterval(localStorageTimer)
    localStorageTimer = setInterval(() => {
      let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING))
      if(storageDraft) {
        if(this.props.location.query.id === storageDraft.id) {
          window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
            id: this.props.location.query.id,
            content: this.refs.editor.getValue()
          }))
        } else {
          this.clearStorage()
        }
      } else {
        window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
          id: this.props.location.query.id, content: this.refs.editor.getValue()
        }))
      }
    }, 1000)
  }

  onEdit() {
    this.setState({ edit: true })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  goComment(submitId) {
    const { id, currentIndex, integrated, practicePlanId } = this.props.location.query
    window.open(`/fragment/application/comment?submitId=${submitId}&integrated=${integrated}&id=${id}&currentIndex=${currentIndex}&practicePlanId=${practicePlanId}`, '_blank')
  }

  voted(id, voteStatus, voteCount, isMine, seq) {
    if(!voteStatus) {
      if(isMine) {
        this.setState({ data: _.merge({}, this.state.data, { voteCount: voteCount + 1, voteStatus: true }) })
      } else {
        let newOtherList = _.merge([], this.state.otherList)
        _.set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        _.set(newOtherList, `[${seq}].voteStatus`, 1)
        this.setState({ otherList: newOtherList })
      }
      vote(id)
    }
  }

  tutorialEnd() {
    const { openStatus } = this.state
    openApplication().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ openStatus: _.merge({}, openStatus, { openApplication: true }) })
      }
    })
  }

  others() {
    const { location, dispatch } = this.props
    this.setState({ showOthers: true, loading: true })
    loadOtherList(location.query.id, this.state.page + 1).then(res => {
      if(res.code === 200) {
        this.setState({ loading: false })
        if(res.msg && res.msg.list && res.msg.list.length !== 0) {
          _.remove(res.msg.list, (item) => {
            return _.findIndex(this.state.otherList, item) !== -1
          })
          this.setState({
            otherList: this.state.otherList.concat(res.msg.list),
            page: this.state.page + 1,
            end: res.msg.end
          })
        } else {
          this.setState({ end: res.msg.end })
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { dispatch, location } = this.props
    const { data, planId } = this.state
    const { complete, practicePlanId } = location.query
    const answer = this.refs.editor.getValue()
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg(null, '先写内容再提交哦'))
      return
    }
    this.setState({ showDisable: true })
    submitApplicationPractice(planId, location.query.id, { answer }).then(res => {
      this.clearStorage()
      const { code, msg } = res
      if(code === 200) {
        if(complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId))
        }
        loadApplicationPractice(location.query.id, planId).then(res => {
          const { code, msg } = res
          if(code === 200) {
            this.setState({
              data: msg,
              submitId: msg.submitId,
              planId: msg.planId,
              edit: false,
              editorValue: msg.content
            })
          }
          clearInterval(timer)
        })
        this.setState({ showDisable: false })
      }
    })
  }

  loadMore() {
    this.others()
  }

  render() {
    const {
      data, otherList, knowledge = {}, showKnowledge, end,
      showOthers, edit, showDisable, integrated, loading
    } = this.state
    const { topic, description, content, voteCount, submitId, voteStatus, knowledgeId, pic } = data

    const renderList = (list) => {
      if(list) {
        return list.map((item, seq) => {
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
            <div className="content"/>
          </div>
        )
      } else {
        return (
          <div>
            <Work
              {...data}
              onVoted={() => this.voted(submitId, voteStatus, voteCount, true)}
              onEdit={() => this.onEdit()}
              headImage={window.ENV.headImage}
              userName={window.ENV.userName}
              type={CommentType.Application}
              articleModule={ArticleViewModule.Application}
              goComment={() => this.goComment(submitId)}
            />
          </div>
        )
      }
    }

    const renderEnd = () => {
      if(showOthers) {
        if(loading) {
          return (
            <div style={{ textAlign: 'center', margin: '5px 0' }}>
              <AssetImg url="https://static.iqycamp.com/images/loading2.gif" width={30}/>
            </div>
          )
        }
        if(!end) {
          return (
            <div onClick={() => this.loadMore()} className="show-more click-key"
                 style={{ borderTop: '1px solid #efefef' }}>点击加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more" style={{ borderTop: '1px solid #efefef' }}>没有更多了</div>
          )
        }
      }
    }

    return (
      <div>
        <div className={`container ${edit ? 'has-footer' : ''}`}>
          <div className="application">
            <div className="application-head">
              <BreadCrumbs level={1} name={`应用题`}/>
              <div className="page-header">{topic}</div>
            </div>
            <div className="intro-container">
              <div className="context-img">
                {pic ? <AssetImg url={pic}/> :
                  <AssetImg url='https://static.iqycamp.com/images/fragment/application_practice_2.png'/>}
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>输入是为了更好地输出！结合相关知识点，思考下面的问题，并提交你的答案吧</p>
                  <p>优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{ __html: description }}/>
              </div>
              {integrated == 'false' ?
                <div className="knowledge-link click-key"
                     onClick={() =>
                       window.open(`/fragment/knowledge?id=${knowledgeId}`, '_blank')
                     }>点击查看相关知识</div> :
                null
              }
            </div>
            <div ref="workContainer" className="work-container">
              {<TitleBar content={content === null ? '提交方式' : '我的作业'}/>}
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
            </div>
            { showDisable ?
              <div className="button-footer small disabled">提交中</div> :
              edit ?
                <div className="button-footer small" onClick={() => this.onSubmit()}>提交</div> : null
            }
            {!showOthers ?
              <div className="show-others-tip click-key" onClick={() => this.others()}>同学的作业</div> : null}
            {showOthers && !_.isEmpty(otherList) ?
              <div>
                <TitleBar content={'同学的作业'}/>
                {renderList(otherList)}
              </div> :
              null}
            {renderEnd()}
          </div>
        </div>
        {showKnowledge ? <KnowledgeModal knowledge={knowledge} closeModal={() => this.closeModal()}/> : null}
      </div>
    )
  }

}
