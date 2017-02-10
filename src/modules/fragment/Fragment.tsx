import * as React from "react";
import {connect} from "react-redux";
import {List, ListItem,makeSelectable} from 'material-ui/List';
import * as _ from "lodash";
import "./Fragment.less"
import {Grid, Row, Col} from "react-flexbox-grid"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import VerticalBarLoading from "../../components/VerticalBarLoading"
import {loadProblems} from "./async"
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {imgSrc} from "utils/imgSrc"


const style = {
  divider: {
    backgroundColor: "#f5f5f5",
  },
  listTitle: {
    height: "65px",
    padding: 0,
    overflow: "hidden",
  },
  firstItem: {
    margin: "16px auto 50px",
    padding: "24px 0"
  },
  item: {
    margin: "50px auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  }
}


@connect(state => state)
export default class Fragment extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemList: [],
      doingId: null,
      curProblem: null,
      problemLoading: false,
    }
  }

  componentWillMount() {
    // 加载所有作业列表
    if (!this.state.problemList || _.isEmpty(this.state.problemList)) {
      // ajax加载
      this.setState({problemLoading: true});
      loadProblems().then(res => {
        if (res.code === 200) {
          this.setState({problemList: res.msg, problemLoading: false});
        }
      });
    } else {
      // 已经缓存
      this.setState({curProblem: this.state.doingId});
    }
  }


  chooseProblem(problemId) {
    const {dispatch} = this.props;
    // 选择难题，进入rise页面
    dispatch(set("activeProblemId",problemId));
    dispatch(set("page.scroll",{x:0,y:0}));
    this.context.router.push({
      pathname:"/fragment/rise",
      query:{problemId:problemId}});

  }


  render() {
    const problemList = _.get(this.state, "problemList",[]); // 问题列表，默认为[]
    const {activeProblemId} = this.props;

    const navClassName = (status,curId,id)=>{

      if(_.isEqual(Number(status),1) || _.isEqual(Number(status),2)){
        if(_.isEqual(Number(curId),id)){
          return "listItem-choose-running"
        } else {
          return "listItem-running"
        }
      } else if(_.isEqual(Number(status),3)) {
        if(_.isEqual(Number(curId),id)){
          return "listItem-choose-done"
        } else {
          return "listItem-done"
        }
      } else {
        if(_.isEqual(Number(curId),id)){
          return "listItem-choose-lock"
        } else {
          return "listItem-lock"
        }
      }
    }
    const textItem = (item) => {
      console.log(navClassName(item.status,activeProblemId,item.id));
      return <div key={item.id}
                  className={navClassName(item.status,activeProblemId,item.id)}>{item.problem}
        {_.isEqual(Number(activeProblemId), item.id) ?
          <div style={{    float: "right", marginRight: "10px"}}><img src={imgSrc.curNav}/></div>: null}
      </div>
    }

    const renderFeedBack = () => {
      return (
        <div  className="feed-back">
          <a href={`/pc/survey/wjx?activity=${window.ENV.feedBack}`} target="_blank"><img src="http://www.iquanwai.com/images/pcFeedBack.png"/></a>
        </div>
      )
    };

    const icon={
      running:<div>running</div>
    }

    const renderProblemList = () => {
      return (
        <List>
          <Subheader style={style.listTitle}>
            <div className="listTitle">专题</div>
          </Subheader>
          <Divider style={style.divider}/>
          {problemList.map((item, index) => {
            return (
              <ListItem
                key={index}
                onClick={()=>this.chooseProblem(item.id)}
                innerDivStyle={_.isEqual(index,0)?style.firstItem:style.item}
                children={textItem(item)}
                value={item.id}
              >
              </ListItem>
            )
          })}
        </List>
      )
    }

    return (
      <div className="fragmentContent">
        <div className="leftList">
          {this.state.problemLoading ?<VerticalBarLoading/>:renderProblemList()}
        </div>
        <div className="rightContent">
          {this.props.children}
          {window.ENV.openFeedBack?renderFeedBack():null}
        </div>
      </div>
    )
  }
}
