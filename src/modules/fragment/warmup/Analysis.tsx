import * as React from 'react';
import { connect } from 'react-redux';
import './WarmUp.less';
import { loadWarmUpAnalysis, loadWarmUpDiscuss, discuss, deleteComment, loadPriorityWarmUpAnalysis } from './async';
import { startLoad, endLoad, alertMsg } from '../../../redux/actions';
import AssetImg from '../../../components/AssetImg';
import Discuss from '../components/Discuss';
import DiscussShow from '../components/DiscussShow';
import SubDiscussShow from '../components/SubDiscussShow';
import _ from 'lodash';
import { mark } from '../../../utils/request';
import { BreadCrumbs, TitleBar } from '../commons/FragmentComponent';
import WarmUpDiscussDistrict from './components/WarmupDiscussDistrict/WarmUpDiscussDistrict';
import requestProxy from '../../../components/proxy/requestProxy';

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
};

@connect(state => state)
export default class Analysis extends React.Component <any, any> {
  constructor () {
    super();
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      showDiscuss: false,
      showSelfDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      pageIndex: 1,
      integrated: false,
      isReply: false,
      placeholder: '解答同学的提问（限1000字）',
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentWillMount (props) {
    mark({ module: '打点', function: 'RISE', action: 'PC打开选择题解析页', memo: 'PC' });
    const { dispatch, location } = props || this.props;
    this.setState({ currentIndex: 0 });
    const { practicePlanId, integrated } = location.query;
    this.setState({ integrated });
    let res = await loadPriorityWarmUpAnalysis(practicePlanId);
    const { code, msg } = res;
    this.setState({ list: msg, practiceCount: msg.practice.length });
  }

  componentWillReceiveProps (newProps) {
    if (this.props.location.query.practicePlanId !== newProps.location.query.practicePlanId) {
      this.componentWillMount(newProps);
    }
  }

  next () {
    const { currentIndex, practiceCount } = this.state;
    if (currentIndex < practiceCount - 1) {
      this.setState({
        currentIndex: currentIndex + 1,
        content: '',
      });
      window.scrollTo(0, 0);
    }
  }

  prev () {
    const { currentIndex } = this.state;
    if (currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - 1,
        content: '',
      });
      window.scrollTo(0, 0);
    }
  }

  nextTask () {
    const { series, planId } = this.props.location.query;
    this.context.router.push({
      pathname: '/fragment/learn',
      query: { series, planId },
    });
  }

  async onSubmit () {
    const { practicePlanId, integrated } = this.props.location.query;
    const { content, list, currentIndex } = this.state;
    const { practice = [] } = list;
    const { id } = practice[currentIndex];
    if (content.length == 0) {
      requestProxy.alertMessage('请填写评论');
      return;
    }
    let discussBody = { comment: content, referenceId: id };
    let res = await discuss(discussBody);
    if (res.code === 200) {
      let analysis = await loadPriorityWarmUpAnalysis(practicePlanId);
      const { code, msg } = analysis;
      this.setState({ list: msg, practiceCount: msg.practice.length });
    }
  }

  render () {
    const {
      list, currentIndex, selected, practiceCount, showDiscuss, isReply, integrated, placeholder,
    } = this.state;
    const { practice = [] } = list;

    const questionRender = (practice) => {
      const { id, question, pic, choiceList = [], score = 0, discussList = [], knowledgeId } = practice;
      return (
        <div>
          <div className="intro-container">
            {
              practiceCount !== 0 && currentIndex <= practiceCount - 1 &&
              <div className="intro-index">
                <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
                <span className="type"><span className="number">{score}</span>分</span>
              </div>
            }
            {
              pic &&
              <div className="context-img">
                <AssetImg url={pic}/>
              </div>
            }
            <div className="question">
              <div dangerouslySetInnerHTML={{ __html: question }}/>
            </div>
            <div className="choice-list">
              {choiceList.map((choice, idx) => choiceRender(choice, idx))}
            </div>
            <div className="analysis">
              {<TitleBar content="解析"/>}
              <div className="context"
                   style={{ marginTop: 10 }}>
                正确答案：{choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
              </div>
              <div className="context"
                   style={{ marginBottom: 15 }}>
                已选答案：{choiceList.map((choice, idx) => myAnswerRender(choice, idx))}
              </div>
              <div className="context"
                   dangerouslySetInnerHTML={{ __html: practice ? practice.analysis : '' }}/>
              {
                integrated == 'false' &&
                <div className="knowledge-link click-key"
                     onClick={() =>
                       window.open(`/fragment/knowledge?id=${knowledgeId}&tag=${false}`)
                     }>
                  点击查看相关知识</div>
              }
            </div>
          </div>
          <div>
            <div className="button-footer">
              <div className={`left ${currentIndex === 0 ? ' disabled' : 'origin'}`}
                   onClick={() => this.prev()}>上一题
              </div>
              {
                currentIndex + 1 < practiceCount ?
                  <div className={`right`}
                       onClick={() => this.next()}>下一题</div> :
                  <div className={`right`}
                       onClick={() => this.nextTask()}>返回</div>
              }
            </div>
          </div>
          <div className="discuss-container">
            <div className="discuss">
              <TitleBar content="问答"/>
              <Discuss placeholder={`解答同学的提问（限1000字）`}
                       submit={() => this.onSubmit(true)}
                       limit={1000}
                       onChange={(value) => this.setState({ content: value })}
                       showCancelBtn={false}/>
              <WarmUpDiscussDistrict data={practice.warmupDiscussDistrict}
                                     clickFunc={() => {
                                       console.log('you clicked me');
                                     }}/>
            </div>
          </div>
        </div>
      );
    };

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice;
      return (
        <div key={id}
             className={`hover-cursor choice${choice.selected ? ' selected' : ''}${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {
              choice.isRight ?
                <AssetImg type="right"
                          width={13}
                          height={8}/> :
                sequenceMap[idx]
            }
          </span>
          <span className={`text`}>{subject}</span>
        </div>
      );
    };

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[idx] + ' ' : '');
    };

    const myAnswerRender = (choice, idx) => {
      return (choice.selected ? sequenceMap[idx] + ' ' : '');
    };

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up">
            <div className="warm-up-head">
              <BreadCrumbs level={1}
                           name={`选择题`}/>
              {
                practice[currentIndex] && practice[currentIndex].knowledge ?
                  <div className="page-header">{practice[currentIndex].knowledge.knowledge}</div> :
                  <div className="page-header">综合练习</div>
              }
            </div>
            {questionRender(practice[currentIndex] || {})}
          </div>
        </div>
      </div>
    );
  }
}
