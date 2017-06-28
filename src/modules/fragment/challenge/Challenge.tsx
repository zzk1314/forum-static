import * as React from "react";
import { connect } from "react-redux";
import "./Challenge.less";
import { loadChallengePractice, submitChallengePractice } from "./async";
import { ArticleViewModule } from "../../../utils/helpers"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Work from "../components/NewWork";
import Editor from "../../../components/editor/Editor";
import AssetImg from "../../../components/AssetImg";
import { BreadCrumbs, TitleBar } from "../commons/FragmentComponent"

@connect(state => state)
export default class Challenge extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      data: {},
      knowledge: {},
      submitId: 0,
      page: 1,
      otherList: [],
      opacity: 0,
      goBackUrl: '',
      edit: true,
    }
    this.pullElement = null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { state } = location
    if(state) {
      const { goBackUrl } = state
      if(goBackUrl) {
        this.setState({ goBackUrl })
      }
    }
    dispatch(startLoad())
    loadChallengePractice(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        const { content } = msg
        this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId })
        if(content !== null) {
          this.setState({ edit: false })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
  }

  onEdit() {
    this.setState({ edit: true })
  }

  onSubmit() {
    const { dispatch, location } = this.props;
    const { data, planId } = this.state;
    const answer = this.refs.editor.getValue();
    const { submitId } = data;
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg(null, '请填写作业'));
      return;
    }
    this.setState({ showDisable: true });
    submitChallengePractice(planId, location.query.id, { answer }).then(res => {
      const { code, msg } = res
      if(code === 200) {
        dispatch(startLoad());
        loadChallengePractice(location.query.id).then(res => {
          dispatch(endLoad());
          const { code, msg } = res
          if(code === 200) {
            this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId, edit: false })
          }
          else dispatch(alertMsg(msg))
        })
        this.setState({ showDisable: false })
      }
      else {
        dispatch(alertMsg(msg))
        this.setState({ showDisable: false })
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
      this.setState({ showDisable: false })
    });
  }

  render() {
    const { data, edit, showDisable } = this.state;
    const { content } = data;

    const renderTip = () => {
      if(edit) {
        return (
          <div className="no-comment">
            <div className="content"></div>
          </div>
        )
      } else {
        return (
          <div>
            <Work onEdit={() => this.onEdit()} operation={false}
                  articleModule={ArticleViewModule.Challenge}
                  headImage={window.ENV.headImage} userName={window.ENV.userName} {...data}/>
          </div>
        )
      }
    }

    return (
      <div>
        <div className="container">
          <div className="challenge">
            <div className="challenge-head">
              <BreadCrumbs navList={['小课', '小目标']}/>
              <div className="page-header">{'小目标'}</div>
            </div>
            <div className="intro-container">
              <div className="context-img">
                <AssetImg url="https://static.iqycamp.com/images/fragment/challenge_practice_2.png" width="60%"/>
              </div>
              <div className="challenge-context">
                <div>
                  <p className="context">你有什么目标，可以利用本小课的训练实现呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
                  <p className="tip-title">小提示</p>
                  <p className="tip">本题答案仅自己可见</p>
                  <p className="tip">目标最好是某个具体问题或场景</p>
                  <p className="tip">制定目标之前，可以先回顾该小课的知识体系</p>
                </div>
              </div>
            </div>
            <div ref="workContainer" className="work-container">
              {<TitleBar content={content === null ? "提交方式" : "我的目标"}/>}
              {renderTip()}
              {edit ?
                <div className="editor">
                  <Editor
                    ref="editor" moduleId={3}
                    onUploadError={(res) => {
                      this.props.dispatch(alertMsg(res.msg))
                    }}
                    uploadStart={() => {
                      this.props.dispatch(startLoad())
                    }}
                    uploadEnd={() => {
                      this.props.dispatch(endLoad())
                    }}
                    value={content}
                    defaultValue={content} placeholder="离开页面前请提交，以免内容丢失。"
                  />
                </div> : null}
            </div>
            {showDisable ?
              <div className="button-footer small disabled">提交中</div> :
              edit ?
                <div className="button-footer small" onClick={this.onSubmit.bind(this)}>提交</div> : null
            }
          </div>
        </div>
      </div>
    )
  }

}
