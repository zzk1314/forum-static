import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./SubjectList.less"
import {loadSubjectArticleList} from  "../async"
import WorkItem from "../../../components/WorkItem"


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
      page:1
    }
  }


  componentWillMount(problemId) {
    // 加载个人作业
    const {location, dispatch, page} = this.props;
    if(!problemId){
      problemId = _.get(location, "query.problemId");
    }
    const scrollValue = _.get(page,"scroll");
    this.setState({otherLoading: true});
    loadSubjectArticleList(problemId)
        .then(res => {
          if (res.code === 200) {
            this.setState({otherLoading: false, other:res.msg})
          } else if(res.code === 401){
            this.context.router.push({
              pathname:"/login",
              query:{
                callbackUrl:`/asst/subject/list?problemId=${problemId}`
              }
            })
          } else {
            this.setState({otherLoading: false});
            this.context.router.push({pathname: "/servercode"});
            throw new Stop();
          }
      }).catch(err => {
      console.log("catch", err);
      if (err instanceof BreakSignal) {
        this.setState({otherLoading: false});
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        this.setState({otherLoading: false});
        dispatch(alertMsg(err + ""));
      }
    })
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.query.problemId !== newProps.location.query.problemId){
      this.componentWillMount(newProps.location.query.problemId)
    }
  }

  onShowClick(submitId) {
    const {location,dispatch} = this.props;
    const {pageXOffset=0,pageYOffset=0} = window;
    dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));

    this.context.router.push({
      pathname: "/asst/subject/view",
      query: {
        submitId: submitId,
        problemId: location.query.problemId,
        type:'asst',
      }
    })
  }


  render() {
    const problemId = _.get(this.props.location, "query.problemId");
    const {other=[],otherLoading,end} = this.state;


    const renderOther = (list) => {
      return (
          <div className="otherContainer">
            {list.map((item, index) => {
              const {submitId} = item;
              return (
                  <div>
                      <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
                      {index!==list.length-1?<Divider style={style.divider}/>:null}
                  </div>
              )
            })}
          </div>
      )
    }

    return (
      <div className="subject-list">
        <div className="subject-header">
          <div className="title">小课论坛</div>
        </div>
        <Divider style={style.divider}/>
        <div className="list">
          <div className="header normal">
            待评论作业
          </div>
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
