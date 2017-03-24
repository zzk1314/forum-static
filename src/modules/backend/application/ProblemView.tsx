import * as React from "react";
import {connect} from "react-redux";
import * as _ from "lodash";
import "./ProblemView.less"
import {loadProblems} from "./async"
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {BreakSignal, Stop} from "../../../utils/request"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"


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
    margin: "0px auto",
    padding: "20px 0 25px"
  },
  item: {
    margin: "0 auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  }
}


@connect(state => state)
export default class ProblemView extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemList: [],
    }
  }

  chooseProblem(problemId) {
    const {dispatch} = this.props;
    // 选择难题，进入rise页面
    dispatch(set("activeProblemId",problemId));
    dispatch(set("page.scroll",{x:0,y:0}));
    this.context.router.push({
      pathname:"/backend/application/catalog",
      query:{problemId:problemId}});

  }


  componentWillMount() {
    loadProblems().then(res =>{
      if (res.code === 200) {
        this.setState({
          problemList: res.msg
        })
      } else if(res.code === 403){
        setTimeout(() => window.location.href = "/403.jsp", 500);
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }

    })
  }


  render() {
    const {problemList} = this.state

    const renderProblemList = () => {
      return (
          <List>
            <Subheader style={style.listTitle}>
              <div className="listTitle">专题</div>
            </Subheader>
            <Divider style={style.divider}/>
            {problemList.map((catalog, index) => {

              return (
                  <div className="catalog-area" key={index} style={{marginTop:`${index==0?0:40}px`}}>
                    <div className="catalog-name">{catalog.name}</div>
                    {catalog.problems.map((item,seq)=>{
                      return (
                          <ListItem
                              key={seq}
                              onClick={()=>this.chooseProblem(item.id)}
                              innerDivStyle={_.isEqual(seq,0)?style.firstItem:style.item}
                              children={textItem(item)}
                              value={item.id}
                          >
                          </ListItem>
                      )
                    })}
                  </div>
              )
            })}
          </List>
      )
    }

    const textItem = (item) => {
      return <div key={item.id}
                  className="listItem done">{item.problem}
      </div>
    }

    return (
      <div className="problemContent">
        <div className="leftList">
          {renderProblemList()}
        </div>
        <div className="rightContent">
          {this.props.children}
          {/*{window.ENV.openFeedBack?renderFeedBack():null}*/}
        </div>
      </div>
    )
  }
}
