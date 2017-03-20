import * as React from "react";
import {connect} from "react-redux";
import "./PracticeView.less";
import {loadWarmUp, highlight} from "./async"
import {BreakSignal, Stop} from "../../../utils/request"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import Subheader from 'material-ui/Subheader'

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
export default class practiceView extends React.Component <any, any> {
    constructor() {
        super()
        this.state = {
            data: {},
            showDiscuss: false,
            repliedId: 0,
            warmupPracticeId: 0,
        }
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        const {dispatch, location} = this.props
        const {id} = location.query
        loadWarmUp(id).then(res => {
            if (res.code === 200) {
                this.setState({
                    data: res.msg
                })
            } else {
                throw new BreakSignal(res.msg, "加载当前问题失败")
            }
        })
    }

    showAlert(content, title) {
        const {dispatch} = this.props;
        dispatch(alertMsg(title,content));
        setTimeout(() => {
            dispatch(set("base.showModal",false));
        }, 1000);
    }

    highlight(id){
        highlight(id).then(res =>{
            if (res.code === 200) {
                this.showAlert('提交成功')
            }
        })
    }

    reply(warmupPracticeId, repliedId){
        this.context.router.push({pathname:'/backend/warmup/discuss', query:{warmupPracticeId, repliedId}})
    }

    render() {
        const {data} = this.state

        const questionRender = (practice) => {
            const {id, question, voice, analysis, choiceList = [], score = 0, discussList = []} = practice
            return (
                <div className="intro-container">
                    <div className="question">
                        <div dangerouslySetInnerHTML={{__html: question}}></div>
                    </div>
                    <div className="choice-list">
                        {choiceList.map((choice, idx) => choiceRender(choice, idx))}
                    </div>
                    <div className="analysis">
                        <div className="analysis-title">【解析】</div>
                        <div className="context"
                             dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
                    </div>
                    <div className="discuss">
                        <a name="discuss"/>
                        <div className="discuss-title-bar"><span className="discuss-title">问答</span></div>
                        {discussList.map((discuss, idx) => discussRender(discuss, idx))}
                        <div className="discuss-end">
                            你已经浏览完所有的讨论啦
                        </div>
                    </div>
                </div>
            )
        }

        const discussRender = (discuss, idx) => {
            const {id, name, avatar, comment, discussTime, repliedName, repliedComment, warmupPracticeId} = discuss
            return (
                <div className="comment-cell" key={id}>
                    <div className="comment-avatar"><img className="comment-avatar-img" src={avatar} /></div>
                    <div className="comment-area">
                        <div className="comment-head">
                            <div className="comment-name">
                                {name}
                            </div>
                            <div className="comment-time">{discussTime}</div>
                            <div className="right">
                                <div className="function-button" onClick={()=>this.reply(warmupPracticeId, id)}>
                                    回复
                                </div>
                                <div className="function-button" onClick={()=>this.highlight(id)}>
                                    加精
                                </div>
                            </div>
                        </div>
                        <div className="comment-content">{comment}</div>
                        {repliedComment ?
                            <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
                    </div>
                    <div className="comment-hr"/>
                </div>
            )
        }

        const choiceRender = (choice, idx) => {
            const {id, subject} = choice
            return (
                <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
                    <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
                </div>
            )
        }

        return (
            <div className="warm-up-analysis">
                <Subheader>理解训练</Subheader>
                {questionRender(data)}
            </div>
        )
    }
}
