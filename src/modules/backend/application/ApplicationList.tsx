import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import Avatar from 'material-ui/Avatar';
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import _ from "lodash"
import "./ApplicationList.less"
import {loadApplicationSubmit, highlight, loadApplication} from  "./async"


@connect(state => state)
export default class ApplicationList extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      other: [],
      hasMore:true,
      index: 1,
      otherLoading:true,
      application:{},
    }
  }


  componentWillMount() {
    const {location, dispatch, page} = this.props;
    const {applicationId} =  location.query
    const {index} =  this.state
    const scrollValue = _.get(page,"scroll");

    loadApplication(applicationId).then(res =>{
      if (res.code === 200) {
        this.setState({application: res.msg});
      } else {
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if (err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      }
    })

    loadApplicationSubmit(applicationId, index).then(res => {
      if (res.code === 200) {
        this.setState({other: res.msg, otherLoading: false});
        if(scrollValue){
          scroll(scrollValue.x,scrollValue.y);
          dispatch(set("page.scroll",{x:0,y:0}));
        }
      } else {
        this.setState({otherLoading: false});
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if (err instanceof BreakSignal) {
        this.setState({otherLoading: false});
        dispatch(alertMsg(err.title, err.msg));
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

  loadMoreContent(){
    const {location, dispatch} = this.props;
    const {applicationId} =  location.query
    const {index, other} =  this.state

    loadApplicationSubmit(applicationId, index+1).then(res => {
      if (res.code === 200) {
        let hasMore = true
        if(res.msg.length===0){
          hasMore = false
        }else {
          res.msg.forEach(item => other.push(item));
        }
        this.setState({other, index:index+1, hasMore});
      } else {
        throw new BreakSignal(res.msg, "提示");
      }
    }).catch(err => {
      if (err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      }
    })
  }

  highlight(application, id){
    const {other} = this.state
    highlight(application, id).then(res =>{
      if (res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item)=>{
        if(item.id === id){
          _.set(item, 'priority', 1)
        }
      })
      this.setState({other})
    })
  }

  render() {
    const {other = [], hasMore, otherLoading, application} = this.state;
    const renderOther = () => {
      return (
        <div className="otherContainer">
          {other.map((item, index) => {
            const {id, upName, headPic, upTime, content, applicationId, priority} = item;
            return (
                <div key={index} className="workItemContainer">
                  <div className="titleArea">
                    <div className="leftArea">
                      <div className="author">
                        <div className="avatar">
                          <Avatar
                              src={headPic}
                              size={30}
                          />
                        </div>
                        <div className="upInfo">
                          <div className="upName">{upName}</div>
                          <div className="upTime">{upTime + "上传"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workContentContainer">
                    <div className="content">
                      {content}
                    </div>
                    <div className="rightArea">
                      {priority === 0 ?
                        <div className="function-button" onClick={()=>this.highlight(applicationId, id)}>
                          加精
                        </div>:
                      <div className="function-done">已加精</div> }
                    </div>
                  </div>
                </div>
            )
          })}
        </div>
      )
    }
    return (
      <div className="challengeListContainer">
        <div className="myChallengeContainer">
          <div className="desc" dangerouslySetInnerHTML={{__html:application.description}}></div>
          <div className="title">
            <span className="title-text">群众的智慧</span>
          </div>
          {otherLoading ?<VerticalBarLoading/>: renderOther()}
          <Divider/>
          {hasMore ?<div className="more" onClick={()=>this.loadMoreContent()}>点击加载更多</div>:
              <div className="no-more">没有更多了</div>}
        </div>
      </div>
    )
  }
}