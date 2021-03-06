import * as React from "react";
import { connect } from "react-redux";
import "./Subject.less";
import { loadSubjects, vote, CommentType } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Work from "../components/NewWork";
// import PullElement from 'pull-element'
import AssetImg from "../../../components/AssetImg";
import { findIndex, remove, isArray, findLast, isNull, isString, truncate, merge, set, get } from "lodash";
import { mark } from '../plan/async';
import { ArticleViewModule } from "../../../utils/helpers"

@connect(state => state)
export default class Subject extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
      submitId: 0,
      page: 1,
      otherList: [],
      goBackUrl: '',
      showDiscuss: false,
      editDisable: false,
      defaultTitle: null,
      defaultContent: null,
    }
    this.pullElement = null;
    this.picHeight = 350 / 750 * window.innerWidth;
    this.paddingTop = (this.picHeight - 24 - 14 - 20) / 2;
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {

    const { dispatch, location } = this.props;
    const { state } = location
    if(state) {
      const { goBackUrl } = state
      if(goBackUrl) {
        this.setState({ goBackUrl })
      }
    }
    mark({ module: "打点", function: "小课论坛", action: "PC打开小课论坛", memo: location.query.id });
    dispatch(startLoad());

    loadSubjects(location.query.id, 1).then(res => {
      dispatch(endLoad())
      let { code, msg } = res;
      if(code === 200) {
        const { list, end } = msg;
        let perfectList = [];
        let normalList = [];
        if(list && list.length !== 0) {
          list.forEach((item, key) => {
            item.perfect ? perfectList.push(item) : normalList.push(item);
          });
        }
        this.setState({ perfectList: perfectList, normalList: normalList, end: end })
      }
      else dispatch(alertMsg(msg))
      return false;
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

  }

  onEdit(submitId) {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/practice/subject/submit',
      query: { series: location.query.series, id: location.query.id, submitId }
    })
  }

  goComment(submitId) {
    const { goBackUrl } = this.state
    this.context.router.push({
      pathname: "/rise/static/practice/subject/comment",
      query: merge({ submitId: submitId }, this.props.location.query),
      state: { goBackUrl }
    })
  }

  voted(id, voteStatus, voteCount, perfect, seq) {
    if(!voteStatus) {
      if(perfect) {
        let newOtherList = merge([], this.state.perfectList);
        set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        set(newOtherList, `[${seq}].voteStatus`, 1);
        this.setState({ perfectList: newOtherList })
      } else {
        let newOtherList = merge([], this.state.normalList);
        set(newOtherList, `[${seq}].voteCount`, voteCount + 1)
        set(newOtherList, `[${seq}].voteStatus`, 1);
        this.setState({ normalList: newOtherList })
      }
      vote(id);
    } else {
    }
  }

  back() {
    const { goBackUrl } = this.state
    const { location } = this.props
    if(goBackUrl) {
      this.context.router.push({ pathname: goBackUrl })
    } else {
      this.context.router.push({ pathname: '/rise/static/learn', query: { series: location.query.series } })
    }
  }

  openWriteBox() {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/practice/subject/submit',
      query: { series: location.query.series, id: location.query.id }
    })
  }

  render() {
    const { perfectList = [], normalList = [], end, desc, showDiscuss } = this.state

    const renderTips = () => {
      if((normalList && normalList.length !== 0) || (perfectList && perfectList.length !== 0)) {
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

    const renderArticle = (list, perfect) => {
      if(list) {
        return list.map((item, seq) => {
          return (
            <Work onVoted={() => this.voted(item.submitId, item.voteStatus, item.voteCount, perfect, seq)}  {...item}
                  goComment={() => this.goComment(item.submitId)}
                  type={CommentType.Subject} key={seq}
                  articleModule={ArticleViewModule.Subject}
                  onEdit={item.isMine ? () => this.onEdit(item.submitId) : null}
            />
          )
        })
      }
    }

    const renderArticles = () => {
      return (
        <div ref="workContainer" className="content">
          {perfectList && perfectList.length !== 0 ? <div className="submit-bar">精彩分享</div> : null}
          {renderArticle(perfectList, true)}
          {normalList && normalList.length !== 0 ? <div className="submit-bar">最新分享</div> : null}
          {renderArticle(normalList, false)}
          {renderTips()}
        </div>

      )
    }

    return (
      <div ref="container" className="container-no-pd">
        <div className="subject">
          <div className="header" style={{height: `${this.picHeight}px`}}>
            <div className="main-tip" style={{paddingTop: `${this.paddingTop}px`}}>小课论坛</div>
            <div className="sec-tip">深度好文•遇见大咖•分享心得</div>
          </div>
          <div className="intro" dangerouslySetInnerHTML={{__html: desc}}>
          </div>
          {renderArticles()}
          <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
            <AssetImg url="https://static.iqycamp.com/images/discuss.png" width={45} height={45}/>
          </div>
        </div>
      </div>
    )
  }
}
