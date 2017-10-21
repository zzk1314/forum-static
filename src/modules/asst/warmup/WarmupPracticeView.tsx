import * as React from "react";
import {connect} from "react-redux";
import "./WarmupPracticeView.less";
import {loadWarmUpAnalysisNew, discuss, deleteComment, loadWarmUpDiscuss} from "../../fragment/warmup/async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import Discuss from "../../fragment/components/Discuss";
import _ from "lodash"
import DiscussShow from "../../fragment/components/DiscussShow";
import {scroll} from "../../../utils/helpers"
import {TitleBar} from "../../fragment/commons/FragmentComponent";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export default class WarmupPracticeView extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      placeholder:'解答同学的提问（限1000字）',
      isReply:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(props) {
    const {dispatch, location} = props || this.props;
    const {id} = location.query;
    dispatch(startLoad());
    loadWarmUpAnalysisNew(id).then(res => {
      dispatch(endLoad());
      const {code, msg} = res;
      if (code === 200){
        this.setState({data: msg, knowledge:msg.knowledge, warmupPracticeId:id})
      }
      else dispatch(alertMsg(msg));
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })
  }


  closeDiscussModal() {
    const {dispatch} = this.props;
    let {data, warmupPracticeId} = this.state;

    loadWarmUpAnalysisNew(warmupPracticeId).then(res => {
      dispatch(endLoad());
      const {code, msg} = res;
      if (code === 200) {
        _.set(data, 'discussList', msg.discussList);
        this.setState({showDiscuss: false, data});
        scroll('.discuss', '.container');
      }
      else dispatch(alertMsg(msg));
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  reply(item){
    this.setState({showDiscuss:true, isReply:true,
      placeholder:'回复 '+item.name+':', content:'',
      repliedId:item.id, referenceId:item.warmupPracticeId})
  }

  onDelete(discussId){
    const {data} = this.state;
    const {dispatch} = this.props;
    const {discussList = []} = data;
    deleteComment(discussId).then(res =>{
      const {id} = data;
      loadWarmUpDiscuss(id, 1).then(res => {
        dispatch(endLoad());
        const {code, msg} = res;
        if (code === 200) {
          _.set(data, 'discussList', msg);
          this.setState({showDiscuss: false, data});
        }
        else dispatch(alertMsg(msg));
      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    })
  }

  onChange(value){
    this.setState({content:value})
  }

  cancel(){
    this.setState({placeholder:'解答同学的提问（限1000字）', isReply:false, showDiscuss:false})
  }

  onSubmit(isSelfDiscuss = false){
    const {dispatch} = this.props;
    const {warmupPracticeId, content} = this.state;
    if(content.length==0){
      dispatch(alertMsg('请填写评论'));
      return false;
    }
    const repliedId = isSelfDiscuss ? 0 : this.state.repliedId;

    let discussBody = {comment:content, referenceId: warmupPracticeId};
    if (repliedId) {
      _.merge(discussBody, {repliedId: repliedId});
    }

    discuss(discussBody).then(res => {
      const {code, msg} = res;
      if (code === 200) {
        this.closeDiscussModal();
      }
      else {
        dispatch(alertMsg(msg));
      }
    }).catch(ex => {
      dispatch(alertMsg(ex));
    });

    return true;
  }

  render() {
    const {data, selected, showDiscuss, isReply, placeholder} = this.state
    const {knowledge} = data;

    const questionRender = (practice) => {
      const {id, question, pic, choiceList = [], discussList = []} = practice
      return (
          <div>
            <div className="intro-container">
              {pic ? <div className="context-img">
                    <AssetImg url={pic}/></div>:null
              }
              <div className="question">
                <div dangerouslySetInnerHTML={{__html: question}}></div>
              </div>
              <div className="choice-list">
                {choiceList.map((choice, idx) => choiceRender(choice, idx))}
              </div>
              <div className="analysis">
                <TitleBar content="解析"/>
                <div className="context">
                  正确答案：{choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                </div>
                <div className="context" style={{marginBottom:15}}>
                  已选答案：{choiceList.map((choice, idx) => myAnswerRender(choice, idx))}
                </div>
                <div className="context"
                     dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
                {knowledge ?
                    <div className="knowledge-link click-key" onClick={() =>
                                    window.open(`/fragment/knowledge?id=${knowledge.id}&tag=${false}`)
                                }>点击查看相关知识</div>:null}
              </div>
            </div>
            <div className="discuss-container">
              <div className="discuss">
                <TitleBar content="问答"/>
                <Discuss isReply={false} placeholder={'解答同学的提问（限1000字）'} limit={1000}
                                      submit={()=>this.onSubmit(true)} onChange={(v)=>this.onChange(v)}
                                      cancel={()=>this.cancel()}
                                      showCancelBtn={false}/>
                {discussList.map((discuss, idx) => discussRender(discuss, idx))}
                { discussList.length > 0 ?
                    <div className="show-more">
                      你已经浏览完所有的讨论啦
                    </div>
                    :
                    <div className="discuss-end">
                      <div className="discuss-end-img">
                        <AssetImg url="https://static.iqycamp.com/images/no_comment.png" width={94} height={92}/>
                      </div>
                      <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>

                    </div>
                }
              </div>
            </div>
          </div>
      )
    }

    const discussRender = (discuss, idx) => {
      return (
          <div key={idx}>
            <DiscussShow
                key={idx} discuss={discuss} reply={() => this.reply(discuss)}
                onDelete={this.onDelete.bind(this, discuss.id)}/>
            {
              this.state.showDiscuss && this.state.repliedId === discuss.id ?
                  <Discuss
                      isReply={isReply} placeholder={placeholder}
                      submit={() => this.onSubmit()} limit={1000}
                      onChange={(v) => this.onChange(v)}
                      cancel={() => this.cancel()}/> :
                  null
            }
          </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice;
      return (
          <div key={id} className={`choice${choice.selected ? ' selected' : ''}${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {choice.isRight ? <AssetImg type="right" width={13} height={8}/> : sequenceMap[idx]}
          </span>
            <span className={`text`}>{subject}</span>
          </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight? sequenceMap[idx]+' ' :'')
    }

    const myAnswerRender = (choice, idx) => {
      return (choice.selected? sequenceMap[idx]+' ' :'')
    }

    return (
        <div>
          <div className="container has-footer">
            <div className="warm-up-view">
              {knowledge?<div className="page-header">{knowledge.knowledge}</div>:null}
              {questionRender(data)}

            </div>
          </div>

        </div>
    )
  }
}
