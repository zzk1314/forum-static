import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {ppost, BreakSignal, Stop} from "../../utils/request";
import VerticalBarLoading from "../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../redux/actions"
import "./CommentedList.less"
import {loadCommentedList, commentCount} from  "./async"
import WorkItem from "../../components/WorkItem"


const style = {
    divider: {
        backgroundColor: "#f5f5f5",
        marginLeft: "-24px",
        width:"120%",
    },
    bigDivider:{
        backgroundColor: "#f5f5f5",
        marginLeft: "-24px",
        width:"120%",
        height:'3px',
    },
    mgDivider:{
        backgroundColor: "#f5f5f5",
        marginLeft: "-24px",
        width:"120%",
    },
    smDivider:{
        backgroundColor: "#f5f5f5",
    },
    paper:{
        width: 120,
        left: '80%',
        position: 'absolute',
        height: 60,
        textAlign: 'center',
        marginTop: -45,
    }
}

@connect(state => state)
export default class CommentedList extends React.Component<any,any> {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            mine: [],
            other: [],
            perfectLoading: false,
            otherLoading: false,
            title:null,
            perfectList:[],
            normalList:[],
            end:false,
            page:1,
            todayComment:-1,
            totalComment:-1,
        }
    }


    componentWillMount() {
        // 加载个人作业
        const {location, dispatch, page} = this.props;

        const scrollValue = _.get(page,"scroll");
        this.setState({otherLoading: true});
        loadCommentedList()
            .then(res => {
                if (res.code === 200) {
                    this.setState({otherLoading: false, other:res.msg})
                } else if(res.code === 401){
                    this.context.router.push({
                        pathname:"/login",
                        query:{
                            callbackUrl:`/asst/commented/list`
                        }
                    })
                } else {
                    this.setState({otherLoading: false});
                    this.context.router.push({pathname: "/servercode"});
                    throw new Stop();
                }
            }).catch(err => {
            if (err instanceof BreakSignal) {
                this.setState({otherLoading: false});
                dispatch(alertMsg(err.title, err.msg));
            } else if (!(err instanceof Stop)) {
                this.setState({otherLoading: false});
                dispatch(alertMsg(err + ""));
            }
        })

        commentCount().then(res =>{
            const {code, msg} = res
            if(code === 200){
                this.setState({totalComment:msg.totalComment, todayComment:msg.todayComment})
            }
        })
    }

    onShowClick(submitId, type) {
        const {location,dispatch} = this.props;
        const {pageXOffset=0,pageYOffset=0} = window;
        dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));

        console.log(type)
        console.log(submitId)

        if(type === 3){
            this.context.router.push({
                pathname: "/asst/subject/view",
                query: {
                    submitId: submitId,
                    problemId: location.query.problemId,
                    type:'asst',
                }
            })
        }else if(type === 11 || type === 12){
            this.context.router.push({
                pathname: "/asst/application/view",
                query: {
                    submitId: submitId,
                    problemId: location.query.problemId,
                    type:'asst',
                }
            })
        }

    }


    render() {
        const {other=[],otherLoading,end,todayComment,totalComment} = this.state;


        const renderOther = (list) => {
            return (
                <div className="otherContainer">
                    {list.map((item, index) => {
                        const {submitId, type} = item;
                        return (
                            <div key={index}>
                                <WorkItem {...item} onShowClick={()=>this.onShowClick(submitId, type)}/>
                                {index!==list.length-1?<Divider style={style.divider}/>:null}
                            </div>
                        )
                    })}
                </div>
            )
        }

        return (
            <div className="commented-list">
                { todayComment>=0 && totalComment>=0 ?
                    <Paper style={style.paper}>
                        <div className="comment-count">今日点评<span>{todayComment}</span>份</div>
                        <div className="comment-count">共点评过<a href="/asst/commented">{totalComment}</a>份</div>
                    </Paper>:null
                }
                <div className="commented-header">
                    <div className="title">已评论练习</div>
                </div>
                <Divider style={style.divider}/>
                <div className="list">
                    <Divider style={style.mgDivider}/>
                    {otherLoading?<VerticalBarLoading/>: renderOther(other)}
                </div>

                <div className="more">
                    <span style={{color:"#cccccc"}}>没有更多了</span>
                </div>
            </div>
        )
    }
}
