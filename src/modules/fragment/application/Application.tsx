import * as React from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions';
import './Application.less';
import AssetImg from '../../../components/AssetImg';
import Editor from '../../../components/editor/Editor';
import {
  loadApplicationPractice, vote, loadOtherList,
  submitApplicationPractice, CommentType, autoSaveApplicationDraft, loadPriorityApplicationCommenst,
} from './async';
import Work from '../components/NewWork';
import _ from 'lodash';
import { Work } from '../components/NewWork';
import { BreadCrumbs, TitleBar } from '../commons/FragmentComponent';
import { ArticleViewModule } from '../../../utils/helpers';
import { mark } from '../../../utils/request';
import ApplicationDiscussDistrict from './components/ApplicationDiscussDistrict/ApplicationDiscussDistrict';

let timer;

@connect(state => state)
export default class Application extends React.Component<any, any> {

  constructor () {
    super();
    this.state = {
      data: {},
      submitId: 0,
      page: 0,
      otherList: [],
      integrated: true,
      showOthers: false,
      editorValue: '',
      edit: true,
      draft: '',
      autoPushDraftFlag: null,
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentWillMount () {
    mark({ module: '打点', function: 'RISE', action: 'PC打开应用题页', memo: 'PC' });
    const { location, dispatch } = this.props;
    const { integrated, id, planId } = location.query;
    this.setState({ integrated });
    let practiceRes = await loadApplicationPractice(id, planId);
    console.log(practiceRes);
    const { code, msg } = practiceRes;
    this.setState({
      edit: !msg.isSynchronized,
      editorValue: msg.isSynchronized ? msg.content : msg.draft,
      isSynchronized: msg.isSynchronized,
      data: msg,
      submitId: msg.submitId,
      planId: msg.planId,
      applicationScore: msg.applicationScore,
      autoPushDraftFlag: false,
      showApplicationCache: msg.draft && !msg.isSynchronized,
    });

    let commentsRes = await loadPriorityApplicationCommenst(id, planId);
    this.setState({ commentsData: commentsRes.msg });
  }

  componentDidUpdate () {
    if (this.state.edit) {
      this.autoSaveApplicationDraftTimer();
    } else {
      clearInterval(timer);
    }
  }

  componentWillUnmount () {
    clearInterval(timer);
  }

  // 定时保存方法
  autoSaveApplicationDraftTimer () {
    clearInterval(timer);
    timer = setInterval(() => {
      const planId = this.state.planId;
      const applicationId = this.props.location.query.id;
      const draft = this.refs.editor.getValue();
      if (draft.trim().length > 0) {
        if (this.state.autoPushDraftFlag) {
          autoSaveApplicationDraft(planId, applicationId, draft);
          this.setState({ autoPushDraftFlag: false });
        }
      }
    }, 10000);
  }

  onEdit () {
    this.setState({ edit: true });
  }

  goComment (submitId) {
    const { id, currentIndex, integrated, practicePlanId } = this.props.location.query;
    window.open(`/fragment/application/comment?submitId=${submitId}&integrated=${integrated}&id=${id}&currentIndex=${currentIndex}&practicePlanId=${practicePlanId}`, '_blank');
  }

  voted (id, voteStatus, voteCount, isMine, seq) {
    if (!voteStatus) {
      if (isMine) {
        this.setState({ data: _.merge({}, this.state.data, { voteCount: voteCount + 1, voteStatus: true }) });
      } else {
        let newOtherList = _.merge([], this.state.otherList);
        _.set(newOtherList, `[${seq}].voteCount`, voteCount + 1);
        _.set(newOtherList, `[${seq}].voteStatus`, 1);
        this.setState({ otherList: newOtherList });
      }
      vote(id);
    }
  }

  others () {
    const { location, dispatch } = this.props;
    this.setState({ showOthers: true, loading: true });
    loadOtherList(location.query.id, this.state.page + 1).then(res => {
      if (res.code === 200) {
        this.setState({ loading: false });
        if (res.msg && res.msg.list && res.msg.list.length !== 0) {
          _.remove(res.msg.list, (item) => {
            return _.findIndex(this.state.otherList, item) !== -1;
          });
          this.setState({
            otherList: this.state.otherList.concat(res.msg.list),
            page: this.state.page + 1,
            end: res.msg.end,
          });
        } else {
          this.setState({ end: res.msg.end });
        }
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(alertMsg(ex));
    });
  }

  onSubmit () {
    const { dispatch, location } = this.props;
    const { data, planId } = this.state;
    const { complete, practicePlanId } = location.query;
    const answer = this.refs.editor.getValue();
    if (answer == null || answer.length === 0) {
      dispatch(alertMsg(null, '先写内容再提交哦'));
      return;
    }
    this.setState({ showDisable: true });
    submitApplicationPractice(planId, location.query.id, { answer }).then(res => {
      const { code, msg } = res;
      if (code === 200) {
        if (complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId));
        }
        loadApplicationPractice(location.query.id, planId).then(res => {
          const { code, msg } = res;
          if (code === 200) {
            this.setState({
              data: msg,
              submitId: msg.submitId,
              planId: msg.planId,
              edit: false,
              editorValue: msg.content,
            });
          }
          clearInterval(timer);
        });
        this.setState({ showDisable: false });
      }
    });
  }

  loadMore () {
    this.others();
  }

  render () {
    const {
      data, otherList, end,
      showOthers, edit, showDisable, integrated, loading,
      commentsData = {},
      showApplicationCache,
    } = this.state;
    const { topic, description, content, voteCount, submitId, voteStatus, knowledgeId, pic } = data;
    const { planId, id } = this.props.location.query;

    const renderList = (list) => {
      if (list) {
        return list.map((item, seq) => {
          return (
            <Work onVoted={() => this.voted(item.submitId, item.voteStatus, item.voteCount, false, seq)}
                  goComment={() => this.goComment(item.submitId)}
                  type={CommentType.Application}
                  articleModule={ArticleViewModule.Application}
                  {...item}
            />
          );
        });
      }
    };

    const renderTip = () => {
      if (edit) {
        return (
          <div className="no-comment">
            <div className="content"/>
          </div>
        );
      } else {
        return (
          <div>
            <Work
              {...data} onVoted={() => this.voted(submitId, voteStatus, voteCount, true)}
              onEdit={() => this.onEdit()}
              headImage={window.ENV.headImgUrl}
              userName={window.ENV.userName}
              type={CommentType.Application}
              articleModule={ArticleViewModule.Application}
              goComment={() => this.goComment(submitId)}/>
          </div>
        );
      }
    };

    const renderEnd = () => {
      if (showOthers) {
        if (loading) {
          return (
            <div style={{ textAlign: 'center', margin: '5px 0' }}>
              <AssetImg url="https://static.iqycamp.com/images/loading2.gif"
                        width={30}/>
            </div>
          );
        }
        if (!end) {
          return (
            <div onClick={() => this.loadMore()}
                 className="show-more click-key"
                 style={{ borderTop: '1px solid #efefef' }}>点击加载更多消息</div>
          );
        } else {
          return (
            <div className="show-more"
                 style={{ borderTop: '1px solid #efefef' }}>没有更多了</div>
          );
        }
      }
    };

    return (
      <div>
        <div className={`container ${edit ? 'has-footer' : ''}`}>
          <div className="application-container">
            <div className="application-head">
              <BreadCrumbs level={1}
                           name={`应用题`}/>
              <div className="page-header">{topic}</div>
            </div>
            <div className="intro-container">
              <div className="context-img">
                {
                  pic ?
                    <AssetImg url={pic}/> :
                    <AssetImg url='https://static.iqycamp.com/images/fragment/application_practice_2.png'/>
                }
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>输入是为了更好地输出！结合相关知识点，思考下面的问题，并提交你的答案吧</p>
                  <p>优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app"
                            size={15}/><span>今日应用</span>
                </div>
                <div className="section2"
                     dangerouslySetInnerHTML={{ __html: description }}/>
              </div>
              {
                integrated == 'false' &&
                <div className="knowledge-link click-key"
                     onClick={() =>
                       window.open(`/fragment/knowledge?id=${knowledgeId}`, '_blank')
                     }>点击查看相关知识</div>
              }
              <ApplicationDiscussDistrict data={commentsData}
                                          id={id}
                                          planId={planId}
                                          showApplicationCache={showApplicationCache}
                                          submitCallback={() => {
                                            this.componentWillMount();
                                          }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
