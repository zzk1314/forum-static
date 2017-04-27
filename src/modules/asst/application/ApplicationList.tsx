import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../../components/WorkItem"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./ApplicationList.less"
import {loadApplicationList} from  "../async"

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
    marginBottom:"-10px",
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
      data: [],
    }
  }


  componentWillMount(problemId) {
    // 加载个人作业
    const {location, dispatch} = this.props;
    if(!problemId){
      problemId = _.get(location, "query.problemId");
    }

    this.setState({otherLoading: true});
    loadApplicationList(problemId)
      .then(res=>{
        if(res.code===200){
          this.setState({other:res.msg, otherLoading:false});
        }else if(res.code === 401){
          this.context.router.push({
            pathname:"/login",
            query:{
              callbackUrl:`/asst/application/list?problemId=${problemId}`
            }
          })
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
    const problemId = _.get(location.query, "problemId");

    this.context.router.push({
      pathname: "/asst/application/view",
      query: {
        submitId: submitId,
        problemId:problemId,
        type:'asst',
      }
    })
  }

  render() {
    const {other = [], otherLoading} = this.state;

    const renderOther = (list) => {
      return (
        <div className="otherContainer">
          {list.map((item, index) => {
            const {submitId} = item;
            return (
              <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
            )
          })}
        </div>
      )
    }
    return (
      <div className="applicationListContainer">
        <div className="myApplicationContainer">
          <div className="titleContainer">
            <div className="title">应用练习</div>
          </div>
          <div className="list">
            {otherLoading?<VerticalBarLoading/>:
                <div>
                  <div className="header normal">
                    待评论作业
                  </div>
                  <Divider style={style.mgDivider}/>{renderOther(other)}
                </div>
            }
          </div>
          <div className="more">
            <span style={{color:"#cccccc"}}>没有更多了</span>
          </div>
        </div>
      </div>
    )
  }
}
