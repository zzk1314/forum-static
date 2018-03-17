import * as React from "react";
import {connect} from "react-redux";
import "./AsstIndex.less"
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


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
  },
  item: {
    color: "#666",
    marginLeft:"10px",
    fontSize:"16px",
  },
  itemActive: {
    color: "#55cbcb",
    marginLeft:"10px",
    fontSize:"16px",
  }
}


@connect(state => state)
export default class Menu extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemCatalogs: [],
      doingId: null,
      curProblem: null,
    }
  }

  componentWillMount() {

  }

  onClick(pathname, index){
    this.setState({index});
    this.context.router.push({pathname});
  }

  render() {

    const renderMenu = () => {
      return (
        <List>
          <Subheader style={style.listTitle}>
            <div className="listTitle">助教信息</div>
          </Subheader>
          <Divider style={style.divider}/>
          <ListItem
            style={this.state.index === 4 ? style.itemActive : style.item}
            value={4}
            primaryText="升级信息"
            onTouchTap={()=>this.onClick('/asst/upgrade/info', 4)} />

          <Subheader style={style.listTitle}>
            <div className="listTitle">商学院申请</div>
          </Subheader>
          <Divider style={style.divider}/>
          <ListItem
            style={this.state.index === 1 ? style.itemActive : style.item}
            value={1}
            primaryText="面试结果录入"
            onTouchTap={()=>this.onClick('/asst/business/comment', 1)} />
          <Subheader style={style.listTitle}>
            <div className="listTitle">后台评论</div>
          </Subheader>
          <Divider style={style.divider}/>
          <ListItem
            style={this.state.index === 2 ? style.itemActive : style.item}
            value={2}
            primaryText="评论应用题"
            onTouchTap={()=>this.onClick('/asst/application/comment', 2)}
          />
          <ListItem
            style={this.state.index === 5 ? style.itemActive : style.item}
            value={5}
            primaryText="加精应用题"
            onTouchTap={()=>this.onClick('/asst/application/problem/list', 5)}
          />
          <ListItem
            style={this.state.index === 3 ? style.itemActive : style.item}
            value={3}
            primaryText="评论选择题"
            onTouchTap={()=>this.onClick('/asst/warmup/comment', 3)}
          />
        </List>
      )
    }

    return (
      <div className="asstContent">
        <div className="leftList">
          {renderMenu()}
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}
