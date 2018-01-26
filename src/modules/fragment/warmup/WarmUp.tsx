import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import "./WarmUp.less";
import { answer, loadWarmUpAnalysis } from "./async";
import AssetImg from "../../../components/AssetImg";
import { BreadCrumbs } from "../commons/FragmentComponent";
import { mark } from "../../../utils/request";

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
export default class WarmUp extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
      showKnowledge: false,
      integrated: false,
      submitting: false
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "RISE", action: "PC打开选择题页", memo: "PC" });
    const { location, dispatch } = this.props;
    const { practicePlanId, integrated } = location.query;
    this.setState({ integrated });
    dispatch(startLoad());
    loadWarmUpAnalysis(practicePlanId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        const { practice } = msg;
        if(practice) {
          let idx = _.findIndex(practice, (item) => {
            const { choiceList } = item;
            if(choiceList) {
              return choiceList.filter(choice => choice.selected).length > 0;
            } else {
              return false;
            }
          })
          this.setState({ list: msg, practiceCount: msg.practice.length })
          dispatch(endLoad());
        }
      } else {
        dispatch(endLoad());
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

  }

  onChoiceSelected(choiceId) {
    const { list, currentIndex, selected } = this.state
    let _list = selected
    if(_list.indexOf(choiceId) > -1) {
      _.remove(_list, n => n === choiceId)
    } else {
      _list.push(choiceId)
    }
    this.setState({ selected: _list })
  }

  setChoice(cb) {
    let { list, currentIndex, selected } = this.state
    _.set(list, `practice.${currentIndex}.choice`, selected)
    this.setState({ list })
    if(cb) {
      cb(list.practice)
    }
  }

  prev() {
    const { currentIndex, list } = this.state
    if(currentIndex > 0) {
      this.setChoice()
      const selected = list.practice[ `${currentIndex - 1}` ].choice
      this.setState({ currentIndex: currentIndex - 1, selected })
    }
    this.refs.warmup.scrollTop = 0
  }

  next() {
    const { dispatch } = this.props;
    const { selected, list, currentIndex, practiceCount } = this.state;
    if(selected.length === 0) {
      dispatch(alertMsg(null, "你还没有选择答案哦"));
      return
    }
    if(currentIndex < practiceCount - 1) {
      this.setChoice();
      let selected = list.practice[ `${currentIndex + 1}` ].choice;
      if(!selected) {
        selected = []
      }
      this.setState({ currentIndex: currentIndex + 1, selected })
    }
    this.refs.warmup.scrollTop = 0
  }

  onSubmit() {
    const { dispatch, location } = this.props;
    const { selected, practice, currentIndex, practiceCount, submitting } = this.state;

    // 正在提交
    if(submitting) {
      return
    } else {
      this.setState({ submitting: true })
    }

    const { practicePlanId, complete } = location.query;
    if(selected.length === 0) {
      dispatch(alertMsg(null, "你还没有选择答案哦"));
      return;
    }
    if(currentIndex === practiceCount - 1) {
      this.setChoice(p => {
        answer({ practice: p }, practicePlanId).then(res => {
          const { code, msg } = res;
          if(complete == 'false') {
            dispatch(set('completePracticePlanId', practicePlanId));
          }
          if(code === 200) {
            this.context.router.push({
              pathname: '/fragment/warmup/result',
              query: _.merge(msg, location.query)
            })
          } else {
            dispatch(alertMsg(null, "这组训练已经提交过答案啦"));
          }
        }).catch(e => {
          dispatch(endLoad());
          dispatch(alertMsg(e));
        })
      })
    }
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  render() {
    const { list, currentIndex, selected, practiceCount, showKnowledge, openStatus = {}, integrated, submitting } = this.state
    const { practice = [] } = list
    const questionRender = (practice) => {
      const { question, pic, choiceList = [], score = 0, knowledgeId } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ?
            <div className="intro-index">
              <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
              <span className="type"><span className="number">{score}</span>分</span>
            </div> :
            null}
          {pic ? <div className="context-img">
              <AssetImg url={pic} width="80%" height="80%"/></div> : null
          }
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}/>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          {integrated == 'false' ?
            <div className="knowledge-link click-key"
                 onClick={() =>
                   window.open(`/fragment/knowledge?id=${knowledgeId}&tag=${false}`, "_blank")
                 }>不确定?瞄一眼知识点</div> :
            null}
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className="index">{sequenceMap[ idx ]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    const renderClickBtn = () => {
      return (
        <div className="button-footer">
          <div className={`left origin ${currentIndex === 0 ? ' disabled' : ''}`} onClick={()=>this.prev()}>上一题
          </div>
          { currentIndex !== practiceCount - 1 ? <div className={`right`} onClick={()=>this.next()}>下一题</div> :
            <div className={`right ${submitting ? 'disabled' : ''}`} onClick={()=>this.onSubmit()}>提交</div>
          }
        </div>
      )
    }

    return (
      <div className="container">
        <div className="warm-up">
          <div style={{ height: "100%" }}>
            <div className="has-footer" ref={'warmup'}>
              <div>
                <div className="warm-up-head">
                  <BreadCrumbs level={1} name={`选择题`}/>
                  {practice[ currentIndex ] && practice[ currentIndex ].knowledge ?
                    <div className="page-header">{practice[ currentIndex ].knowledge.knowledge}</div> :
                    <div className="page-header">综合练习</div>
                  }
                </div>
                {questionRender(practice[ currentIndex ] || {})}
              </div>
            </div>
            {renderClickBtn()}
          </div>
        </div>
      </div>
    )
  }

}

