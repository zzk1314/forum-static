import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../../components/WorkItem"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./SubjectList.less"
import {loadSubjectList} from  "./async"
import {CommentType} from  "../async"


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
    marginBottom:"-10px",
  },
  smDivider:{
    backgroundColor: "#f5f5f5",
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
      perfectLoading: false,
      otherLoading: false,
      title:null,
      perfectList:[],
      normalList:[],
      end:false,
      page:1,
    }
  }

  ajaxLoadSubjectList(problemId,page,dispatch){

    loadSubjectList(problemId,page)
      .then(res => {
        if (res.code === 200) {
          const list = res.msg.list;
          let perfectList = [];
          let normalList = [];
          if(list && list.length!==0){
            list.forEach((item,key) => {
              item.perfect?perfectList.push(item):normalList.push(item);
            });
          }
          this.setState({perfectList: this.state.perfectList.concat(perfectList), normalList: this.state.normalList.concat(normalList),
            perfectLoading: false,otherLoading:false,moreLoading:false,end:res.msg.end,page:page})
          return res.msg;
        } else if(res.code === 401) {
          this.context.router.push({
            pathname:"/login",
            query:{
              callbackUrl:`/fragment/subject/list?problemId=${problemId}`
            }
          })
        } else {
          this.setState({perfectLoading: false, otherLoading: false, moreLoading:false});
          this.context.router.push({pathname: "/servercode"});
          throw new Stop();
        }
      }).catch(err => {
      console.log("catch", err);
      if (err instanceof BreakSignal) {
        this.setState({mineLoading: false, otherLoading: false, moreLoading:false});
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        this.setState({mineLoading: false, otherLoading: false, moreLoading:false});
        dispatch(alertMsg(err + ""));
      }
    })
  }


  componentWillMount() {
    // 加载个人作业
    const {location, dispatch, page,activeProblemId} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.setState({moreLoading: true});
    this.ajaxLoadSubjectList(problemId || activeProblemId,1,dispatch)
  }

  onShowClick(submitId) {
    const {location,dispatch} = this.props;
    const {pageXOffset=0,pageYOffset=0} = window;
    dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));

    this.context.router.push({
      pathname: "/fragment/subject/show",
      query: {
        submitId: submitId,
        problemId: location.query.problemId
      }
    })
  }

  onEditClick(submitId) {
    const {location} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.context.router.push({
      pathname: "/fragment/subject/write",
      query: {
        problemId: problemId,
        submitId:submitId
      }
    })
  }

  goMine() {
    const {location} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.context.router.push({
      pathname: "/fragment/subject/list/mine",
      query: {
        problemId: problemId
      }
    })
  }

  showMore(){
    // 加载个人作业
    const {location, dispatch, page,activeProblemId} = this.props;
    const problemId = _.get(location, "query.problemId");
    this.setState({moreLoading:true});
    this.ajaxLoadSubjectList(problemId || activeProblemId,this.state.page + 1,dispatch)
  }


  render() {
    const problemId = _.get(this.props.location, "query.problemId");
    const {perfectList = [],normalList=[],perfectLoading,otherLoading,end, moreLoading} = this.state;

    const renderOther = (list) => {
      /**
       *
       <div>
       <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
       {index!==list.length-1?<Divider style={style.divider}/>:null}
       </div>
       */
      return (
          <div className="otherContainer">
            <div className="otherContainer">
              {list.map((item, index) => {
                const {submitId} = item;
                return (
                    <div>
                      <WorkItem commentType={CommentType.Subject} key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
                      {index!==list.length-1?<Divider style={style.divider}/>:null}
                    </div>
                )
              })}
            </div>
          </div>
      )
    }

    return (
      <div className="subject-list">
        <div className="subject-header">
          <div className="title">小课论坛</div>
          <div onClick={()=>this.goMine()} className="mine">我的分享</div>
        </div>
        <Divider style={style.divider}/>
        {!_.isEmpty(perfectList)?
        <div className="list">
          <div className="header perfect">
            精彩分享
          </div>
          <Divider style={style.mgDivider}/>
          {perfectLoading?<VerticalBarLoading/>: renderOther(perfectList)}
        </div>: null}

        <Divider style={style.bigDivider}/>
        {!_.isEmpty(normalList) ?
        <div className="list">
          <div className="header normal">
            最新分享
          </div>
          <Divider style={style.mgDivider}/>
          {otherLoading?<VerticalBarLoading/>:renderOther(normalList)}
        </div>: null}
        <Divider style={style.bigDivider}/>
        {moreLoading?<VerticalBarLoading/>:null}
        <div className="more">
          {end?<span style={{color:"#cccccc"}}>没有更多了</span>:<span style={{color:"#333333"}} onClick={()=>this.showMore()}>点击加载更多</span>}
        </div>
      </div>
    )
  }
}
