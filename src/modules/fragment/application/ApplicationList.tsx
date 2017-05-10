import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../../components/WorkItem"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./ApplicationList.less"
import {loadMineApplication, loadOtherApplication,loadApplicationTitle} from  "./async"
import {CommentType} from  "../async"

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-24px",
    marginTop:"-8px",
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
      perfectList:[],
      mineLoading: false,
      otherLoading: false,
      perfactLoading: false,
      moreLoading: false,
      title:null,
      end:true,
      index:1,
    }
  }


  componentWillMount() {
    // 加载个人作业
    const {location, dispatch, page, index} = this.props;
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location,"query.planId");
    const scrollValue = _.get(page,"scroll");

    this.setState({mineLoading: true, otherLoading: true});
    // loadApplicationTitle(applicationId)
    //   .then(res=>{
    //     if(res.code===200){
    //       this.setState({title:res.msg});
    //     }
    //   }).catch(err=>{console.log(err)});
    loadMineApplication(planId,applicationId)
      .then(res => {
        if (res.code === 200) {
          this.setState({mine: res.msg, mineLoading: false});
          return res.msg;
        } else if(res.code === 401) {
          this.context.router.push({
            pathname:"/login",
            query:{
              callbackUrl:`/fragment/application/list?applicationId=${applicationId}&planId=${planId}`
            }
          })
        } else {
          this.setState({mineLoading: false, otherLoading: false});
          this.context.router.push({pathname: "/servercode"});
          throw new Stop();
        }
      }).then(() => {
      return loadOtherApplication(applicationId, index)
        .then(res => {
          if (res.code === 200) {
            this.setState({other: res.msg.list, perfectList: res.msg.highlightList, end:res.msg.end, otherLoading: false});
            if(scrollValue){
              scroll(scrollValue.x,scrollValue.y);
              dispatch(set("page.scroll",{x:0,y:0}));
            }
          } else {
            this.setState({otherLoading: false});
            throw new BreakSignal(res.msg, "提示");
          }
        })
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
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location, "query.planId");
    const {pageXOffset=0,pageYOffset=0} = window;
    dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));

    this.context.router.push({
      pathname: "/fragment/application/show",
      query: {
        submitId: submitId,
        applicationId:applicationId,
        planId:planId
      }
    })
  }

  onEditClick(applicationId, planId) {
    this.context.router.push({
      pathname: "/fragment/application",
      query: {
        applicationId: applicationId,
        planId: planId
      }
    })
  }

  showMore(){
    // 加载个人作业
    const {location, dispatch, page,activeProblemId} = this.props;
    const planId = _.get(location, "query.planId");
    const applicationId = _.get(location, "query.applicationId");
    this.setState({moreLoading:true});
    this.ajaxLoadSubjectList(applicationId, planId, this.state.index + 1)
  }

  ajaxLoadSubjectList(applicationId,planId,page){
    const {dispatch} = this.props;
    loadOtherApplication(applicationId,page)
        .then(res => {
          if (res.code === 200) {
            const list = res.msg.list;
            let perfectList = [];
            let other = [];
            if(list && list.length!==0){
              list.forEach((item,key) => {
                item.perfect?perfectList.push(item):other.push(item);
              });
            }
            this.setState({other: this.state.other.concat(other),perfectLoading: false,otherLoading:false,
              moreLoading:false,end:res.msg.end,index:page})
            return res.msg;
          } else if(res.code === 401) {
            this.context.router.push({
              pathname:"/login",
              query:{
                callbackUrl:`/fragment/application/list?applicationId=${applicationId}&planId=${planId}`
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

  render() {
    const applicationId = _.get(this.props.location, "query.applicationId");
    const planId = _.get(this.props.location, "query.planId");
    const {mine = {}, other = [], otherLoading, perfectList = [], end, perfactLoading,moreLoading} = this.state;
    const renderMine = () => {
      return (
        <div className="mineContainer">
          <WorkItem commentType={CommentType.Application} {...mine} onShowClick={()=>this.onShowClick(mine.submitId)}
                    onEditClick={()=>this.onEditClick(applicationId,planId)}/>
        </div>
      )
    }
    const renderOther = (list) => {
      return (
        <div className="otherContainer">
          {list.map((item, index) => {
            const {submitId} = item;
            return (
                <div>
                  <WorkItem commentType={CommentType.Application} key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
                  {index!==list.length-1?<Divider style={style.divider}/>:null}
                </div>
            )
          })}
        </div>
      )
    }
    return (
      <div className="applicationListContainer">
        <div className="myApplicationContainer">
          {/*<div className="titleContainer">*/}
            {/*<div className="title">{this.state.title}</div>*/}
          {/*</div>*/}
          <Divider style={style.divider}/>
          {this.state.mineLoading ?<VerticalBarLoading/>: renderMine()}
        </div>
        <div className="myApplicationContainer">
            <div className="title">
              <span className="title-text">群众的智慧</span>
            </div>
          {/*{this.state.otherLoading ?<VerticalBarLoading/>: renderOther()}*/}
          {!_.isEmpty(perfectList)?
          <div className="list">
            {perfactLoading?<VerticalBarLoading/>:
            <div>
                <div className="header perfect">
                  精彩分享
                </div>
              <Divider style={style.mgDivider}/>{renderOther(perfectList)}
            </div>
            }
          </div>: null}

          <Divider style={style.bigDivider}/>
          {!_.isEmpty(other)?
          <div className="list">
            {otherLoading?<VerticalBarLoading/>:
                <div>
                  <div className="header normal">
                    最新分享
                  </div>
                  <Divider style={style.mgDivider}/>{renderOther(other)}
                </div>}
          </div>:null}
          {moreLoading?<VerticalBarLoading/>:null}
          <div className="more">
            {end?<span style={{color:"#cccccc"}}>没有更多了</span>:<span style={{color:"#333333"}} onClick={()=>this.showMore()}>点击加载更多</span>}
          </div>
        </div>
      </div>
    )
  }
}
