import * as React from "react";
import { connect } from "react-redux";
import { remove, set, merge, get, findIndex, isBoolean } from "lodash";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./WarmUp.less";
import { answer, getOpenStatus, loadWarmUpAnalysis, openConsolidation } from "./async";
import AssetImg from "../../../components/AssetImg";
import KnowledgeModal from "../components/KnowledgeModal"
import { RISE_HomeIcon } from "../commons/ViewComponents";

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
      integrated: false
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    const { practicePlanId, integrated } = location.query;
    this.setState({ integrated });
    dispatch(startLoad());
    loadWarmUpAnalysis(practicePlanId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        const { practice } = msg;
        if(practice) {
          let idx = findIndex(practice, (item) => {
            const { choiceList } = item;
            if(choiceList) {
              return choiceList.filter(choice => choice.selected).length > 0;
            } else {
              return false;
            }
          })
          // if(idx !== -1) {
          //   this.context.router.push({
          //     pathname: '/rise/static/practice/warmup/analysis',
          //     query: location.query,
          //   })
          // } else {
          this.setState({ list: msg, practiceCount: msg.practice.length })
          // }
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

    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({ openStatus: res.msg });
      }
    })

  }

  onChoiceSelected(choiceId) {
    const { list, currentIndex, selected } = this.state
    const curPractice = list.practice[currentIndex]
    let _list = selected
    if(_list.indexOf(choiceId) > -1) {
      remove(_list, n => n === choiceId)
    } else {
      _list.push(choiceId)
    }
    this.setState({ selected: _list })
  }

  setChoice(cb) {
    let { list, currentIndex, selected } = this.state
    set(list, `practice.${currentIndex}.choice`, selected)
    this.setState({ list })
    if(cb) {
      cb(list.practice)
    }
  }

  prev() {
    const { currentIndex, list } = this.state
    if(currentIndex > 0) {
      this.setChoice()
      const selected = list.practice[`${currentIndex - 1}`].choice
      this.setState({ currentIndex: currentIndex - 1, selected })
    }
    this.refs.warmup.scrollTop = 0
  }

  next() {
    const { dispatch } = this.props;
    const { selected, list, currentIndex, practiceCount } = this.state;
    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"));
      return
    }
    if(currentIndex < practiceCount - 1) {
      this.setChoice();
      let selected = list.practice[`${currentIndex + 1}`].choice;
      if(!selected) {
        selected = []
      }
      this.setState({ currentIndex: currentIndex + 1, selected })
    }
    this.refs.warmup.scrollTop = 0
  }

  onSubmit() {
    const { dispatch } = this.props;
    const { selected, practice, currentIndex, practiceCount } = this.state;
    const { practicePlanId } = this.props.location.query;
    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"));
      return;
    }
    if(currentIndex === practiceCount - 1) {
      this.setChoice(p => {
        answer({ practice: p }, practicePlanId).then(res => {
          const { code, msg } = res
          if(code === 200) this.context.router.push({
            pathname: '/fragment/warmup/result',
            query: merge(msg, this.props.location.query)
          })
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
    const { list, currentIndex, selected, practiceCount, showKnowledge, openStatus = {}, integrated } = this.state
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
          {console.log(this.state)}
          {console.log(this.props)}
          {integrated == 'false' ?
            <div className="knowledge-link hover-cursor"
                 onClick={() =>
                   window.open(`/fragment/knowledge?id=${knowledgeId}`)
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
          <span className="index">{sequenceMap[idx]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <div>
          <RISE_HomeIcon showHomeIcon={true}/>
        </div>
      )
    }

    return (
      <div className="container">
        {showKnowledge ?
          <KnowledgeModal knowledge={practice[currentIndex].knowledge} closeModal={this.closeModal.bind(this)}/> :
          <div style={{ height: "100%" }}>
            <div className="has-footer" ref={'warmup'}>
              <div className="warm-up">
                {practice[currentIndex] ?
                  <div className="page-header">{practice[currentIndex].knowledge.knowledge}</div> : null}
                {questionRender(practice[currentIndex] || {})}
              </div>
            </div>
            <div className="button-footer">
              <div className={`left origin ${currentIndex === 0 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一题
              </div>
              { currentIndex !== practiceCount - 1 ? <div className={`right`} onClick={this.next.bind(this)}>下一题</div> :
                <div className={`right`} onClick={this.onSubmit.bind(this)}>提交</div>
              }
            </div>
          </div>
        }
        {renderOtherComponents()}
      </div>
    )
  }

}

