import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import Avatar from 'material-ui/Avatar';
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./MineSubject.less"
import {loadMineSubjectList} from  "./async"
import {imgSrc} from "../../../utils/imgSrc"


const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-24px",
    width:"120%",
  }
}

@connect(state => state)
export default class ApplicationList extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      mine: [],
      other: [],
      loading: false,
      title:null,
      perfectList:[],
      normalList:[],
      list:[],
    }
  }


  componentWillMount() {
    // 加载个人作业
    const {location, dispatch, page} = this.props;
    const problemId = _.get(location, "query.problemId");
    const scrollValue = _.get(page,"scroll");

    this.setState({loading: true});
    loadMineSubjectList(problemId)
      .then(res => {
        if (res.code === 200) {
          this.setState({list: res.msg,loading: false})
          return res.msg;
        } else if(res.code === 401) {
          this.context.router.push({
            pathname:"/login",
            query:{
              callbackUrl:`/fragment/subject/list/mine?problemId=${problemId}`
            }
          })
        } else {
          this.setState({perfectLoading: false, otherLoading: false});
          this.context.router.push({pathname: "/servercode"});
          throw new Stop();
        }
      }).catch(err => {
      console.log("catch", err);
      if (err instanceof BreakSignal) {
        this.setState({mineLoading: false, otherLoading: false});
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        this.setState({mineLoading: false, otherLoading: false});
        dispatch(alertMsg(err + ""));
      }
    })
  }

  onShowClick(submitId) {
    const {location,dispatch} = this.props;
    const problemId = _.get(location, "query.problemId");
    const {pageXOffset=0,pageYOffset=0} = window;
    dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));

    this.context.router.push({
      pathname: "/fragment/subject/show",
      query: {
        submitId: submitId,
        problemId:problemId,
      }
    })
  }

  onEditClick(submitId) {
    const {location} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.context.router.push({
      pathname: "/fragment/subject/write",
      query: {
        submitId: submitId,
        problemId:problemId
      }
    })
  }

  goWrite(){
    const {location} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.context.router.push({
      pathname: "/fragment/subject/write",
      query: {
        problemId: problemId
      }
    })
  }

  render() {
    const problemId = _.get(this.props.location, "query.problemId");
    const {list = [],loading} = this.state;

    const renderControl = (item) => {
      if (!item.isMine) {
        // 不修改，使其他人的作业
        return (
          <div className="control-container">
            <span className="show" onClick={()=>this.onShowClick(item.submitId)}>查看全文</span>
          </div>
        )
      } else {
        // 可修改，是自己的作业
        return (
          <div className="control-container">
            <span className="show" onClick={()=>this.onShowClick(item.submitId)}>查看</span>/<span onClick={()=>this.onEditClick(item.submitId)}
                                                                                                 className="edit">修改</span>
          </div>)
      }
    }


    return (
      <div className="mine-subject-list">
        <div className="backContainer">
          <span onClick={()=>{
            this.context.router.push({
              pathname:'/fragment/subject/list',
              query:{problemId:problemId}
            })}} className="backBtn"><img src={imgSrc.backList}/>返回列表</span>
          <span onClick={()=>this.goWrite()} className="mine">写分享</span>
        </div>
        <Divider style={style.divider}/>
        <div className="list">
          {loading?<VerticalBarLoading/>:list.map((item,seq)=>{
            return (
              <div className="item" key={seq}>
                <div className="header">
                  <div className="title">{item.title}</div>
                  <div className="info">
                    <div className="vote-count">被赞&nbsp;{item.voteCount}</div>
                    <div className="comment-count">评论&nbsp;{item.commentCount}</div>
                  </div>
                </div>
                <div className="up-info">
                  <Avatar
                    src={item.headPic}
                    size={30}
                  />
                  <div className="up-name">{item.upName}</div>
                  <div className="up-time">{item.upTime}</div>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html:item.content}}/>
                {renderControl(item)}
              </div>
            )
          })}
          {!list || (list && list.length === 0)?<div className="no-tip">点击右上角按钮，开始写分享吧！</div>:null}
        </div>
      </div>
    )
  }
}
