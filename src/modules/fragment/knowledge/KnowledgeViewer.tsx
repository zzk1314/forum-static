import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { mark } from '../../../utils/request';
import './KnowledgeViewer.less';
import {
  loadDiscuss,
  discussKnowledge,
  loadKnowledge,
  learnKnowledge,
  loadKnowledges,
  deleteKnowledgeDiscuss,
  loadKnowledgePriorityDiscuss,
} from './async';
import AssetImg from '../../../components/AssetImg';
import Audio from '../../../components/Audio';
import DiscussShow from '../components/DiscussShow';
import Discuss from '../components/Discuss';
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions';
import { BreadCrumbs, TitleBar } from '../commons/FragmentComponent';
import QYVideo from '../../../components/QYVideo';
import KnowledgeDiscussDistrict from './components/KnowledgeDiscussDistrict/KnowledgeDiscussDistrict';
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
export default class KnowledgeViewer extends React.Component<any, any> {

  constructor () {
    super();
    this.state = {
      showTip: false,
      showDiscuss: false,
      commentId: 0,
      knowledge: {},
      discuss: {},
      placeholder: '对知识点有疑问？在这里和大家讨论吧（限1000字）',
      isReply: false,
      clickedCompleteBtn: false,
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentWillMount () {
    mark({ module: '打点', function: 'RISE', action: 'PC打开知识点', memo: 'PC' });
    const { id, practicePlanId, complete } = this.props.location.query;
    if (practicePlanId) {
      let knowledge = await loadKnowledges(practicePlanId);
      this.setState({ knowledge: knowledge.msg[0], referenceId: knowledge.msg[0].id });
      let discussRes = await loadKnowledgePriorityDiscuss(knowledge.msg[0].id, 1);
      this.setState({ discussData: discussRes.msg });

      if (complete == 'false') {
        // 练习完成动效
        dispatch(set('completePracticePlanId', practicePlanId));
      }
    } else if (id) {
      let knowledge = await loadKnowledges(id);
      this.setState({ knowledge: knowledge.msg });
      let discussRes = await loadKnowledgePriorityDiscuss(id, 1);
      this.setState({ discussData: discussRes.msg });
    }
  }

  async onSubmit () {
    const { content } = this.state;
    if (content.length == 0) {
      requestProxy.alertMessage('请填写评论');
      return;
    }
    let discussBody = { comment: content, referenceId: this.state.knowledge.id };
    let res = await discussKnowledge(discussBody);
    if (res.code === 200) {
      this.componentWillMount();
    }
  }

  render () {
    const { showTip, showDiscuss, knowledge, discuss = [], isReply, placeholder, clickedCompleteBtn } = this.state;
    const {
      analysis, means, keynote, audio, audioWords, pic, example, analysisPic, meansPic, keynotePic, videoUrl, videoWords, videoPoster,
      analysisAudio, analysisAudioWords, meansAudio, meansAudioWords, keynoteAudio, keynoteAudioWords,
    } = knowledge;
    const { location } = this.props;
    const { practicePlanId } = location.query;

    const renderKnowledgeContent = () => {
      return (
        <div>
          {
            videoUrl &&
            <QYVideo videoUrl={videoUrl}
                     videoWords={videoWords}
                     videoPoster={videoPoster}>您的设备不支持video标签</QYVideo>
          }
          {
            audio &&
            <div className="context-audio"><Audio url={audio}
                                                  words={audioWords}/></div>
          }
          {
            pic &&
            <div className="context-img"
                 style={{ textAlign: 'center' }}>
              <AssetImg url={pic}
                        width="60%"/>
            </div>
          }
          {
            analysis &&
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'}
                          url="https://static.iqycamp.com/images/fragment/analysis2.png"/>
              </div>
              {
                analysisAudio &&
                <div className="context-audio">
                  <Audio url={analysisAudio}
                         words={analysisAudioWords}/>
                </div>
              }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: analysis }}/>
              </div>
              {
                analysisPic &&
                <div className="context-img">
                  <AssetImg width={'60%'}
                            url={analysisPic}/>
                </div>
              }
            </div>
          }
          {
            means &&
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'}
                          url="https://static.iqycamp.com/images/fragment/means2.png"/>
              </div>
              {
                meansAudio &&
                <div className="context-audio">
                  <Audio url={meansAudio}
                         words={meansAudioWords}/>
                </div>
              }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: means }}/>
              </div>
              {
                meansPic &&
                <div className="context-img">
                  <AssetImg width={'60%'}
                            url={meansPic}/>
                </div>
              }
            </div>
          }
          {
            keynote &&
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'}
                          url="https://static.iqycamp.com/images/fragment/keynote2.png"/>
              </div>
              {
                keynoteAudio &&
                <div className="context-audio">
                  <Audio url={keynoteAudio}
                         words={keynoteAudioWords}/>
                </div>
              }
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: keynote }}/>
              </div>
              {
                keynotePic &&
                <div className="context-img">
                  <AssetImg width={'60%'}
                            url={keynotePic}/>
                </div>
              }
            </div>
          }
          {
            example &&
            <div>
              <div className="context-title-img">
                <AssetImg width={'60%'}
                          url="https://static.iqycamp.com/images/fragment/example.png"/>
              </div>
              <div className="question">
                <pre dangerouslySetInnerHTML={{ __html: example.question }}/>
              </div>
              <div className="choice-list">
                {example.choiceList.map((choice, idx) => choiceRender(choice, idx))}
              </div>
              {
                showTip ?
                  <div className="analysis">
                    {<TitleBar content="解析"/>}
                    <div className="context">
                      正确答案：{example.choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                    </div>
                    <pre dangerouslySetInnerHTML={{ __html: example.analysis }}/>
                  </div> :
                  <div className="analysis">
                    <div className="analysis-tip click-key"
                         onClick={() => this.setState({ showTip: true })}>点击查看解析
                    </div>
                  </div>
              }
            </div>
          }
        </div>
      );
    };

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice;
      return (
        <div key={id}
             className={`choice${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>{sequenceMap[idx]}</span>
          <span className={`subject`}>{subject}</span>
        </div>
      );
    };

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[idx] + ' ' : '');
    };

    const renderClickBtn = () => {
      if (!location.query.tag) {
        return (
          <div className={`button-footer ${clickedCompleteBtn ? 'disable' : ''}`}
               onClick={() => window.history.back()}>
            标记完成</div>
        );
      }
    };

    return (
      <div className="knowledgeviewer-container">
        <div className="knowledge-page">
          <div className={`container ${practicePlanId ? 'has-footer' : ''}`}>
            <div className="knowledge-head">
              <BreadCrumbs level={1}
                           name={`知识点`}/>
              <div className="page-header">{knowledge.knowledge}</div>
            </div>
            <div className="intro-container">
              {renderKnowledgeContent()}
              {renderClickBtn()}
              {<TitleBar content="问答"/>}
              <Discuss placeholder={`对知识点有疑问？在这里和大家讨论吧（限1000字）`}
                       submit={() => this.onSubmit()}
                       limit={1000}
                       onChange={(value) => this.setState({ content: value })}
                       showCancelBtn={false}/>
              <KnowledgeDiscussDistrict data={this.state.discussData}
                                        submitFunc={() => {
                                          console.log('you click me');
                                        }}/>
            </div>
          </div>
        </div>
      </div>
    );

  }

}
